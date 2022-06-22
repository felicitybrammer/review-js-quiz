var startButtonEl = document.getElementById('start');
var questionsEl = document.getElementById('questions');

function startQuiz() {
    console.log('click');
    var startScreenContainer = document.getElementById('start-screen');
    startScreenContainer.setAttribute('class', 'hide');

    questionsEl.removeAttribute('class', 'hide');
    //timer starts

    


};

startButtonEl.addEventListener('click', startQuiz);