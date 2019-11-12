class StartButton {
  constructor(toggle) {
    this.toggle = toggle;
  }

  // logic for changing appearence of start/pause button when clicked
  playPause(play) {
    if (play) {
      this.toggle.innerText = 'Pause';
      this.toggle.classList.remove('pause-game');
    } else {
      this.toggle.innerText = 'Start';
      this.toggle.classList.add('pause-game');
    }
  }
}
