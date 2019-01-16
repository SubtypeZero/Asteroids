let ship;
let entityManager;

function setup() {
	createCanvas(800, 800);
	this.entityManager = new EntityManager();
}

function draw() {
	background(51);
	this.entityManager.update();
}

function keyPressed() {
	if (keyCode == LEFT_ARROW) {
		this.entityManager.ship.setRotation(-0.1);
	} else if (keyCode == RIGHT_ARROW) {
		this.entityManager.ship.setRotation(0.1);
	}

	if (keyCode == UP_ARROW) {
		this.entityManager.ship.boosting = true;
	}

	if (keyCode == 32) {
		this.entityManager.ship.fire();
	}
}

function keyReleased() {
	if (keyCode == LEFT_ARROW || keyCode == RIGHT_ARROW) {
		this.entityManager.ship.setRotation(0);
	}

	if (keyCode == UP_ARROW) {
		this.entityManager.ship.boosting = false;
	}
}
