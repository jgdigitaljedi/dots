class GameControl {
  constructor(canvas, ctx, toggle, speedSlider, scoreboard) {
    // canvas related
    this.canvas = canvas;
    this.ctx = ctx;
    this.ctxWidth = canvas.width || 0;
    this.ctxHeight = canvas.height || 0;

    // control elements
    this.toggle = toggle;
    this.slider = speedSlider;

    // state
    this.paused = true;
    this.dots = [];
    this.dropInterval = null;
    this.frameTime = new Date();
    this.pauseTime = null;
    this.rate = 30;
    this.delta = null;
    this.colorIndex = 0;

    // constants
    this.colorArr = ['#984b43', '#233237', '#eac67a', '#50555c'];
    this.scoreControl = new ScoreControl(scoreboard);

    // methods that need bind because called by window function
    this.drawCanvas = this.drawCanvas.bind(this);
    this.makeDot = this.makeDot.bind(this);
    this.collisionTest = this.collisionTest.bind(this);

    // start listeners to start game
    this.handleClick();
    this.handleSlider();
    this.init();
  }

  // logic to start "start"/"pause" button logic
  init() {
    this.toggle.addEventListener('click', event => {
      if (this.toggle.classList.contains('pause-game')) {
        this.paused = false;
        if (this.pauseTime) {
          this.frameTime = new Date() - this.pauseTime;
        }
        this.toggle.classList.toggle('pause-game');
        this.toggle.innerText = 'Pause';
        this.startGame();
      } else {
        window.clearInterval(this.dropInterval);
        this.paused = true;
        this.pauseTime = new Date() - this.frameTime;
        this.toggle.innerText = 'Start';
        this.toggle.classList.toggle('pause-game');
      }
    });
  }

  // if user changes speed slider then speed up drop rate
  handleSlider() {
    this.slider.addEventListener('change', event => {
      console.log('val', event.target.value);
      this.rate = event.target.value * 50;
    });
  }

  // when user clicks and game not paused, call method to see if click was on a dot
  // mousedown used because click registers on mouseup and that makes the game feel a bit off
  handleClick() {
    this.canvas.addEventListener('mousedown', event => {
      if (!this.paused) {
        this.collisionTest(event);
      }
    });
  }

  // if window is resized, resize the canvas
  windowResized(width, height) {
    this.ctxWidth = width;
    this.ctxHeight = height;
    this.removeDotsOutside();
  }

  // when window is resized, remove dots outside of new canvas width
  removeDotsOutside() {
    this.dots.forEach((dot, i) => {
      if (dot.x + dot.radius > this.canvas.width) {
        this.dots.splice(i, 1);
      }
    });
  }

  // advance animation frame
  tick() {
    const ts = this.pauseTime ? new Date() - this.pauseTime : new Date();
    this.delta = (ts - this.frameTime) / 1000;
    this.frameTime = ts;
    this.drawCanvas();
    if (!this.paused) {
      window.requestAnimationFrame(this.tick.bind(this));
    }
  }

  // check to see if click event is on a dot
  collisionTest(event) {
    const adjustedY = event.clientY - this.canvas.offsetTop;
    this.dots.forEach((dot, i) => {
      // this helped with the formula: https://stackoverflow.com/questions/10957689/collision-detection-between-a-line-and-a-circle-in-javascript
      const collision =
        Math.sqrt(Math.pow(event.clientX - dot.x, 2) + Math.pow(adjustedY - dot.y, 2)) <
        dot.radius + 10;
      if (collision) {
        this.scoreControl.update(dot.value, this.rate);
        this.dots.splice(i, 1);
      }
    });
  }

  // standard canvas animation "draw" functionality; clear the canvas, fill, and call moveDots to draw in new positions
  drawCanvas() {
    this.ctx.clearRect(0, 0, this.ctxWidth, this.ctxHeight);
    this.ctx.fillStyle = '#18121e';
    this.ctx.fillRect(0, 0, this.ctxWidth, this.ctxHeight);
    this.moveDots();
  }

  // logic for changing dot y position
  moveDots() {
    this.dots.forEach((dot, i) => {
      const distance = this.rate * this.delta;
      dot.render(distance);

      // remove from bottom; I want to check for height + radius at some point
      if (dot.y > this.ctxHeight * 10) {
        this.dots.splice(i, 1);
      }
    });
  }

  // instantiate new dot and add to array
  makeDot() {
    const radius = (this.rando(1, 10) * 10) / 2;
    const coordinates = { x: this.rando(radius + 2, this.ctxWidth - radius - 2), y: 0 - radius };
    const next = this.colorIndex + 1;
    this.colorIndex = next < this.colorArr.length ? next : 0;
    const dot = new Dot(this.ctx, coordinates, radius, this.colorArr[this.colorIndex]);
    this.dots.push(dot);
  }

  // start game logic
  startGame() {
    if (!this.paused) {
      this.dropInterval = window.setInterval(() => {
        this.makeDot();
      }, 1000);
      // @TODO: if future me does enhancements, add an input to adjust dot generation delay too? The variable would be used here.
      window.requestAnimationFrame(this.tick.bind(this));
    }
  }

  // generate random number in range
  rando(min, max) {
    return Math.floor(Math.random() * max) + min;
  }
}
