from flask import Flask, render_template, request, redirect, url_for



app = Flask(__name__)


@app.route('/', methods=["GET", "POST"])
def board():
	if request.method == "POST":
		query = request.form.get("ttle")
		return redirect(url_for("index", query=query))

	return render_template('board.html')

@app.route('/card/<query>')
def index(query):
    return render_template('index.html', query=query)    


if __name__ == "__main__":
    app.run(debug=True)