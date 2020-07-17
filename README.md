# Space 2048
<table>
<tr>
<td>
  Space 2048 is a game that users can use their arrow keys to move the tiles. When two tiles with the same number touch, they add together and merge into one.
</td>
</tr>
</table>


## Demo
Here is a working live demo :  https://guw005.github.io/Space2048/

## Site
### Introduction
![](https://github.com/guw005/MeTube/blob/master/index_snap.png)
### Gameplay
![](https://github.com/guw005/MeTube/blob/master/show_snap.png)



## Technologies
- JavaScript
- HTML5
- CSS

## Initializing the Game
The game will be started once the page is loaded and by clicking on the play button the introduction modal will be closed.

The board was initialized by creating 4 by 4 grid and placing each cell to their exact position.
```javascript
   function startGame(){
        initBoard()

        generateNumber();
        generateNumber();
        displayBoard();
    }

    function initBoard(){
        const scoreDisplay = document.getElementById('score');
        score = 0;
        document.getElementById("result").style.display = "none";
        scoreDisplay.innerHTML = score;

        for (let i = 0; i < width; i++) {
            squares[i] = new Array();
            added[i] = new Array();

            for (let j = 0; j < width; j++) {
                let gridCell = document.getElementById('grid-cell-' + i + '-' + j);

                gridCell.style.top = (15 + i * 120) + "px";
                gridCell.style.left = (15 + j * 120) + "px";
                squares[i][j] = 0;
                added[i][j] = 0;
            }
        }


        displayBoard();
    }
```

## Generating number 2 or 4 randomly
Every move will generate a new number, which could be number 2 or 4.
Randomly pick position X and position Y using Math.random() and using Math.random() < 0.5 to pick between number 2 and 4.

```javascript
    function generateNumber(){
        if (noPlace(squares)){
            return false;
        }

        let randX = Math.floor(Math.random() * width);
        let randY = Math.floor(Math.random() * width);
        if (squares[randX][randY] == 0 ) {
            let randNum = Math.random() < 0.5 ? 2 : 4;
            squares[randX][randY] = randNum;
            displayNum(randX, randY, randNum);
            return true;

        } else {
            generateNumber();
        }
    }
```
## Background Music
Due to the restriction of chrome, the background music cannot achieve auto-play right now. However, by clicking on either play button in the modal or music button in the game, the background music will be played or paused.
```javascript
function displayAudioStatus(){
        document.getElementById('audio-status').innerHTML = isAudioPlay;
    }

    function playMusic(){
        const backgroundMusic = document.getElementById('audio');

        if(isAudioPlay === "OFF" && firstClick){
            backgroundMusic.play();
            isAudioPlay = "ON";
            firstClick = false;
            displayAudioStatus();
        }
    }

    function controlMusic(){
        const backgroundMusic = document.getElementById('audio');
        if(isAudioPlay === "ON"){
            backgroundMusic.pause();
            isAudioPlay = "OFF" ;
        } else {
            backgroundMusic.play();
            isAudioPlay = "ON";
        }
        displayAudioStatus();
    }
```
