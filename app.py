from flask import Flask, render_template, session
app = Flask(__name__)

app.config['SECRET_KEY'] = "newKey"

from boggle import Boggle
boggle_game = Boggle()


@app.route("/board")
def show_board():
  """ Display board generated from Boggle class"""
  board = boggle_game.make_board()
  session["board"] = board
  return render_template("board.html", board = board)
