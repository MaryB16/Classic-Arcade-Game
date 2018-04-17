//Enemy Class

class Enemy {
    constructor(x, y) {
        this.sprite = 'images/enemy-bug.png';
        this.x = x;
        this.y = y;
    }

    update(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}


//Player Class

class Player {
    constructor(x, y) {
        this.sprite ='images/char-horn-girl.png';
        this.x = x;
        this.y = y;
    }

    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(key) {
 console.log(`I has the player pressed this key: ${key}`)
   }

}

//new player with just position declared
let player = new Player(303, 600);
//the enemy list
const enemy1 = new Enemy(0, 63);
const enemy2 = new Enemy(0, 146);
const enemy3 = new Enemy(0, 229);
const enemy4 = new Enemy(0, 312);
const enemy5 = new Enemy(0, 395);

let allEnemies = [enemy1, enemy2, enemy3, enemy4,enemy5];

//Listens for key pressed and sends them to player.handleInput method
document.addEventListener('keyup', function (e) {
    var pressedKey = e.keyCode;
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    var pressedKeyName = allowedKeys[pressedKey];
    player.handleInput(pressedKeyName);
});
