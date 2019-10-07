var hsList = document.querySelector("#highscores-list");

renderScores();
function renderScores() {
  var storedScores = JSON.parse(window.localStorage.getItem("allScores"));
  if (storedScores !== null) {
  // Render a new li for each Highscore
  for (var i = 0; i < storedScores.length; i++) {
    
    var li = document.createElement("li");
    var p = document.createElement("p");
    li.textContent = 'Initials: ' + storedScores[i].initials;
    p.textContent = 'Score: ' + storedScores[i].score;
    li.appendChild(p);
    hsList.appendChild(li);
  }
}
}