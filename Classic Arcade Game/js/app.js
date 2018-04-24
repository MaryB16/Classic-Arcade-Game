  const tileWidth = 101;
  const tileHeight = 83;
  let playerLives = document.querySelectorAll('.lives')
  let lifeNumber = 3;

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
    constructor(sprite, x, y, score) {
        //the player sprite is fix set for testing purposes
        this.sprite = 'images/char-boy.png';
        //player starts on the 4th column, 7th row, with an Y offset of -31 
        this.x = tileWidth * 3;
        this.y = tileHeight * 7 - 31;
        this.score = 0;
    }

    collectGem(gemValue) {
        this.score = this.score + gemValue;
    }

    looseLife() {
        //array index starts at 0
        playerLives[lifeNumber-1].style.display = 'none';
        lifeNumber--;
    }

    setInitialPosition() {
        this.x = 303;
        this.y = 550;
    }
    update(dt) {

    }

    render() {
        //The player sprite will be set during character select
        if (this.sprite != null) {
            ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        }
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

//Gem class

class Gem {
    constructor(sprite, value, x, y, width, height) {
        this.sprite = sprite;
        this.value = value;
        // X can only have 7 values (there are 7 tiles/columns in the canvas)
        // In order for the gem to be in the middle of the tile, the x needs to have an offset of 20
        //Math.floor(Math.random()*7) gives a number between 0 and 6 
        // X can have a value according to this formula nr*tileWidth +20
        this.x = Math.floor(Math.random() * 7) * tileWidth + 20;

        //Y can only have 5 values (5 tiles out of the 8).It starts with the 3 tile and ends with the 7th
        //In order for the game to be in the middle of the tile it needs an offset of 30
        //The formula is nr*tileHeight +30. Nr needs to be a number between 1 and 5
        //Thus  nr = Math.floor(Math.random()*5 +1)
        this.y = (Math.floor(Math.random() * 5 + 1)) * tileHeight + 30;
        
        this.height = 60;
        this.width = 106;
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y,this.height, this.width);
    }

    update(dt) {

    }
}
//Player starts at fix position(303,550)
let player = new Player();
//the enemy list
const enemy1 = new Enemy(0, 63, 200);
const enemy2 = new Enemy(0, 146, 300);
const enemy3 = new Enemy(0, 229, 150);
const enemy4 = new Enemy(0, 312, 200);
const enemy5 = new Enemy(0, 395, 240);

let allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5];

let gem1 = new Gem('images/Gem Blue.png', 50);
const gem2 = new Gem('images/Gem Green.png', 100);
const gem3 = new Gem('images/Gem Orange.png', 150);

let allGems = [gem1, gem2, gem3];
//Listens for key pressed and sends them to player.handleInput method
document.addEventListener('keyup', function (e) {
    var pressedKey = e.keyCode;
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        13: 'enter'
        
    };
    var pressedKeyName = allowedKeys[pressedKey];

    if (player.sprite === null) {
        handleCharacterSelectInput(pressedKeyName);
    }
    else player.handleInput(pressedKeyName);
});

let characterIncrement = 0;

function handleCharacterSelectInput(key) { 
    let playerSelector = document.querySelector('.playerSelector');
    const selectorPosition = parseInt(window.getComputedStyle(playerSelector).getPropertyValue('left'));
    const selectorOffset = 117;
    
    if (key === 'left') {
        if (selectorPosition > 116)
            playerSelector.style.left = (selectorPosition - selectorOffset) + 'px';

        if (characterIncrement > 0) {
            characterIncrement--;
            console.log(`I have selected the character ${characterIncrement}`)
        }
    }

    if (key === 'right') {
        if (selectorPosition < 500)
            playerSelector.style.left = (selectorPosition + selectorOffset) + 'px';

        if (characterIncrement < 4) {
            characterIncrement++;
            console.log(`I have selected the character ${characterIncrement}`)
        }
    }

    if (key === 'enter') {
        selectCharacter(characterIncrement)
        hideCharacterSelectionScreen();
    }
}

function selectCharacter(whatCharacter) {
    const playerSprites = document.querySelectorAll('.playerSprite');
    console.log(playerSprites[whatCharacter])
    console.log(`I have selected the character ${whatCharacter}`)
    console.log(playerSprites[whatCharacter].src)
    player.sprite = playerSprites[whatCharacter].getAttribute('src');
}

function hideCharacterSelectionScreen() {
    const gameStartModal = document.querySelector('.gameStartModal-container');
    gameStartModal.style.display = 'none';
}
