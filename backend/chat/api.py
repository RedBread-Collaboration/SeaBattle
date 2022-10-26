from typing import List

from db import get_timestamp, get_uuid
from fastapi import APIRouter
from game.models import Game

from .models import Chat
from .schemas import MessageCreate, MessageGet

chat_router = APIRouter(prefix='/chat', tags=["chat"])


@chat_router.post("/", response_model=MessageGet)
async def create_chat_message(chat: MessageCreate):
    chat = chat.dict()

    db_game = await Game.objects.get_or_none(username_1=chat["username"])
    if not db_game:
        db_game = await Game.objects.get(username_2=chat["username"])

    return await Chat.objects.create(uuid=get_uuid(),
                                     game_uuid=db_game.dict()["uuid"],
                                     timestamp=get_timestamp(),
                                     **chat)


@chat_router.get("/{username}", response_model=List[MessageGet])
async def get_chat_by_username(username: str):
    db_game = await Game.objects.get_or_none(username_1=username)
    if not db_game:
        db_game = await Game.objects.get(username_2=username)

    return await Chat.objects.order_by("timestamp").all(game_uuid=db_game.dict()["uuid"])
