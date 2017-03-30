from flask import Flask, render_template, request, redirect, url_for
from peewee import *
from models import *
import json

app = Flask(__name__)

@app.route('/')
def board():
	query = Boards.select().where(Boards.title == "Boards").get()
	board_list = json.loads(query.content)
	return render_template('board.html', board_list=board_list)

@app.route('/cards')
def index2():
	board_name = request.args.get("title")
	cards = Cards.select().where(Cards.board_name == board_name).order_by(Cards.id)
	if cards:
		for item in cards:
			item.content = json.loads(item.content)
		return render_template('index.html', cards=cards, board_name=board_name)    
	else:
		return redirect(url_for("default", title=board_name))

@app.route('/default')
def default():
	board_name = request.args.get("title")
	title_list = ["New", "In progress", "Review", "Done"]
	return render_template("index.html", title_list=title_list, board_name=board_name)

@app.route('/api', methods=["POST"])
def api():
	action = request.args.get("action")
	related_board = request.args.get("related_board")
	data = request.json
	
	if action == "saveBoard":
		query = Boards.select().where(Boards.title == "Boards").get()
		query.content = data
		query.save()

	elif action == "saveCards":
		cards_list = json.loads(data)
		cards = Cards.select().where(Cards.board_name == related_board)
		Cards.save_cards(cards_list, cards)
	elif action == "saveNewCard":
		card_data = json.loads(request.json)
		Cards.save_new_card(card_data)
	
	return "success"

@app.route('/build')
def build():
	query = Boards.delete()
	query.execute()
	Boards.create(title="FirstBoard")
	return redirect(url_for('board'))



if __name__ == "__main__":
    app.run(debug=True)










