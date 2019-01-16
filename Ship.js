class Ship {

  constructor(manager) {
    this.entityManager = manager;
    this.pos = createVector(width / 2, height / 2);
    this.vel = createVector();
    this.r = 15;
    this.heading = 0;
    this.rotation = 0;
    this.maxSpeed = 8;
    this.boosting = false;
    this.invisible = false;
  }

  draw() {
    this.edges();
  	this.turn();
  	this.update();

    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.heading);
    noFill();
    stroke(255);

    beginShape();
    vertex(0, -this.r);
    vertex(this.r, this.r);
    vertex(0, this.r - (this.r / 3));
    vertex(-this.r, this.r);
    endShape(CLOSE);

    if (this.boosting) {
      beginShape();
      let x = dist(this.r, this.r, 0, this.r) / 2;
      let y = dist(0, this.r - (this.r / 3), 0, this.r) / 2;
      vertex(this.r - x, this.r - y);
      vertex(0, this.r + y * 3);
      vertex(-this.r + x, this.r - y);
      endShape();
    }

    pop();
  }

  update() {
    if (this.boosting) {
      this.thrust();
    }
    this.pos.add(this.vel);
    this.vel.mult(0.99);
  }

  setRotation(angle) {
    if (this.invisible == false) {
      this.rotation = angle;
    }
  }

  turn() {
    this.heading += this.rotation;

    if (abs(this.heading) > TWO_PI) {
      this.heading = 0;
    }
  }

  fire() {
    if (this.invisible == false) {
      this.entityManager.addBullet(this.pos, this.heading);
    }
  }

  thrust() {
    if (this.invisible == false) {
      let v = createVector(Math.cos(this.heading - PI / 2), Math.sin(this.heading - PI / 2));
      v.div(2);
      this.vel.add(v);
      this.vel.limit(this.maxSpeed);
    }
  }

  destroy() {
    this.invisible = true;
    this.pos = createVector(width / 2, height / 2);
    this.vel = createVector();
    this.heading = 0;
    this.rotation = 0;
    this.boosting = false;
  }

  respawn() {
    this.invisible = false;
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
