from unittest import TestCase
from app import app
from flask import session, request
from boggle import Boggle


class FlaskTests(TestCase):
    def setUp(self):
        self.client = app.test_client()
        app.config['TESTING'] = True

    def test_home(self):
        """Make sure homepage is rendered properly"""
        response = self.client.get("/")
        html = response.get_data(as_text=True)
        self.assertIn('<h3>Instructions</h3>', html)

    def test_board(self):
        """Test if board is rendered and put into session"""
        with self.client:
            response = self.client.get("/board?size=8")
            self.assertEqual(request.args["size"], "8")
            self.assertIn("board", session)
            self.assertIsNone(session.get('highscore'))
            self.assertIsNone(session.get('played'))
            html = response.get_data(as_text=True)
            self.assertIn('</table>', html)

    def test_valid_word(self):
        """Test is a valid word is handled with an ok response"""
        with self.client as client:
            with client.session_transaction() as session:
                session['board'] = [["C", "A", "T", "T", "T"],
                                    ["C", "A", "T", "T", "T"],
                                    ["C", "A", "T", "T", "T"],
                                    ["C", "A", "T", "T", "T"],
                                    ["C", "A", "T", "T", "T"]]
        response = self.client.get('/submitted_word?word=cat')
        self.assertEqual(response.json['result'], 'ok')

    def test_invalid_word(self):
        """Test if invalid word is handled with not-on-board response"""
        with self.client:
            self.client.get("/board?size=8")
            response = self.client.get('/submitted_word?word=impossible')
            self.assertEqual(request.args["word"], "impossible")
            self.assertEqual(response.json['result'], 'not-on-board')

    def test_not_a_word(self):
        """Test if a non-word is handled with not-word response"""
        with self.client:
            self.client.get("/board?size=8")
            response = self.client.get('/submitted_word?word=qweqwdqwdqw')
            self.assertEqual(response.json['result'], 'not-word')

    def test_send_score(self):
        """Test if post request to server with highscore returns response True"""
        with self.client as client:
            with client.session_transaction() as session:
                session['highscore'] = 10
            response = client.post("/send_score", json={"score": 15})
            self.assertEqual(response.status_code, 200)
            self.assertEqual(response.json["record"], True)
