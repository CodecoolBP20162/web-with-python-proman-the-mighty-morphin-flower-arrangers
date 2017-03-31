from peewee import *
import json


db = PostgresqlDatabase('zahoranszky', user='zahoranszky')


# class BaseModel(Model):
#     """A base model that will use our Postgresql database"""

#     class Meta:
#         database = db
#         primary_key = False


class Boards(Model):

	title = CharField()
	content = CharField()

	class Meta:
		database = db

class Cards(Model):
	title = CharField()
	content = CharField()
	board_name = CharField()
	order_id = CharField()

	class Meta:
		database = db


	@classmethod
	def save_cards(cls, cards_list, cards):
		if len(cards) > 0:
			for item in cards_list:
				card = cls.update(title=item["title"],
							content=json.dumps(item["cards"]),
							board_name=item["board_name"],
							order_id=item["order_id"]).where(cls.order_id == item["order_id"])
				card.execute()
				print("card: {} updated".format(item["title"]))
		else:
			for item in cards_list:
				cls.create(
							title=item["title"],
							content=json.dumps(item["cards"]),
							board_name=item["board_name"],
							order_id=item["order_id"]
							)

				print("card: {} saved to database".format(item["title"]))

	@classmethod
	def save_new_card(cls, card_data):
		cls.create(title="New", board_name=card_data["board_name"], content=json.dumps([]), order_id=card_data["order_id"])

	@staticmethod
	def check_ids():
		db.execute_sql('ALTER SEQUENCE cards_id_seq RESTART WITH 1')











