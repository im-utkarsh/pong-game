# 🏓Pong Game
Made Pong Game using JavaScript.

## 🧩Components
* `index.html` contains basic html elements required for this project that are: score, ball and paddle
* `style.css` contains styling related to these.
* `main.js` is the main javascript file for our game. Key point to note here is that the script is added in the head asynchronously using **defer**.  
  Also the type is set to module for importing modules in javascript.

## ⚙️Procedure

### CSS :
In css, the positon of left, righ paddle and ball are made absolute and their position as well as size is defined using `vw` and `vh`. The position of paddles and ball are defined using css variables, which will be changes using javascript later. This way we don't need to change values everywhere manually.  
Similarly background and foreground color are stored in variable which are made from hue value, which is changed using javascript.  
Score is given display of flex and all direct children are given flex grow 1 so that they occupy as much space as possible. Then left score is text alinged to right. This makes sure that scores will remain in middle and on their respective side.

### JavaScript :
First thing to note here is, for any game to work, we need to use an update loop for every frame, which will calculate current position of elements in game. Instead of running with intervel, we will use `requestAnimationFrame` which runs whenever new frame is generated. So all the calculations will be done for every frame.  
`Delta` i.e time spend till last calculation is calculated.

***Ball :*** First lets see how the ball will be operated. A class `Ball` is created and exported from Ball.js file, contains all members related to ball. Getters and setters are used to get and update value of ball position from css variables.  
Velocity is used to move the ball to new position on every frame. A random velocity is initially created by picking a random value from *0 to 2π* for direction. *Sine* and *Cosine* of this define the direction of the ball. An initial speed is defined for the ball to start with.  
Position of the ball is calculated by adding `velocity * direction * delta` to its pre-existing value, hence the ball is moved in that direction. Delta is also used so that a delayed time frame will be accounted properly.  
The velocity is updated by a small amount on each update so that the ball speed increases with time.
```javascript
// Initialising
dir_angle = randomNumberBw(0, 2 * Math.PI);
this.direction = { x: Math.cos(dir_angle), y: Math.sin(dir_angle) };
this.velocity = INITIAL_VELOCITY;

// Updating
this.x += this.velocity * this.direction.x * delta;
this.y += this.velocity * this.direction.y * delta;
this.velocity += VELOCITY_INCREASE * delta;
```
Collisions are handles by checking if the top/bottom value of the ball are in the desired range. If not, value of `y` in velocity direction is reversed to simulate collision.
```javascript
rect = ballElem.getBoundingClientRect();    // bounding rectangle of ball
if (rect.bottom >= window.innerHeight || rect.top <= 0)
    this.direction.y *= -1;
if (paddleRects.some((r) => isCollision(r, rect)))
    this.direction.x *= -1;
```
A similar mechanism is used to check for collision with paddle, which reverses the x in velocity direction.

***Paddle :*** Paddle.js contains the class Paddle which is used to maintain paddle related properties. Similar to Ball class, getter and setter are used for getting and updating paddle positions.  

The main function here is update, which is used to handle computer-paddle. The position of computer-paddle can be set easily by making `position = ball.y`, but then the computer will never loose since the position of the computer paddle is updated instantly.  
Instead we use a `MAX_SPEED` variable which is multipllied with delta and `ball.y - position`. This limits the maximum distance that can be travelled by the computer paddel in given time, giving player a chance to win. This also makes the computer paddle to travel fast/slow depending on the distance between ball and paddle's current position.

For the player-paddle, mousemove/touchmove event listener is used, which will set the position of player paddle to y value of curser.

***Loose :*** An isLose funcion is checked for every frame, which uses similar condition as collision, to check if the left or right wall are couched, and if so, the value of score for the opposite player is increased.

## 🎮Game
The game is live [here](https://im-utkarsh.github.io/pong-game/).

---

## References
https://www.youtube.com/watch?v=PeY6lXPrPaA