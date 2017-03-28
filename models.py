from peewee import *


db = PostgresqlDatabase('robertgaspar', user='robertgaspar')


class BaseModel(Model):
    """A base model that will use our Postgresql database"""

    class Meta:
        database = db


class Boards(BaseModel):

	title = CharField()
	content = CharField(null=True)


class Cards(BaseModel):

	title = CharField()
	content = CharField()
	board_name = CharField()