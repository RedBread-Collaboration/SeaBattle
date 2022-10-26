from db import get_timestamp, get_uuid
from fastapi import APIRouter
from user.models import User

from .models import Game
from .schemas import GameCreate, GameGet
from chat.models import Chat

game_router = APIRouter(prefix='/game', tags=["game"])


@game_router.post("/", response_model=GameGet)
async def create_game(game: GameCreate):
    game = game.dict()

    user_1 = await User.objects.get(username=game["username_1"])
    user_2 = await User.objects.get(username=game["username_2"])

    if user_1.dict()["status"] or user_2.dict()["status"]:
        raise Exception("User busy")

    db_game = await Game.objects.create(uuid=get_uuid(), timestamp=get_timestamp(), turn=False, **game)

    await user_1.update(status=not user_1.dict()["status"])
    await user_2.update(status=not user_2.dict()["status"])

    return db_game


@game_router.get("/{username}", response_model=GameGet)
async def get_game_by_username(username: str):
    db_game = await Game.objects.get_or_none(username_1=username)
    if not db_game:
        db_game = await Game.objects.get(username_2=username)

    return db_game


@game_router.put("/{username}", response_model=GameGet)
async def change_game_turn_by_username(username: str):
    db_game = await Game.objects.get_or_none(username_1=username)
    if not db_game:
        db_game = await Game.objects.get(username_2=username)

    return await db_game.update(turn=not db_game.dict()["turn"])


@game_router.delete("/{username}", status_code=204)
async def delete_game_by_username(username: str):
    db_game = await Game.objects.get_or_none(username_1=username)

    if not db_game:
        db_game = await Game.objects.get(username_2=username)

    await Chat.objects.delete(game_uuid=db_game.dict()["uuid"], each=True)

    await db_game.delete()

    user_1 = await User.objects.get(username=db_game.dict()["username_1"])
    user_2 = await User.objects.get(username=db_game.dict()["username_2"])

    await user_1.update(status=not user_1.dict()["status"])
    await user_2.update(status=not user_2.dict()["status"])


# @game_router.put("/user", response_model=UserGet)
# async def update_user_status(user: UserGet):
#     user = user.dict()
#     db_user = await User.objects.get(username=user["username"])
#     return await db_user.update(status=user["status"])
