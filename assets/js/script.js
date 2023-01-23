
//declare variables

//header variables
var quizTime = document.getElementById('timer');
var timeLeft;

//start screen variables
var startButtonEl = document.getElementById('start');
var startSection = document.getElementById('start-section');

//quiz variables
var questionsSection = document.getElementById('questions-section');
var currentQuestionIndex = 0;
var choicesEl = document.getElementById('choices');
var feedbackEl = document.getElementById('feedback');

var score = 0;
var totalScore;

var finalScore = document.getElementById('final-score');
var endScreenMessage = document.getElementById('end-screen-msg');
var initialsEl = document.getElementById('initials').value;
var initialsInput = document.getElementById('enter-initials');
var submitBtn = document.getElementById('submit');

var questions = [
  {
    title: "Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts"
  },
  {
    title: "The condition in an if / else statement is enclosed within ____.",
    choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
    answer: "parentheses"
  },
  {
    title: "Arrays in JavaScript can be used to store ____.",
    choices: [
      "numbers and strings",
      "other arrays",
      "booleans",
      "all of the above"
    ],
    answer: "all of the above"
  },
  {
    title:
      "String values must be enclosed within ____ when being assigned to variables.",
    choices: ["commas", "curly brackets", "quotes", "parentheses"],
    answer: "quotes"
  },
  {
    title:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    choices: ["JavaScript", "terminal / bash", "for loops", "console.log"],
    answer: "console.log"
  }
];

function startQuiz() {
  console.log('starting quiz and timer');
  // hide the start section
  startSection.style.display = "none";
  //show first question
  questionsSection.style.display = "block";
  //unhides question 1 (i+1)
  getQuestion();
  //timer starts
  quizTimer();
};

function quizTimer() {
  //countdown from 100 every second
  timeLeft = 100;

  var interval = setInterval(function () {
    timeLeft--;
    quizTime.textContent = timeLeft;

    if (timeLeft === 0) {
      clearInterval(interval);
      quizEnd();
      endScreenMessage.textContent = "Oops! You ran out of time.";
    } else if (currentQuestionIndex === questions.length) {
      clearInterval(interval);
    }
  }, 1000);
}

function getQuestion() {
  //get current question object from array
  var currentQuestion = questions[currentQuestionIndex];
  //update title with current question
  var titleEl = document.getElementById('question-title'); //repeat
  titleEl.textContent = currentQuestion.title;
  //clear out any old question choices
  choicesEl.innerHTML = "";
  //loop over choices
  currentQuestion.choices.forEach((choice, i) => {
    //create new buttons for each choice
    var choiceBtn = document.createElement("button");
    choiceBtn.setAttribute("class", "choice");
    choiceBtn.setAttribute("value", choice);
    choiceBtn.textContent = i + 1 + ". " + choice;

    //attach click event listener to each choice //object.onclick = function(){}
    choiceBtn.onclick = checkAnswer;
    //display on the page
    choicesEl.appendChild(choiceBtn);
  });
}

function checkAnswer() {
  console.log('checking answer');
  // flash right/wrong feedback on page for half a second
  feedbackEl.setAttribute('class', 'feedback');
  setTimeout(function () {
    feedbackEl.setAttribute('class', 'feedback hide');
  }, 500);
  //check if answer is corrent
  if (this.value !== questions[currentQuestionIndex].answer) {
    console.log('remove time here');
    //if wrong, subtract time
    quizTime.textContent = timeLeft;
    timeLeft = timeLeft - 10;
    //show Wrong!
    feedbackEl.removeAttribute("class", "hide");
    feedbackEl.textContent = "Wrong! You lost 10 seconds.";
  } else if (this.value == questions[currentQuestionIndex].answer) {
    score++;
    feedbackEl.removeAttribute("class", "hide");
    feedbackEl.textContent = "Correct!";
  }

  // next question
  currentQuestionIndex++;


  // check if we've run out of questions
  if (timeLeft <= 0 || currentQuestionIndex === questions.length) {
    quizEnd();
    console.log('ending the quiz');
  } else {
    getQuestion();
    console.log('getting another question');
  }
  return score;
}

function quizEnd() {
  //clear questions screen
  
  //show the end screen
  var endScreenContainer = document.getElementById('end-screen');
  endScreenContainer.removeAttribute('class', 'hide');
  //stop the timer
  quizTime.textContent = timeLeft;
  clearInterval(interval);

  //show final score
  console.log(score);
  console.log(timeLeft); //works
  totalScore = score + timeLeft;
  finalScore.textContent = totalScore;
  console.log(finalScore);
}

function saveScore() {
  var initials = initialsEl.value.trim();

  // make sure value wasn't empty
  if (initials !== '') {
    // get saved scores from localstorage, or if not any, set to empty array
    var highscores =
      JSON.parse(window.localStorage.getItem('highscores')) || [];

    // format new score object for current user
    var newScore = {
      score: totalScore,
      initials: initials,
    };

    // save to localstorage
    highscores.push(newScore);
    window.localStorage.setItem('highscores', JSON.stringify(highscores));

    // redirect to next page
    window.location.href = 'highscores.html';
    //printScore();
  }
}


//startButtonEl.addEventListener('click', startQuiz);
startButtonEl.onclick = startQuiz;
// user clicks button to submit initials
submitBtn.onclick = saveScore;