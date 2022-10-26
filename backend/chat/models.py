import ormar
from db import MainMeta


class Chat(ormar.Model):

    class Meta(MainMeta):
        pass

    uuid: str = ormar.String(primary_key=True, max_length=255)
    game_uuid: str = ormar.String(max_length=255)
    username: str = ormar.String(max_length=255)
    timestamp: int = ormar.BigInteger()
    message: str = ormar.String(max_length=1024)
