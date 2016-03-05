'use strict';


var drawArr = [],
    xySwitch = true,
    table = document.getElementsByClassName("table")[0],
    children = table.children[0].children,
    td = document.getElementsByTagName("td"),
    startButton = document.querySelector('.startGame'),
    winnerText = document.querySelector('.winner');

var cells = [[td[0], td[1], td[2]], [td[3], td[4], td[5]], [td[6], td[7], td[8]]];

function checkIfDraw(el) {
    drawArr.push(el);
    drawArr.forEach(function (val, i, arr) {
        if (val === undefined) {
            drawArr.splice(i, 1);
        }
    });
    if (drawArr.length === 9) {
        drawArr = [];
        console.log('Draw');
        setTimeout(function () {
            clearAll(el);
        }, 2000);
    }
}

function clearAll() {
    drawArr = [];
    for (var i = 0; i < td.length; i++) {
        td[i].innerHTML = '';
    }
}

function gameStart() {
    for (var i = 0; i < td.length; i++) {
        (function (i) {
            var el = td[i];
            td[i].addEventListener("click", function (e) {              
                socket.emit('move', {index : i}); 
                if (xySwitch) {
                 
                    if (el.innerHTML === 'o') {
                        return;
                    }

                    el.innerHTML = "x";
                    xySwitch = false;
                    el.style.color = "green";
                    el.className = "x";
                    /*
                    if(winner(el, 'x')){
                        drawArr = [];
                        setTimeout(function(){
                            clearAll(el);
                        }, 2000)
                        xySwitch = true;
                    }
                    */
                    if (checkForWinner(el, 'x')) {
                        drawArr = [];
                        setTimeout(function () {
                            clearAll();
                        }, 2000);
                        xySwitch = true;
                    }
                    checkForWinner(el, 'x');
                    checkIfDraw(el);
                } else if (xySwitch === false) {

                    if (el.innerHTML === 'x') {
                        return;
                    }

                    el.innerHTML = "o";
                    xySwitch = true;
                    el.style.color = "red";
                    el.className = "o";
                    /*
                    if(winner(el, 'o')){
                        setTimeout(function(){
                            clearAll(el);
                        }, 2000)
                        xySwitch = true;
                        drawArr = [];
                    }
                    */
                    if (checkForWinner(el, 'o')) {
                        drawArr = [];
                        setTimeout(function () {
                            clearAll();
                        }, 2000);
                        xySwitch = true;
                    }
                    checkIfDraw(el);
                }
            });
        })(i);
    }
}

function oneVsOne() {
    startButton.addEventListener('click', function () {
        gameStart();
    });
}

function removeWinningText(x){
    winnerText.innerHTML = x + ' wins';
    setTimeout(function() {
        winnerText.innerHTML = '';
    }, 2000);
}

function checkForWinner(el, x) {

    function checkForVertical() {
        var firstRow = 0,
            secondRow = 0,
            thirdRow = 0;
        for (var i = 0; i < 3; i++) {
            if (cells[i][0].innerHTML === x) {
                firstRow++;
                if (firstRow === 3) {
                    firstRow = 0;
                    removeWinningText(x);
                    return true;
                }
            }
            if (cells[i][1].innerHTML === x) {
                secondRow++;
                if (secondRow === 3) {
                    secondRow = 0;
                    removeWinningText(x);
                    return true;
                }
            }
            if (cells[i][2].innerHTML === x) {
                thirdRow++;
                if (thirdRow === 3) {
                    thirdRow = 0;
                    removeWinningText(x);
                    return true;
                }
            }
        }
    }

    function checkForXorizontal() {
        var firstRow = 0,
            secondRow = 0,
            thirdRow = 0;
        for (var i = 0; i < 3; i++) {
            if (cells[0][i].innerHTML === x) {
                firstRow++;
                if (firstRow === 3) {
                    firstRow = 0;
                    removeWinningText(x);
                    return true;
                }
            }
            if (cells[1][i].innerHTML === x) {
                secondRow++;
                if (secondRow === 3) {
                    secondRow = 0;
                    removeWinningText(x);
                    return true;
                }
            }

            if (cells[2][i].innerHTML === x) {
                thirdRow++;
                if (thirdRow === 3) {
                    thirdRow = 0;
                    removeWinningText(x);
                    return true;
                }
            }
        }
    }

    function checkForDiagonal() {
        var firstXor = 0,
            secondXor = 0;
        for (var i = 0; i < 3; i++) {
            if (cells[i][i].innerHTML === x) {
                firstXor++;
                if (firstXor === 3) {
                    firstXor = 0;
                    removeWinningText(x);
                    return true;
                }
            }
        }

        if (td[2].innerHTML === x && td[4].innerHTML === x && td[6].innerHTML === x) {
            removeWinningText(td[2].innerHTML);
            return true;
        }

    }

    if (checkForVertical() || checkForXorizontal() || checkForDiagonal() === true) {
        return true;
    }
}

