drawBoard(3, 3, 100, 5);

let damierClicks = document.getElementById('damier-input');
let countClicks = 0;

damierClicks.addEventListener('click', countNrOfClicks);
damierClicks.addEventListener('click', giveResult);

let resetClick = document.getElementById('reset');
resetClick.addEventListener('click', clearDrawboard);

let playSquare1 = document.getElementById('square1');
playSquare1.addEventListener('click', gameInput);

let playSquare2 = document.getElementById('square2');
playSquare2.addEventListener('click', gameInput);

let playSquare3 = document.getElementById('square3');
playSquare3.addEventListener('click', gameInput);

let playSquare4 = document.getElementById('square4');
playSquare4.addEventListener('click', gameInput);

let playSquare5 = document.getElementById('square5');
playSquare5.addEventListener('click', gameInput);

let playSquare6 = document.getElementById('square6');
playSquare6.addEventListener('click', gameInput);

let playSquare7 = document.getElementById('square7');
playSquare7.addEventListener('click', gameInput);

let playSquare8 = document.getElementById('square8');
playSquare8.addEventListener('click', gameInput);

let playSquare9 = document.getElementById('square9');
playSquare9.addEventListener('click', gameInput);

function drawBoard(nrlines, nrcolumns, size, borderWidth) {
    let damier = document.createElement('div');
    damier.id = 'damier-input';
    let numberId = 1;
    for (let iLines = 0; iLines < nrlines; ++iLines) {
        let x = size + iLines * (size + borderWidth);
        for (let iColumns = 0; iColumns < nrcolumns; ++iColumns) {
            let y = size + iColumns * (size + borderWidth);
            let square = createSquare(x, y, borderWidth, numberId);
            damier.appendChild(square);
            numberId = numberId + 1;
        }
    }
    document.body.append(damier);
    return damier;
}

function createSquare(x, y, borderwidth, numberId) {
    let square = document.createElement('div');
    square.classList.add("square")
    square.style.borderWidth = borderwidth + "px";
    square.style.top = y + "px";
    square.style.left = x + "px";
    square.id = "square" + numberId
    document.body.appendChild(square);
    return square;
}

function countNrOfClicks() { countClicks = countClicks + 1 }

function gameInput(event) {
    playSquare = event.target;
    if (playSquare.innerText === '') {
        if (countClicks % 2 === 0) {
            playSquare.innerText = 'X';
            playSquare.style.color = 'blue';
            result.innerText = 'Player 2 : your turn';
            result.style.color = 'red'
        } else {
            playSquare.innerText = 'O';
            playSquare.style.color = 'red';
            result.innerText = 'Player 1 : your turn';
            result.style.color = 'blue';
        }
    }
}

let result = document.getElementById('result-dynamic')

/**
 * id des squares:
 *  1 4 7
 *  2 5 8
 *  3 6 9
 */
function giveResult() {
    checkPlayerWin('X');
    checkPlayerWin('O');
    checkNullGame();
}

function checkPlayerWin(playerName) {
    let pn = playerName;
    if ((playSquare1.innerText == pn && playSquare2.innerText == pn && playSquare3.innerText == pn) ||
        (playSquare1.innerText == pn && playSquare4.innerText == pn && playSquare7.innerText == pn) ||
        (playSquare2.innerText == pn && playSquare5.innerText == pn && playSquare8.innerText == pn) ||
        (playSquare3.innerText == pn && playSquare6.innerText == pn && playSquare9.innerText == pn) ||
        (playSquare4.innerText == pn && playSquare5.innerText == pn && playSquare6.innerText == pn) ||
        (playSquare7.innerText == pn && playSquare8.innerText == pn && playSquare9.innerText == pn) ||
        (playSquare1.innerText == pn && playSquare5.innerText == pn && playSquare9.innerText == pn) ||
        (playSquare3.innerText == pn && playSquare5.innerText == pn && playSquare7.innerText == pn)) {
        result.innerText = pn === 'X' ? 'Player 1 wins!' : 'Player 2 wins';
        result.style.color = pn === 'X' ? 'blue' : 'red';
    }
}

function checkNullGame() {
    if (playSquare1.innerText != '' && playSquare2.innerText != '' && playSquare3.innerText != '' &&
        playSquare1.innerText != '' && playSquare4.innerText != '' && playSquare7.innerText != '' &&
        playSquare2.innerText != '' && playSquare5.innerText != '' && playSquare8.innerText != '' &&
        playSquare3.innerText != '' && playSquare6.innerText != '' && playSquare9.innerText != '' &&
        playSquare4.innerText != '' && playSquare5.innerText != '' && playSquare6.innerText != '' &&
        playSquare7.innerText != '' && playSquare8.innerText != '' && playSquare9.innerText != '' &&
        playSquare1.innerText != '' && playSquare5.innerText != '' && playSquare9.innerText != '' &&
        playSquare3.innerText != '' && playSquare5.innerText != '' && playSquare7.innerText != '') {
        result.innerText = 'Draw!';
        result.style.color = 'black';
    }
}


function clearDrawboard() {
    playSquare1.innerText = '';
    playSquare2.innerText = '';
    playSquare3.innerText = '';
    playSquare4.innerText = '';
    playSquare5.innerText = '';
    playSquare6.innerText = '';
    playSquare7.innerText = '';
    playSquare8.innerText = '';
    playSquare9.innerText = '';
    result.innerText = 'Player 1 : your turn';
    result.style.color = 'blue';


}












