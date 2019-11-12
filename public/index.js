(function() {
  // select needed elements
  const gameArea = document.querySelector('.game-area');
  const gameCanvas = document.querySelector('#game-area__canvas');
  const gameCtx = gameCanvas.getContext('2d');
  const toggleButton = document.querySelector('.game-controls__power-button');
  const speedSlider = document.querySelector('.game-controls__speed');
  const scoreboard = document.querySelector('.game-controls__score');

  // set canvas width to max available width
  gameCanvas.width = gameArea.offsetWidth;
  gameCanvas.height = gameArea.offsetHeight;

  // on resize, get new dimensions and call gameInstance method to handle
  window.addEventListener('resize', event => {
    console.log('event', event);
    gameCanvas.width = gameArea.offsetWidth = event.target.innerWidth;
    gameCanvas.height = gameArea.offsetHeight;
    gameInstance.windowResized(gameCanvas.width, gameCanvas.height);
  });

  const gameInstance = new GameControl(gameCanvas, gameCtx, toggleButton, speedSlider, scoreboard);
})();
