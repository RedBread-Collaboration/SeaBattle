from pydantic import BaseModel


class MessageCreate(BaseModel):
    username: str
    message: str


class MessageGet(BaseModel):
    username: str
    timestamp: int
    message: str
