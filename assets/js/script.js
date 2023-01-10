var startButtonEl = document.getElementById('start');
var questionsEl = document.getElementById('questions');
var currentQuestionIndex = 0;
var choicesEl = document.getElementById('choices');
var feedbackEl = document.getElementById('feedback');

var quizTime = document.getElementById('time');
var counter;

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
  var startScreenContainer = document.getElementById('start-screen');
  startScreenContainer.setAttribute('class', 'hide');

  questionsEl.removeAttribute("class"); //unhides question 1 (i+1)

  //timer starts
  quizTimer();
  //displays a question
  getQuestion();
};

function quizTimer() {
  //countdown from 120 every second
  counter = 100;
  var interval = setInterval(function () {
    if (counter > 0) {
      quizTime.textContent = counter;
      counter--;
    } else {
      quizTime.textContent = "";
      clearInterval(interval);
    }
  }, 1000);
}

function getQuestion() {
  //get current question object from array
  var currentQuestion = questions[currentQuestionIndex];
  //update title with current question
  var titleEl = document.getElementById('question-title');
  titleEl.textContent = currentQuestion.title;
  //clear out any old question choices
  choicesEl.innerHTML = ""
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
    questionsEl.appendChild(choiceBtn);
  });
}

function checkAnswer() {
  console.log('ready to check answer');

  //check if answer is corrent
  if (this.value !== questions[currentQuestionIndex].answer) {
    console.log('remove time here');
    //if wrong, subtract time
    quizTime.textContent = counter;
    counter = counter - 5;
    //show Wrong!
    feedbackEl.removeAttribute("class", "hide");
    feedbackEl.textContent = "Wrong! You lost 5 seconds.";
  } else if (this.value == questions[currentQuestionIndex].answer) {
    //score++
    feedbackEl.removeAttribute("class", "hide");
    feedbackEl.textContent = "Correct!";
  }
  //show feedback 

  //remove feedback
  //feedbackEl.innerHTML = ""

  // next question
  currentQuestionIndex++;
  getQuestion();
}

startButtonEl.addEventListener('click', startQuiz);