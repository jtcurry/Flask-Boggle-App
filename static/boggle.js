
const wordSubmit = document.getElementById("wordsubmit");
const displayMessage = document.getElementById("displaymessage");
const displayScore = document.getElementById("displayscore");

let totalScore = 0;

// CALCULATE SCORE FROM A VALID WORD
const calculateWordScore = (currentWord) => {
  wordScore = currentWord.length;
  return wordScore;
}





// HANDLE SUBMISSION OF A WORD
wordSubmit.addEventListener("submit", handleSubmit);

async function handleSubmit(event) {
  event.preventDefault();
  let submission = document.getElementById("wordinput").value;
  let response = await axios.get("/submitted_word", {params: {word:submission}});
  let responseMessage = response.data.result

  if (responseMessage == "not-word") {
    displayMessage.textContent = `${submission} is not a word, try again!`
  } else if (responseMessage == "not-on-board") {
    displayMessage.textContent = `${submission} is not on the board, try again!`
  } else if (responseMessage == "ok") {
    totalScore += calculateWordScore(submission);
    displayMessage.textContent = "THIS IS A WORD, DO SOMETHING!!!!!!! **erase**";
    displayScore.textContent = totalScore;
  }
}



