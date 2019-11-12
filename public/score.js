class ScoreControl {
  constructor(scoreboard) {
    this.scoreboard = scoreboard;
    this.score = 0;
  }

  update(value, rate) {
    this.score += Math.round(value + rate / 10);
    this.scoreboard.innerText = this.score;
  }
}
