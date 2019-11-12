class Dot {
  constructor(ctx, coords, radius, color) {
    this.color = color;
    this.ctx = ctx;
    this.radius = radius || 10; // min of 10
    this.value = 10 - this.radius / 10;
    this.x = coords.x || 0; // slight error proofing
    this.y = coords.y || 0; // slight error proofing
  }

  render(rate) {
    this.y += rate || 0;
    this.ctx.strokeStyle = '#fafafa';
    this.ctx.lineWidth = Math.ceil(this.radius / 5);
    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.ctx.stroke();
    this.ctx.fill();
    this.ctx.closePath();
  }
}
