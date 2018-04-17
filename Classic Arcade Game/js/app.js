  const tileWidth = 101;
  const tileHeight = 83;


//Enemy Class

class Enemy {
    constructor(x, y,speed) {
        this.sprite = 'images/enemy-bug.png';
        this.x = x;
        this.y = y;
        this.speed = speed;
    }

    update(dt) {
        this.x += this.speed * dt;
        if (this.x > 707) {
            // I place the enemy a little out of the page so it looks like they are constantly moving not appearing suddenly
            this.x = -100;
        }
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
   
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(key) {
        console.log(`I has the player pressed this key: ${key} and is at Y: ${this.y} and X: ${this.x}`)
       //I check to make sure the player isn't at the edge of the screen
        if (key === 'up' && this.y > 0) {
            this.y = this.y - tileHeight;
        }
        else if (key === 'down' && this. y < 550) {
            this.y = this.y + tileHeight;
        }

        else if (key === 'left' && this.x > 0) {
            this.x = this.x - tileWidth;
        }

        else if (key === 'right' && this. x < 550) {
            this.x = this.x + tileWidth;
        }
    }

}

//new player with just position declared
let player = new Player(303, 550);
//the enemy list
const enemy1 = new Enemy(0, 63, 200);
const enemy2 = new Enemy(0, 146, 300);
const enemy3 = new Enemy(0, 229, 150);
const enemy4 = new Enemy(0, 312, 200);
const enemy5 = new Enemy(0, 395, 240);

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
