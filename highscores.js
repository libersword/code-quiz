var hsList = document.querySelector("#highscores-list");
var clear = document.getElementById('clear');
var back = document.getElementById('toQuiz');
renderScores();
function renderScores() {
  var storedScores = JSON.parse(window.localStorage.getItem("allScores"));
  if (storedScores !== null) {
    hsList.innerHTML = '';
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

clear.addEventListener('click', function(){
  window.localStorage.clear();
  window.location.reload();
})

back.addEventListener('click', function(){
  window.location.href = "./index.html";
})