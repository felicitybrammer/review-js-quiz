function printScore() {
    //get high scores from local storage or set to empty array
    var highscoresToPrint =
      JSON.parse(window.localStorage.getItem('highscores')) || [];
    //sort high scores into descending order
    highscoresToPrint.sort(function (a, b) {
      return b.finalScore - a.finalScore;
    })
    console.log(highscoresToPrint);
    //create li tag for each score
    for (var i = 0; i < highscoresToPrint.length; i++) {
      var liTag = document.createElement('li');
      liTag.textContent = highscoresToPrint[i].initials + ' - ' + highscoresToPrint[i].finalScore;
      //display on page
      var olEl = document.getElementById('highscores');
      olEl.appendChild(liTag);
    }
  }
  
  function clearHighscores() {
    window.localStorage.removeItem('highscores');
    window.location.reload();
  }
  
  document.getElementById('clear').onclick = clearHighscores;
  printScore();
  