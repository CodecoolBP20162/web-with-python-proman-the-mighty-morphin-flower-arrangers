from flask import Flask, render_template, request, redirect, url_for


app = Flask(__name__)

@app.route('/')
def board():
	return render_template('board.html')

@app.route('/cards')
def index2():
    return render_template('index.html')    

if __name__ == "__main__":
    app.run(debug=True)