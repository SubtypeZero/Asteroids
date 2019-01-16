class EntityManager {

  constructor() {
    this.asteroids = [];
    this.explosions = [];
    this.bullets = [];
    this.ship = new Ship(this);

    this.init();
  }

  init() {
    let n = this.getRandom(2, 5);

    for (let i = 0; i < n; i++) {
      let x = this.getRandom(0, width);
      let y = this.getRandom(0, height);
      let xVel = this.getRandom(-5, 3) + 1;
      let yVel = this.getRandom(-5, 3) + 1;

      let pos = createVector(x, y);
      let vel = createVector(xVel, yVel);

      this.addAsteroid(pos, vel, 3);
    }
  }

  update() {
    if (this.asteroids.length == 0) {
      this.init();
    }

    for (let i = this.asteroids.length - 1; i >= 0; --i) {
      this.asteroids[i].draw();
    }

    for (let i = this.explosions.length - 1; i >= 0; --i) {
      this.explosions[i].draw();
    }

    for (let i = this.bullets.length - 1; i >= 0; --i) {
      this.bullets[i].draw();

      if (this.bullets[i].distance > this.bullets[i].maxDistance) {
        this.bullets.splice(i, 1);
        i--;
      }
    }

    if (this.ship.invisible == false) {
      this.ship.draw();
      this.checkCollisions();
    } else {
      this.checkSpawn();
    }
  }

  addAsteroid(pos, vel, size) {
    this.asteroids.push(new Asteroid(this, pos, vel, size));
  }

  addExplosion(pos) {
    this.explosions.push(new Explosion(this, pos));
  }

  addBullet(pos, heading) {
    this.bullets.push(new Bullet(this, pos, heading));
  }

  getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  checkCollisions() {
    for (let i = this.asteroids.length - 1; i >= 0; --i) {
      let a = this.asteroids[i];
      let b = this.ship;
      let d = dist(a.pos.x, a.pos.y, b.pos.x, b.pos.y) * 2;

      if (d <= a.r + b.r) {
        let size = this.asteroids[i].size;

        if (size > 0) {
          size = size - 1;
          let pos = this.asteroids[i].pos;
          let vel = createVector(this.getRandom(-5, 3) + 1, this.getRandom(-5, 3) + 1);
          this.addAsteroid(pos, vel, size);
          vel = createVector(this.getRandom(-5, 3) + 1, this.getRandom(-5, 3) + 1);
          this.addAsteroid(pos, vel, size);
        }

        this.asteroids.splice(i, 1);
        this.ship.destroy();
        break;
      }

      for (let j = this.bullets.length - 1; j >= 0; --j) {
        b = this.bullets[j];
        d = dist(a.pos.x, a.pos.y, b.pos.x, b.pos.y) * 2;

        if (d <= a.r) {
          let size = this.asteroids[i].size;

          if (size > 0) {
            size = size - 1;
            let pos = this.asteroids[i].pos;
            let vel = createVector(this.getRandom(-5, 3) + 1, this.getRandom(-5, 3) + 1);
            this.addAsteroid(pos, vel, size);
            vel = createVector(this.getRandom(-5, 3) + 1, this.getRandom(-5, 3) + 1);
            this.addAsteroid(pos, vel, size);
          }

          this.asteroids.splice(i, 1);
          this.bullets.splice(j, 1);
          break;
        }
      }
    }
  }

  checkSpawn() {
    let safe = true;

    for (let i = this.asteroids.length - 1; i >= 0; --i) {
      let a = this.asteroids[i];
      let b = this.ship;
      let d = dist(a.pos.x, a.pos.y, b.pos.x, b.pos.y) * 2;

      if (d <= a.r + b.r) {
        safe = false;
        break;
      }
    }

    if (safe == true) {
      this.ship.respawn();
    }
  }
}
