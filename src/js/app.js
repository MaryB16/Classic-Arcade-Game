const ENEMY_END_POSITION = 707;
const ENEMY_START_POSITION = -100;

/**
 * Represents an enemy entity on the screen.
 */
class Enemy {
    /**
     * Creates a new instance of an enemy.
     * @param {Number} x The X position of the enemy
     * @param {Number} y The Y position of the enemy
     * @param {Number} speed The speed of the enemy (150 is a slow enemy, 300 is a fast enemy)
     */
    constructor(x, y, speed) {
        this.sprite = 'src/images/enemy-bug.png';
        this.x = x;
        this.y = y;
        this.speed = speed;
    }

    /**
     * Moves the position of the enemy to the right proportional to its speed.
     * @param {Number} dt
     */
    update(dt) {
        this.x += this.speed * dt;
        // Reset the position of the enemy when it goes off-canvas
        if (this.x > ENEMY_END_POSITION) {
            this.x = ENEMY_START_POSITION;
        }
    }

    /**
     * Draws the enemy on screen
     */
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Players start on the 4th column, 7th row, with an Y offset of -31 
const PLAYER_START_X_TILE = 3;
const PLAYER_START_Y_TILE = 7;

/**
 * Represents a player character entity on screen.
 */
class Player {
    /**
     * Creates a new instance of a player.
     */
    constructor() {
        this.sprite = null;
        this.score = 0;
        this.lives = 3;
        this.setInitialPosition();
    }

    /**
     * Collects the points for the given gem.
     * @param {Gem} gem
     */
    collectGem(gem) {
        this.score = this.score + gem.value;
    }

    /**
     * Removes one life point from the player.
     */
    deductLife() {
        playerLives[this.lives - 1].style.visibility = 'hidden';
        this.lives--;
    }

    setInitialPosition() {
        this.x = TILE_WIDTH * PLAYER_START_X_TILE;
        this.y = TILE_HEIGHT * PLAYER_START_Y_TILE - 31;
    }

    update(dt) {
    }

    render() {
        // The player sprite will be set during character select
        if (this.sprite != null) {
            ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        }
    }

    handleInput(key) {
        // The player is considered dead when he has no sprite
        // This prevents the player from moving around with no sprite
        if (this.sprite === null)
            return;

        // Check screen boundries before moving
        if (key === 'up' && this.y > 0) {
            this.y -= TILE_HEIGHT;
        }
        else if (key === 'down' &&
            this.y < TILE_HEIGHT * PLAYER_START_Y_TILE - 31) {
            this.y += TILE_HEIGHT;
        }
        else if (key === 'left' && this.x > 0) {
            this.x -= TILE_WIDTH;
        }
        else if (key === 'right' &&
            this.x < TILE_WIDTH * 6) {
            this.x += TILE_WIDTH;
        }
    }
}

const GEM_HEIGHT = 60;
const GEM_WIDTH = 106;

/**
 * Represents a gem entity on screen.
 */
class Gem {
    constructor(sprite, value) {
        this.sprite = sprite;
        this.value = value;
        this.height = GEM_HEIGHT;
        this.width = GEM_WIDTH;
        this.changePosition();
    }

    /**
     * Randomizes the position of the gem.
     *
     * Gems can only be positioned on between the 3rd and 7th tile vertically.
     * Gems have a 20px horizontal offset and a 30px vertical offset in their tile.
     */
    changePosition() {
        this.x = Math.floor(Math.random() * 7) * TILE_WIDTH + 20;
        this.y = (Math.floor(Math.random() * 5 + 1)) * TILE_HEIGHT + 30;
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y,this.height, this.width);
    }

    update(dt) {
    }
}

const TILE_WIDTH = 101;
const TILE_HEIGHT = 83;

const playerLives = document.querySelectorAll('.lives');
const playerSelector = document.querySelector('.player-selector');

const player = new Player();

const allEnemies = [
    new Enemy(0, 63, 200),
    new Enemy(0, 146, 300),
    new Enemy(0, 229, 150),
    new Enemy(0, 312, 200),
    new Enemy(0, 395, 250)
];

const allGems = [
    new Gem('src/images/Gem Blue.png', 50),
    new Gem('src/images/Gem Green.png', 100),
    new Gem('src/images/Gem Orange.png', 150)
];

const allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
    13: 'enter'
};
let gameStarted = false;

// Listens for key presses and forwards them to the player or character selector
document.addEventListener('keyup', function (e) {
    const pressedKeyName = allowedKeys[e.keyCode];

    if (gameStarted === false)
        handleCharacterSelectInput(pressedKeyName);
    else
        player.handleInput(pressedKeyName);
});

const SELECTOR_OFFSET = 117;
const CHARACTER_SELECTOR_START = 116;
const CHARACTER_SELECTOR_END = 500;
let selectedCharacterIndex = 0;

/**
 * Moves the character selection indicator and selects the character based on user input.
 * @param {String} key The key that was pressed
 */
function handleCharacterSelectInput(key) {
    const selectorPosition = parseInt(window.getComputedStyle(playerSelector).getPropertyValue('left'));

    if (key === 'left') {
        if (selectorPosition > CHARACTER_SELECTOR_START) {
            selectedCharacterIndex--;
            playerSelector.style.left = (selectorPosition - SELECTOR_OFFSET) + 'px';
        }
    }

    if (key === 'right') {
        if (selectorPosition < CHARACTER_SELECTOR_END) {
            selectedCharacterIndex++;
            playerSelector.style.left = (selectorPosition + SELECTOR_OFFSET) + 'px';
        }
    }

    if (key === 'enter') {
        selectCharacter(selectedCharacterIndex)
        hideCharacterSelectionScreen();
        gameStarted = true;
    }
}

/**
 * Sets the sprite of the player equal to that of the selected character.
 * @param {any} whatCharacter
 */
function selectCharacter(whatCharacter) {
    const playerSprites = document.querySelectorAll('.player-sprite');
    player.sprite = playerSprites[whatCharacter].getAttribute('src');
}

function hideCharacterSelectionScreen() {
    const gameStartModal = document.querySelector('.game-start-modal-container');
    gameStartModal.style.display = 'none';
}