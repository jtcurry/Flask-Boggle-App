
const wordSubmit = document.getElementById("wordsubmit");
const displayMessage = document.getElementById("displaymessage");

wordSubmit.addEventListener("submit", handleSubmit);




async function handleSubmit(event) {
  event.preventDefault();
  let submission = document.getElementById("wordinput").value;
  let response = await axios.get("/submitted_word", {params: {word:submission}});
  let responseMessage = response.data.result

  //TODO ERASE BELOW TESTING
  console.log(response);
  
  if (responseMessage == "not-word") {
    displayMessage.textContent = `${submission} is not a word, try again!`
  } else if (responseMessage == "not-on-board") {
    displayMessage.textContent = `${submission} is not on the board, try again!`
  } else if (responseMessage == "ok") {
    displayMessage.textContent = "THIS IS A WORD!!!!!!! **erase"
  }
}



