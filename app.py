from flask import Flask, render_template, session, request, jsonify
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)

app.config['SECRET_KEY'] = "newKey"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)

from boggle import Boggle
boggle_game = Boggle()


@app.route("/board")
def show_board():
  """ Display board generated from Boggle class"""
  board = boggle_game.make_board()
  session["board"] = board
  return render_template("board.html", board = board)

@app.route("/submitted_word")
def test_word():
  word = request.args["word"]
  board = session["board"]
  response = boggle_game.check_valid_word(board, word)
  return jsonify({'result': response})