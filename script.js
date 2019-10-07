var start = document.getElementById("start-quiz");
start.addEventListener("click", function(){
  start.parentNode.removeChild(start);
  runQuiz();
})

var score = 0;
var currentQuestion = 0;
var questionArray = questions;
var quiz = document.getElementById('quiz');
var questionDiv = document.getElementById("question");
var questionDisplay = document.createElement('h2');
var choicesDiv = document.getElementById("choices");
var feedback = document.getElementById('feedback');
var highscores = document.createElement('h2');
var scoreForm = document.getElementById('hidden');
scoreForm.style.display = 'none';
var yourScore = document.querySelector(".yourScore");
var submitBtn = document.getElementById('submit');

//timer variables
var totalSeconds = questionArray.length * 15;
var secondsElapsed = 0;
var interval;
var secondsDisplay = document.getElementById("timer");

//highscores variables
var totalScore = 0;

//Timer
function startTimer() {
  interval = setInterval(function() {
    secondsElapsed++;
    renderTime();
  }, 1000);
}

function renderTime(){
  var secondsLeft = totalSeconds - secondsElapsed;
  secondsDisplay.textContent = secondsLeft;

  if (secondsElapsed >= totalSeconds) {
   secondsDisplay.textContent = 0;
   stopTimer();
  }
  }

  var outofTime = function() {
    clearLastAnswer();
    feedback.textContent = "You ran out of time!"
    score = 0;
    currentQuestion = 0;
    restartBtn = document.createElement('button');
    quiz.appendChild(restartBtn);
    restartBtn.textContent = "Restart Quiz?";
    restartBtn.addEventListener('click', function(){
    resetQuiz();
    })
}
  function stopTimer(){
    clearInterval(interval);
  }


function runQuiz(){
  startTimer();
  if(currentQuestion === questionArray.length){
    stopTimer();
    stopQuiz();
  }
  else{
    //get rid of try again button if present
    //get rid of start button
    //display question
    questionDisplay.textContent = renderQuestion();
    questionDiv.appendChild(questionDisplay);
    for (i in questionArray[currentQuestion]['choices']){
      var choicesDisplay = document.createElement("button");
      choicesDisplay.setAttribute("class", "guess");
      choicesDisplay.textContent = questionArray[currentQuestion]['choices'][i];
          choicesDiv.appendChild(choicesDisplay);
    }
    var guess = document.querySelectorAll(".guess");
      var i = 0, length=guess.length;
      for (i=0;i<length;i++){
        if (document.addEventListener) {
          guess[i].addEventListener("click", function() {
             var userGuess = this.innerText;
             var answer = questionArray[currentQuestion]['answer'];
             checkAnswer(userGuess, answer);
          });
      } else {
        return;
          }
      }   
  }
}  

function resetQuiz(){
  quiz.removeChild(restartBtn);
  feedback.textContent = '';
  totalSeconds = 75;
  score = 0;
  currentQuestion = 0;
  runQuiz();
}
function checkAnswer(userGuess, answer) {
  if (userGuess === answer){
    score++;
    totalScore = score;
    currentQuestion++;
    clearLastAnswer();
    feedback.textContent = '';
    runQuiz();
    
    
  }
  else{
    score--;
    totalSeconds-=15;
    feedback.textContent = "Try Again"
    return; 
  }
}

function clearLastAnswer(){
  questionDisplay.textContent = "";
  choicesDiv.innerHTML = "";
}

function renderQuestion(){
  return questionArray[currentQuestion]['title'];
}

function renderChoices(){
  return questionArray[currentQuestion]['choices'];
}

function stopQuiz(){
  clearLastAnswer();
  feedback.innerHTML = '';
  totalSeconds=0;
  var finalScore = score;
  console.log(finalScore);
  scoreForm.setAttribute('id', 'show');
  scoreForm.style.display = 'block';
  yourScore.textContent = ' ' + finalScore;
  submitBtn.addEventListener("click"  ,function() {submit()});
}

var submit = function() {
  var initialsInput = document.getElementById("initials");
  var highscores = JSON.parse(localStorage.getItem('allScores')) || [];
  highscores.push({initials:initialsInput.value, score:yourScore.innerText})
  localStorage.setItem("allScores", JSON.stringify(highscores));
  window.location="highscores.html";
}




