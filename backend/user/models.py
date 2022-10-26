import ormar
from db import MainMeta


class User(ormar.Model):

    class Meta(MainMeta):
        pass

    uuid: str = ormar.String(primary_key=True, max_length=255)
    username: str = ormar.String(unique=True, nullable=False, max_length=255)
    status: bool = ormar.Boolean(default=False, nullable=False)
