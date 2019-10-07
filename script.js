//Start button - begins quiz and then removes itself
var start = document.getElementById("start-quiz");
start.addEventListener("click", function(){
  start.parentNode.removeChild(start);
  runQuiz();
})

//all the fun variables
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
var main = document.getElementById('main-container');
restartBtn = document.createElement('button');
quiz.appendChild(restartBtn);
restartBtn.style.display = 'none';

//timer variables
var totalSeconds = questionArray.length * 15;
var secondsElapsed = 0;
var interval;
var secondsDisplay = document.getElementById("timer");


//highscores variables
var totalScore = 0;

//Timer
var startTimer = function() {
  interval = setInterval(function() {
    secondsElapsed++;
    renderTime();
  }, 1000);
}

//render time left
function renderTime(){
  var secondsLeft = totalSeconds - secondsElapsed;
  secondsDisplay.textContent = secondsLeft;
  if (secondsElapsed >= totalSeconds) {
   secondsDisplay.textContent = 0;
   stopTimer();
  }
  if (secondsElapsed >= totalSeconds && currentQuestion !== questionArray.length) {
    outofTime();
   }
  }
  
  //stopping the timer
    function stopTimer(){
      clearInterval(interval);
      currentQuestion = 0;
    }
  //function for displaying out of time message and restarting quiz
  var outofTime = function() {
    clearLastAnswer();
    feedback.textContent = "You ran out of time! No points for you, because it's zero anyway."
    score = 0;
    restartBtn.style.display = 'block';
    restartBtn.textContent = "Restart Quiz?";
    restartBtn.addEventListener('click', function(){
    window.location.reload();
    })
}

//run the quiz!
function runQuiz(){
  startTimer();
  if(currentQuestion === questionArray.length){
    stopTimer();
    stopQuiz();
  }
  else{
    //display the question
    questionDisplay.textContent = renderQuestion();
    questionDiv.appendChild(questionDisplay);
    //display the choices
    for (i in questionArray[currentQuestion]['choices']){
      var choicesDisplay = document.createElement("button");
      choicesDisplay.setAttribute("class", "guess");
      choicesDisplay.textContent = questionArray[currentQuestion]['choices'][i];
          choicesDiv.appendChild(choicesDisplay);
    }
    //grab which on ethe user clicked and check it against the answer
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
//reset the quiz
function resetQuiz(){
  quiz.removeChild(restartBtn);
  feedback.textContent = '';
  totalSeconds = 75;
  score = 0;
  currentQuestion = 0;
  runQuiz();
}
//check the answer
function checkAnswer(userGuess, answer) {
  if (userGuess === answer){
    //if correct, add to the score, increase the currentQuestion index, clear the last answer, run the quiz
    score++;
    totalScore = score;
    currentQuestion++;
    clearLastAnswer();
    feedback.textContent = '';
    runQuiz();
    
    
  }
  else{
    //if wrong, decrease score, take away time, feedback is try again, and return function until they get it right
    score--;
    totalSeconds-=15;
    feedback.textContent = "Try Again"
    return; 
  }
}

//clear last answer
function clearLastAnswer(){
  questionDisplay.textContent = "";
  choicesDiv.innerHTML = "";
}
//render question
function renderQuestion(){
  return questionArray[currentQuestion]['title'];
}
//render choices
function renderChoices(){
  return questionArray[currentQuestion]['choices'];
}
//stop the quiz
function stopQuiz(){
  clearLastAnswer();
  feedback.innerHTML = '';
  totalSeconds=0;
  var finalScore = score;
  main.parentNode.removeChild(main);
  scoreForm.setAttribute('id', 'show');
  scoreForm.style.display = 'block';
  yourScore.textContent = ' ' + finalScore;
}
//on submission
submitBtn.addEventListener("click",function(event) {
  event.preventDefault();
  var initialsInput = document.getElementById("initials");
  var highscores = JSON.parse(localStorage.getItem('allScores')) || [];
  highscores.push({initials:initialsInput.value, score:yourScore.innerText})
  localStorage.setItem("allScores", JSON.stringify(highscores));
  return redirect();
},false);
//redirect on submit
function redirect(){
  window.location.href = "highscores.html" ;
}




