from flask import Flask, render_template, session, request, jsonify

app = Flask(__name__)

app.config['SECRET_KEY'] = "newKey"

from boggle import Boggle
boggle_game = Boggle()

@app.route("/")
def show_home():
  return render_template("index.html")


@app.route("/board")
def show_board():
  """ Display board generated from Boggle class"""
  size = request.args["size"]
  board = boggle_game.make_board(int(size))
  session["board"] = board
  return render_template("board.html", board = board, size = size)


@app.route("/submitted_word")
def test_word():
  """Handles incoming get request to check if word is valid"""
  word = request.args["word"]
  board = session["board"]
  response = boggle_game.check_valid_word(board, word)
  return jsonify({'result': response})


@app.route("/send_score", methods=["POST"])
def send_score():
  """Handles incoming post request to add a new score, returns if highscore"""
  played = session.get("played", 0)
  score = request.json["score"]
  highscore = session.get("highscore", 0)
  session["highscore"] = max(score, highscore)
  session["played"] = played + 1
  if (score > highscore):
    return jsonify(record = True, best = session["highscore"])
  else:
    return jsonify(record = False, best = session["highscore"])