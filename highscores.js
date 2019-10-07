var userInitials = document.querySelector("#initials");
var yourScore = document.querySelector("#your-score");
yourScore.value = 0;

var submit = document.querySelector("#submit");
var userI = document.querySelector("#user-i");
var userS = document.querySelector("#user-s");

renderAllScores();



function renderAllScores() {
  var init = localStorage.getItem("initials");
  var initScore = localStorage.getItem("yourScore");

  if (init === null) {
    return;
  }

  userI.textContent = init;
  userS.textContent = initScore;
}

submit.addEventListener("click", function(event) {
  event.preventDefault();

  var initials = userInitials.value;
  var theScore = yourScore.value;


    localStorage.setItem("initials", initials);
    localStorage.setItem("yourScore", theScore);
    renderAllScores();
});
