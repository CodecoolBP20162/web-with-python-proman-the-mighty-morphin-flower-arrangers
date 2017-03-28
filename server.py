from flask import Flask, render_template, request, redirect, url_for
from peewee import *
from models import *
import json

app = Flask(__name__)

@app.route('/')
def board():
	return render_template('board.html')

@app.route('/cards')
def index2():
    return render_template('index.html')    


@app.route('/api', methods=["POST"])
def api():
	action = request.args.get("action")
	data = request.json
	
	if action == "saveBoard":
		# SAVE BOARD DATA TO DATABASE
		query = Boards.select().where(Boards.title == "Boards").get()
		query.content = data
		# boards_list = json.loads(query.content)
		# print(boards_list)

	elif action == "saveCards":
		# SAVA CARD DATA TO DATABASE
		cards_list = json.loads(data)
		for i in range(len(cards_list)):
			print(cards_list[i]["cards"])
	
	return redirect(url_for('board'))


@app.route('/build')
def build():
	query = Boards.delete()
	query.execute()
	Boards.create(title="FirstBoard")
	return redirect(url_for('board'))



if __name__ == "__main__":
    app.run(debug=True)