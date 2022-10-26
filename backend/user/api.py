from typing import List

from db import get_uuid
from fastapi import APIRouter

from .models import User
from .schemas import UserCreate, UserGet

user_router = APIRouter(prefix='/users', tags=["user"])


@user_router.post("/", response_model=UserGet)
async def create_user(user: UserCreate):
    db_user = await User.objects.get_or_none(username=user.dict()["username"])
    
    if db_user:
        return db_user

    return await User.objects.create(uuid=get_uuid(), username=user.dict()["username"], status=False)


@user_router.get("/active", response_model=List[UserGet])
async def get_active_users():
    return await User.objects.all(status=False)


@user_router.get("/all", response_model=List[UserGet])
async def get_all_users():
    return await User.objects.order_by("status").all()


@user_router.put("/{username}", response_model=UserGet)
async def update_user_status(username: str):
    db_user = await User.objects.get(username=username)
    return await db_user.update(status=not db_user.dict()["status"])

@user_router.delete("/{username}", status_code=204)
async def delete_user_by_username(username: str):
    db_user = await User.objects.get(username=username)
    await db_user.delete()
