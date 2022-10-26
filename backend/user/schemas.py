from pydantic import BaseModel


class UserCreate(BaseModel):
    username: str


class UserGet(BaseModel):
    username: str
    status: bool
