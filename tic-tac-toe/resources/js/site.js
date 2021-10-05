let player;

initGame();

/**
 * initialise le jeu
 * @param {Element} board : le damier
 */
function initGame(board) {
    player = 'X';
    if (board) {
        emptyCells(board);
        emptyMessage(board);
    }
}

/**
 * joue un coup
 * @param {Element} element est l'élément cliqué
 */
function doPlay (element) {
    // quand on clique sur le message, on redémarre l'application
    if (element.id === 'message') {
        initGame(element.parentElement.firstElementChild);
        return;
    }
    // référence sur le damier (pour aléger la suite du code)
    let board = element.parentElement;
    // si la partie est terminée, on redémarre l'application
    if (isBoardFull(board) || getWinner(board)) {
        initGame(board);
        return;
    }
    // si la ccase est vide
    if (isCellEmpty(element)) {
        setPlayerInCell(element);
        switchPlayer();
    }
}

/**
 * indique si la cellule est vide
 * @param {Element} cell est la cellule
 * @returns true si la cellule est vide, sinon false
 */
function isCellEmpty(cell) {
    return cell.innerText.length === 0;
}

/**
 * place le "pion" du joueur dans la cellule et en déduit les conclusions
 * @param {Element} cell est la cellule
 * @param {string} player (X ou O)
 */
function setPlayerInCell(cell) {
    let board = cell.parentElement;
    cell.innerText = player;
    let winnerCandidate = getWinner(board);
    if (winnerCandidate) showMessage(board, `Joueur ${winnerCandidate} gagne`);
    else if (isBoardFull(board)) showMessage(board, 'Match null')
}

/**
 * change le joueur X=>O ou O=>X
 */
function switchPlayer() {
    player = (player == 'X') ? 'O' : 'X';
}

/**
 * la partie est-elle terminée
 * @param {Element} board l'élément board
 * @returns boolean
 */
function isBoardFull (board) {
    return ! [...board.children].find(cell => cell.innerText.length === 0);    
}

/**
 * aide: les cellules sont organisées comme suit:
 * 0 1 2
 * 3 4 5
 * 6 7 8
 * @param {Element} board : le damier
 * @returns retourne le gagnant ('X' ou 'O') ou null, s'il n'y a pas de gagnant
 */
function getWinner(board) {
    let cells = [...board.children].map(c => c.innerText);
    for (let i = 0; i < 3; ++i) {
        if (cells[i * 3] != ' ' && cells[i * 3] == cells[1 + i * 3] && cells[i * 3] == cells[2 + i * 3]) return cells[i * 3];
        if (cells[i] != ' ' && cells[i] == cells[i + 3] && cells[i] == cells[i + 6]) return cells[i];
    }
    if (cells[0] != ' ' && cells[0] == cells[4] && cells[0] == cells[8]) return cells[0];
    if (cells[2] != ' ' && cells[2] == cells[4] && cells[2] == cells[6]) return cells[2];
    return null;
}

/**
 * vide les cellules
 * @param {Element} board : le damier
 */
function emptyCells(board) {
    [...board.children].forEach(cell => cell.innerText = '');
}

/**
 * affiche un message
 * @param {Element} board : le damier
 * @param {string} text : le texte du message à afficher
 */
function showMessage(board, text) {
    let message = board.nextElementSibling;
    message.innerText = text;
    message.style.display = 'block';
}

/**
 * efface le message
 * @param {Element} board : le damier
 */
function emptyMessage(board) {
    let message = board.nextElementSibling;
    message.innerText = '';
    message.style.display = 'none';
}