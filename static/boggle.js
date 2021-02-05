
const wordSubmit = document.getElementById("wordsubmit")

wordSubmit.addEventListener("submit", handleSubmit);

async function handleSubmit(event) {
  event.preventDefault();
  let submission = document.getElementById("wordinput").value;
  let response = await axios.get("/submitted_word", {params: {word:submission}});
  
  //TODO ERASE BELOW TESTING
  console.log(response.data.result);
}


