import ormar
from db import MainMeta


class Game(ormar.Model):

    class Meta(MainMeta):
        pass

    uuid: str = ormar.String(primary_key=True, max_length=255)
    username_1: str = ormar.String(max_length=255)
    username_2: str = ormar.String(max_length=255)
    timestamp: int = ormar.BigInteger()
    turn: bool = ormar.Boolean(default=False, nullable=False)
