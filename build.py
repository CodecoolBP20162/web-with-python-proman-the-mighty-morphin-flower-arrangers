from models import *

db.connect()
db.drop_table(Boards)
db.drop_table(Cards)
db.create_table(Boards)
db.create_table(Cards)

Boards.create(title="Boards", content=json.dumps(["board1"]))
# Cards.create()