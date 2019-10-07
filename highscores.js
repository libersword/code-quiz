// var userInitials = document.querySelector("#initials");
// var yourScore = document.querySelector(".yourScore");

// var submit = document.querySelector("#submit");
// var userI = document.querySelector("#user-i");
// var userS = document.querySelector("#user-s");
// var allScores = [];
// renderAllScores();



// function renderAllScores() {
//   var init = localStorage.getItem("initials");
//   var initScore = localStorage.getItem("yourScore");

//   if (init === null) {
//     return;
//   }


//   userI.textContent = init;
//   userS.textContent = initScore;

//   allScores.push({initials:init.value, score:yourScore.value});

// }

// submit.addEventListener("click", function(event) {
//   event.preventDefault();

//   var initials = userInitials.value;
//   var theScore = yourScore.value;


//     localStorage.setItem("initials", initials);
//     localStorage.setItem("yourScore", theScore);
//     renderAllScores();
// });
