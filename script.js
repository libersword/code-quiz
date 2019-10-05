var start = document.getElementById("start-quiz");
start.addEventListener("click", function(){
  //startTimer();
  startQuiz();
})

var score = 0;
var currentQuestion = 0;
var questionArray = questions;

function startQuiz(){
  //startTimer();
  if(currentQuestion === questionArray.length){
    return;
  }
  else{
    var questionDiv = document.getElementById("question");
    var questionDisplay = document.createElement('h2');
    questionDisplay.textContent = renderQuestion();
    questionDiv.appendChild(questionDisplay);

    var choicesDiv = document.getElementById("choices");
    for (i in questionArray[currentQuestion]['choices']){
      var choicesDisplay = document.createElement("button");
      choicesDisplay.textContent = questionArray[currentQuestion]['choices'][i];
      console.log(choicesDisplay); 
      choicesDiv.appendChild(choicesDisplay);
    }
    //renderChoices();
  }
}
function renderQuestion(){
  return questionArray[currentQuestion]['title'];
}

function renderChoices(){
  return questionArray[currentQuestion]['choices'];
}


renderQuestion();
renderChoices();