const INITIAL_VELOCITY = 0.025;
const VELOCITY_INCREASE = 0.000001;

export default class Ball {
    constructor(ballElem) {
        this.ballElem = ballElem;
        this.reset();
    }

    rect() {
        return this.ballElem.getBoundingClientRect();
    }

    // getters and setters for the x and y position of balls
    get x() {
        return parseFloat(
            getComputedStyle(this.ballElem).getPropertyValue("--x")
        );
    }

    set x(value) {
        this.ballElem.style.setProperty("--x", value);
    }

    get y() {
        return parseFloat(
            getComputedStyle(this.ballElem).getPropertyValue("--y")
        );
    }

    set y(value) {
        this.ballElem.style.setProperty("--y", value);
    }

    reset() {
        this.x = 50;
        this.y = 50;
        this.direction = { x: 0 };
        while (
            Math.abs(this.direction.x) <= 0.2 ||
            Math.abs(this.direction.x) >= 0.9
        ) {
            const dir_angle = randomNumberBw(0, 2 * Math.PI);
            this.direction = { x: Math.cos(dir_angle), y: Math.sin(dir_angle) };
        }
        this.velocity = INITIAL_VELOCITY;
    }

    update(delta, paddleRects) {
        this.x += this.velocity * this.direction.x * delta;
        this.y += this.velocity * this.direction.y * delta;
        this.velocity += VELOCITY_INCREASE * delta;
        const rect = this.rect();
        if (rect.bottom >= window.innerHeight || rect.top <= 0)
            this.direction.y *= -1;
        if (paddleRects.some((r) => isCollision(r, rect)))
            this.direction.x *= -1;
    }
}

function randomNumberBw(min, max) {
    return Math.random() * (max - min) + min;
}

function isCollision(rect1, rect2) {
    return (
        rect1.left <= rect2.right &&
        rect1.right >= rect2.left &&
        rect1.top <= rect2.bottom &&
        rect1.bottom >= rect2.top
    );
}
