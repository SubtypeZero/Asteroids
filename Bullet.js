class Bullet {

  constructor(manager, shipPos, shipHeading) {
    this.entityManager = manager;
    this.pos = createVector(shipPos.x, shipPos.y);
    this.vel = p5.Vector.fromAngle(shipHeading - PI / 2);
    this.maxSpeed = 10;
    this.vel.mult(this.maxSpeed);
    this.size = 2;
    this.distance = 0;
    this.maxDistance = height;
  }

  draw() {
    this.edges();
    this.update();

    push();
    translate(this.pos.x, this.pos.y);
    stroke(255);
    strokeWeight(3);
    point(0, 0);
    pop();
  }

  update() {
    this.pos.add(this.vel);
    this.distance += this.maxSpeed;
  }

  edges() {
    if (this.pos.x < 0) {
      this.pos.x = width - 1;
    } else if (this.pos.x > width) {
      this.pos.x = 1;
    }

    if (this.pos.y < 0) {
      this.pos.y = height - 1;
    } else if (this.pos.y > height) {
      this.pos.y = 1;
    }
  }
}
