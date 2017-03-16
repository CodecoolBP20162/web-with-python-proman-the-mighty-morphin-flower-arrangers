from flask import Flask, render_template



app = Flask(__name__)


@app.route('/')
def board():
    return render_template('board.html')

@app.route('/card')
def index():
    return render_template('index.html')    


if __name__ == "__main__":
    app.run(debug=True)