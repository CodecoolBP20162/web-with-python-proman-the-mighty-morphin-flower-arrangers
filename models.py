from peewee import *


db = PostgresqlDatabase('zahoranszky', user='zahoranszky')


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