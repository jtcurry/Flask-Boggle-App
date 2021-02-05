const wordSubmit = document.getElementById("wordsubmit");
const displayMessage = document.getElementById("displaymessage");
const displayScore = document.getElementById("displayscore");
const displayTimer = document.getElementById("displaytimer");
const playButton = document.getElementById("play");

let totalScore = 0;
let timer = 60;
let usedWords = new Set();

// CALCULATE SCORE FROM A VALID WORD SUBMISSION
const calculateWordScore = (currentWord) => {
  wordScore = currentWord.length;
  return wordScore;
};

// IF TIME STILL AVAILABLE CONTINUE GAME, OTHERWISE END GAME
const runTimer = () => {
  const intTimer = setInterval(function () {
    if (timer === 0) {
      clearInterval(intTimer);
      endDOMGame();
    } else {
      showTime();
    }
  }, 1000);
};

// SHOW TIME REMAINING
const showTime = () => {
  displayTimer.textContent = coundownTime();
};

// COUNTDOWN TIME
const coundownTime = () => {
  timer -= 1;
  return timer;
};

// DISABLE SUBMISSIONS WHEN TIMER IS DONE AND END GAME
const endDOMGame = () => {
  wordSubmit.classList.remove("active");
  wordSubmit.classList.add("hidden");
  displayTimer.textContent = "Game Over";
  displayMessage.textContent = "";
};




// HANDLE START GAME
playButton.addEventListener("click", startDOMGame);

async function startDOMGame() {
  document.querySelector("table").classList.remove("hidden");
  wordSubmit.classList.remove("hidden");
  playButton.classList.add("hidden");
  runTimer();
}


// HANDLE SUBMISSION OF A WORD
if (wordSubmit.classList.contains("active")) {
  wordSubmit.addEventListener("submit", handleSubmit);
}

async function handleSubmit(event) {
  event.preventDefault();
  let submission = document.getElementById("wordinput").value;

  if (usedWords.has(submission)) {
    displayMessage.textContent = "Word is already used";
    wordSubmit.reset();
    return;
  }
  
  let response = await axios.get("/submitted_word", {
    params: { word: submission },
  });
  let responseMessage = response.data.result;

  if (responseMessage == "not-word") {
    displayMessage.textContent = `${submission} is not a word, try again!`;
  } else if (responseMessage == "not-on-board") {
    displayMessage.textContent = `${submission} is not on the board, try again!`;
  } else if (responseMessage == "ok") {
    totalScore += calculateWordScore(submission);
    displayMessage.textContent ="";
    displayScore.textContent = totalScore;
    usedWords.add(submission);
  }
  wordSubmit.reset();
}

//*********************************************************


