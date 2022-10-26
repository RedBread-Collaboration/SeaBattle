from datetime import datetime
from uuid import uuid4

import databases
import ormar
import sqlalchemy

metadata = sqlalchemy.MetaData()
database = databases.Database("sqlite://", force_rollback=True)
# engine = sqlalchemy.create_engine("sqlite://")


def get_uuid():
    return str(uuid4())


def get_timestamp():
    return int(datetime.timestamp(datetime.now()))


class MainMeta(ormar.ModelMeta):
    metadata = metadata
    database = database
