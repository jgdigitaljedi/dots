class GameControl {
  constructor(canvas, toggle, speedSlider, scoreboard, sliderValue) {
    /** canvas related */
    this.canvas = canvas; // canvas
    this.ctx = canvas.getContext('2d'); // canvas context

    /** control elements */
    this.slider = speedSlider; // speed slider
    this.sliderValue = sliderValue; // element containing slider value on DOM
    this.toggle = toggle; // start/pause button

    /** state */
    this.delta = null; // manipulation of time variables to advance the animations
    this.dots = []; // array of dots being displayed
    this.dropInterval = null; // interval for game assigned to variable so it can be cancelled as well
    this.frameTime = new Date(); // last time stamp for a frame
    this.paused = true; // paused state
    this.pauseTime = null; // used when pausing to keep track of time between pause and timestamp
    this.rate = 10; // drop speed

    /** constants */
    this.colorArr = ['#984b43', '#eac67a', '#50555c', '#233237']; // colors for dots
    this.controls = new StartButton(toggle, speedSlider); // instance of controls class
    this.scoreControl = new ScoreControl(scoreboard); // instance of score class

    /** methods that need bind because called by window outside of closure */
    this.collisionTest = this.collisionTest.bind(this);
    this.drawCanvas = this.drawCanvas.bind(this);
    this.makeDot = this.makeDot.bind(this);

    /** start listeners to start game */
    this.handleClick();
    this.handleSlider();
    this.init();
  }

  /******* Handlers / events *******/

  // logic to start "start"/"pause" button logic
  init() {
    this.toggle.addEventListener('click', event => {
      if (this.toggle.classList.contains('pause-game')) {
        this.paused = false;
        if (this.pauseTime) {
          this.frameTime = new Date() - this.pauseTime;
        }
        this.controls.playPause(true);
        this.startGame();
      } else {
        window.clearInterval(this.dropInterval);
        this.paused = true;
        this.pauseTime = new Date() - this.frameTime;
        this.controls.playPause();
      }
    });
  }

  // if user changes speed slider then speed up drop rate
  handleSlider() {
    this.slider.addEventListener('change', event => {
      this.sliderValue.innerText = event.target.value;
      this.rate = event.target.value * 10;
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
    this.canvas.width = width;
    this.canvas.height = height;
    this.removeDotsOutside();
  }

  /******* helpers ******/

  // generate random number in range
  rando(min, max) {
    return Math.floor(Math.random() * max) + min;
  }

  // when window is resized, remove dots outside of new canvas width
  removeDotsOutside() {
    this.dots.forEach((dot, i) => {
      if (dot.x + dot.radius > this.canvas.width) {
        this.dots.splice(i, 1);
      }
    });
  }

  dotColor(radius) {
    if (radius < 13) {
      return this.colorArr[0];
    } else if (radius >= 13 && radius < 26) {
      return this.colorArr[1];
    } else if (radius >= 26 && radius < 37) {
      return this.colorArr[2];
    } else {
      return this.colorArr[3];
    }
    // I was gonna get fancy with some math here, but this is still simple and quick so...
  }

  /****** state management ******/

  // start game logic
  startGame() {
    if (!this.paused) {
      this.dropInterval = window.setInterval(() => {
        this.makeDot();
      }, 1000);
      // @TODO: if future me does enhancements, add an input to adjust dot generation delay too? The variable would be used here.
      window.requestAnimationFrame(this.tick.bind(this)); // window so needs scope bound
    }
  }

  // advance animation frame
  tick() {
    const ts = this.pauseTime ? new Date() - this.pauseTime : new Date();
    this.delta = (ts - this.frameTime) / 1000;
    this.frameTime = ts;
    this.drawCanvas();
    if (!this.paused) {
      window.requestAnimationFrame(this.tick.bind(this)); // window so needs scope bound
    }
  }

  // check to see if click event is on a dot
  collisionTest(event) {
    const adjustedY = event.clientY - this.canvas.offsetTop;
    this.dots.forEach((dot, i) => {
      // this helped with the formula: https://stackoverflow.com/questions/10957689/collision-detection-between-a-line-and-a-circle-in-javascript
      const collision =
        Math.sqrt(Math.pow(event.clientX - dot.x, 2) + Math.pow(adjustedY - dot.y, 2)) < dot.radius;
      if (collision) {
        this.scoreControl.update(dot.value, this.rate);
        this.dots.splice(i, 1); // mutative; could have also done a filter and reassignment but that seemed silly
      }
    });
  }

  /******** canvas logic ******/

  // standard canvas animation "draw" functionality; clear the canvas, fill, and call moveDots to draw in new positions
  drawCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = '#18121e';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.moveDots();
  }

  // logic for changing dot y position
  moveDots() {
    this.dots.forEach((dot, i) => {
      const distance = this.rate * this.delta;
      dot.render(distance);

      // remove from bottom; basically check if y - radius is offscreen to make sure whole dot is off screen
      // multiplying by 2 to give padding for possible VERTICAL resizing to work as expected; make the game take slightly more memory but worth it
      if (dot.y - dot.radius > this.canvas.height * 2) {
        this.dots.splice(i, 1); // again with the mutative approach
      }
    });
  }

  // instantiate new dot and add to array
  makeDot() {
    const radius = (this.rando(1, 10) * 10) / 2; // take a rand between 1 and 10, multiply by ten to make it 10 - 100, then divide in half to get radius
    const coordinates = {
      x: this.rando(radius + 2, this.canvas.width - radius * 2 - 2), // minus 2 and plus 2 for a bit of padding
      y: 0 - radius
    };
    const dot = new Dot(this.ctx, coordinates, radius, this.dotColor(radius));
    this.dots.push(dot);
  }
}
