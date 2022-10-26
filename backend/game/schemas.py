from pydantic import BaseModel


class GameCreate(BaseModel):
    username_1: str
    username_2: str


class GameGet(BaseModel):
    username_1: str
    username_2: str
    timestamp: int
    turn: bool
