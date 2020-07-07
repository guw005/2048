// const scoreDisplay = document.getElementById('score')
// const resultDisplay = document.getElementById('result')
// const gridDisplay = document.getElementById('grid')

const width = 4;
let squares = new Array();
let added = new Array();
let score;
document.addEventListener('DOMContentLoaded', () => {
    startGame();
});
// $(document).ready(function(e){
//     startGame();
// });

    function startGame(){
        initBoard()

        generateNumber();
        generateNumber();
        displayBoard();
    }

    // startGame()
    // console.log(squares);

    //generate board
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

    function displayBoard(){
        // const numCells = document.getElementsByClassName('num-cell');
        $('.num-cell').remove();
        const gridDisplay = document.getElementById('grid');
        // for(let i = 0; i < numCells.length; i++){
        //     numCells[i].remove();
        // }

        for(let i = 0; i < width; i++){
            for(let j = 0; j < width; j++){
                let numCell = document.createElement('div');
                numCell.id = "num-cell-" + i + "-" + j;
                numCell.className = "num-cell"
                gridDisplay.append(numCell);

                if(squares[i][j] == 0){
                    numCell.style.width = "0px";
                    numCell.style.height = "0px";
                    numCell.style.top = (15 + i * 120) + "px";
                    numCell.style.left = (15 + j * 120) + "px";
                    
                }
                else{
                    numCell.style.width = "100px";
                    numCell.style.height = "100px";
                    numCell.style.top = (15 + i * 120) + "px";
                    numCell.style.left = (15 + j * 120) + "px";
                    numCell.style.border = "5px dashed " + backGroundNumColor(squares[i][j]);
                    numCell.style.color = backGroundNumColor(squares[i][j]);
                    numCell.innerHTML = squares[i][j];


                }
            }
        }
    }

    function noPlace(squares){
        for (let i = 0; i < width; i++){
            for(let j = 0; j < width; j++){
                if(squares[i][j] == 0){
                    return false;
                }
            }
        }
        return true;
    }
    

    //generate number 2 or 4 randomly
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

    function resetAdded(){
        for(let i = 0; i < width; i++){
            for(let j = 0; j < width; j++){
                added[i][j] = 0;
            }
        }
    }

    function horiNoCell(row, col1, col2, squares){
        for(let i = col1 + 1; i < col2; i++){
            if(squares[row][i] != 0) {
                return false;
            }
        }
        return true;
    }

    function canMoveRight(squares){
        for(let i = 0; i < width; i++){
            for(let j = 0; j < width; j++){
                if(squares[i][j] != 0 && j != 3){
                    if(squares[i][j+1] == 0 || squares[i][j+1] == squares[i][j]){
                        return true;
                    }
                }
            }
        }
        return false;
    }

    function moveRight(){
        if(!canMoveRight(squares)){
            return false;
        }

        resetAdded();

        for (let i = 0; i < width; i++){
            for(let j = 2; j >=0; j--){
                if(squares[i][j] != 0){
                    for(let k = 3; k > j; k--){
                        if(squares[i][k] == 0 && horiNoCell(i, j, k, squares)){

                            Move(i, j, i, k);
                            squares[i][k] = squares[i][j];
                            squares[i][j] = 0;
                            continue;
                        }
                        else if(squares[i][k] == squares[i][j] && horiNoCell(i, j, k, squares)){
                            Move(i, j, i, k);
                            if(added[i][k] != 0){
                                squares[i][k - 1] = squares[i][j];
                                squares[i][j] = 0;
                            }
                            else{
                                squares[i][k] += squares[i][j];
                                squares[i][j] = 0;
                                added[i][k] = 1;
                                score += squares[i][k];


                            }
                            continue;
                        }
                    }
                }
            }
        }
        setTimeout("displayBoard()", 200);
        return true;
    }

function canMoveLeft(squares) {
    for (let i = 0; i < width; i++) {
        for (let j = 0; j < width; j++) {
            if (squares[i][j] != 0 && j != 0) {
                if (squares[i][j - 1] == 0 || squares[i][j - 1] == squares[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}

    function moveLeft() {
        if (!canMoveLeft(squares)) {
            return false;
        }

        resetAdded();

        for (let i = 0; i < width; i++) {
            for (let j = 1; j < width; j++) {
                if (squares[i][j] != 0) {
                    for (let k = 0; k < j; k++) {
                        if (squares[i][k] == 0 && horiNoCell(i, j, k, squares)) {

                            Move(i, j, i, k);
                            squares[i][k] = squares[i][j];
                            squares[i][j] = 0;
                            continue;
                        }
                        else if (squares[i][k] == squares[i][j] && horiNoCell(i, k, j, squares)) {
                            Move(i, j, i, k);
                            if (added[i][k] != 0) {
                                squares[i][k + 1] = squares[i][j];
                                squares[i][j] = 0;
                            }
                            else {
                                squares[i][k] += squares[i][j];
                                squares[i][j] = 0;
                                added[i][k] = 1;
                                score += squares[i][k];
                            }
                            continue;
                        }
                    }
                }
            }
        }
        setTimeout("displayBoard()", 200);
        return true;
    }

    function vertNoCell(col, row1, row2, squares){
        for(let i = row1 + 1; i < row2; i++){
            if(squares[i][col] != 0){
                return false;
            }
        }
        return true;
    }

function canMoveUp(squares) {
    for (let i = 0; i < width; i++) {
        for (let j = 0; j < width; j++) {
            if (squares[i][j] != 0 && i != 0) {
                if (squares[i - 1][j] == 0 || squares[i - 1][j] == squares[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}
    

    function moveUp(){

        if(!canMoveUp(squares)){
            return false;
        }

        resetAdded();
        for(let j = 0; j < width; j++){
            for(let i = 1; i < width; i++) {
                if(squares[i][j] !=0) {
                    for (let k = 0; k < i; k++){
                        if (squares[k][j] == 0 && vertNoCell(j, k, i, squares)){
                            Move(i, j, k, j);
                            squares[k][j] = squares[i][j];
                            squares[i][j] = 0;
                            continue;
                        }
                        else if(squares[k][j] == squares[i][j] && vertNoCell(j, k, i, squares)){
                            Move(i, j, k, j);
                            if(added[k][j] != 0){
                                squares[k + 1][j] = squares[i][j];
                                squares[i][j] = 0;
                            }
                            else{
                                squares[k][j] += squares[i][j];
                                squares[i][j] = 0;
                                added[k][j] = 1;
                                score += squares[k][j];
                            }
                            continue;
                        }
                    }
                }
            }
        }
        setTimeout("displayBoard()", 200);
        return true;
    }

function canMoveDown(squares) {
    for (let i = 0; i < width; i++) {
        for (let j = 0; j < width; j++) {
            if (squares[i][j] != 0 && i != 3) {
                if (squares[i + 1][j] == 0 || squares[i + 1][j] == squares[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}

    function moveDown() {

        if(!canMoveDown(squares)){
            return false;
        }

        resetAdded();
        for (let j = 0; j < width; j++) {
            for (let i = 2; i >= 0; i--) {
                if (squares[i][j] != 0) {
                    for (let k = 3; k > i; k--) {
                        if (squares[k][j] == 0 && vertNoCell(j, i, k, squares)) {
                            Move(i, j, k, j);
                            squares[k][j] = squares[i][j];
                            squares[i][j] = 0;
                            continue;
                        }
                        else if (squares[k][j] == squares[i][j] && vertNoCell(j, i, k, squares)) {
                            Move(i, j, k, j);
                            if (added[k][j] != 0) {
                                squares[k - 1][j] = squares[i][j];
                                squares[i][j] = 0;
                            }
                            else {
                                squares[k][j] += squares[i][j];
                                squares[i][j] = 0;
                                added[k][j] = 1;
                                score += squares[k][j];
                            }
                            continue;
                        }
                    }
                }
            }
        }
        setTimeout("displayBoard()", 200);
        return true;
    }

function scoreDisplay(){
    document.getElementById('score').innerHTML = score;
}

//assign keycodes
function control(e){
    if(e.keyCode === 37){
        if(moveLeft()){
            generateNumber();
            scoreDisplay();
            setTimeout("isGameOver()", 400);
        }
    }
    else if(e.keyCode === 38){
        if(moveUp()){
            generateNumber();
            scoreDisplay();
            setTimeout("isGameOver()", 400);
        }
    }
    else if(e.keyCode === 39){
        if(moveRight()){
            generateNumber();
            scoreDisplay();
            setTimeout("isGameOver()", 400);
        }
    }
    else if(e.keyCode === 40){
        if(moveDown()){
            generateNumber();
            scoreDisplay();
            setTimeout("isGameOver()", 400);
        }
    }
}

document.addEventListener('keyup', control);

//color animation
function backGroundNumColor(num){
    if(num === 2){
        return "#95a5a6";
    }
    else if(num === 4){
        return "#DC514E";
    }
    else if(num === 8){
        return "#2ecc71";
    }
    else if(num === 16){
        return "#f1c40f"
    }
    else if(num === 32){
        return "#3498db";
    }
    else if(num === 64){
        return "#f65e36";
    }
    else if(num === 128){
        return "#edcf72";
    }
    else if(num === 256){
        return "#ff1f8f";
    }
    else if(num === 512){
        return "#9c0";
    }
    else if(num === 1024){
        return "#3365a5";
    }
    else if(num === 2048){
        return "#09c";
    }
    else if(num === 4096){
        return "#a6bc";
    }
    else if(num === 8192){
        return "#93c";
    }
}

//Game over
function noMove(squares){
    if(canMoveLeft(squares) || canMoveRight(squares) || canMoveUp(squares) || canMoveDown(squares)){
        return false;
    }else{
        return true;
    }
}

function isGameOver(){
    if(noPlace(squares)&&noMove(squares)){
        document.getElementById('result').style.display = "block";
    }
}

// function numColor(num){
//     if(num <= 4){
//         return "#776e65";
//     }
//     else{
//         return "white";
//     }
// }
//add animation

function Move(xi, yi, xf, yf){
    const numCell = $('#num-cell-' + xi + '-' + yi);
    numCell.animate({
        top: (15 + xf * 120) + "px",
        left: (15 + yf * 120) + "px"
    }, 200);
};

function displayNum(i, j, randNum){
    const numCell = $('#num-cell-' + i + '-' + j);
    numCell.css("border", "5px dashed " + backGroundNumColor(randNum));
    numCell.css("color", backGroundNumColor(randNum));
    // numCell.style.backgroundColor = backGroundNumColor(randNum);
    // numCell.style.color = NumColor(randNum);
    numCell.innerHTML = randNum;

    numCell.animate({
        width: "100px",
        height: "100px",
        top: (15 + i * 120) + "px",
        left: (15 + j * 120) + "px"
    }, 50)
}