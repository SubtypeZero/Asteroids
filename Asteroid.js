class Asteroid {

  constructor(manager, pos, vel, size) {
    this.entityManager = manager;
    this.pos = createVector(pos.x, pos.y);
    this.vel = vel;
    this.size = size;
    this.r = 60 - (20 * (0 - size / 2));
    this.points = manager.getRandom(8, 16);
    this.offset = [];

    for (let i = 0; i < this.points; i++) {
      this.offset[i] = manager.getRandom(-35, -20);
    }
  }

  draw() {
    this.edges();
  	this.update();

    push();
    translate(this.pos.x, this.pos.y);
    noFill();
    stroke(255);

    beginShape();
    for (let i = 0; i < this.points; i++) {
      let angle = map(i, 0, this.points, 0, TWO_PI);
      let r = this.r + this.offset[i];
      let x = r * cos(angle);
      let y = r * sin(angle);
      vertex(x, y);
    }
    endShape(CLOSE);
    //ellipse(0, 0, this.r, this.r);
    pop();
  }

  update() {
    this.pos.add(this.vel);
  }

  edges() {
    if (this.pos.x < 0) {
      this.pos.x = width;
    } else if (this.pos.x > width) {
      this.pos.x = 0;
    }

    if (this.pos.y < 0) {
      this.pos.y = height;
    } else if (this.pos.y > height) {
      this.pos.y = 0;
    }
  }
}
