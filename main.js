var gTableArr = [];
var gNumbersOrder = [];
var tableSize = 16;
var seconds = 0;
var timerInterval = 0;

function startGame() {
    seconds = 0;
    document.querySelector("#seconds").innerText = seconds;

    if (timerInterval) clearInterval(timerInterval);
    createTable();
    createRandomArr();
    changeCurrNumber();
}

function createRandomArr() {
    var arr = [];
    var elTdArr = document.querySelectorAll("td");
    gNumbersOrder = [];
    gTableArr = [];
    for (var i = 1; i <= tableSize; i++) {
        arr.push(i);
        gNumbersOrder.push(i);
    }
    for (var i = 0; i < tableSize; i++) {
        var randomIdx = getRandomIntInclusive(0, arr.length - 1);
        gTableArr.push(arr[randomIdx]);
        elTdArr[i].innerHTML = arr.splice(randomIdx, 1)[0];

    }
}


function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}



//console.log(gNumbersOrder);
//console.log(document.querySelector('.table'));
function createTable() {
    var elTable = document.querySelector('.table');
    var strHtml = '';
    for (var i = 0; i < Math.sqrt(tableSize); i++) {
        strHtml += '<tr>';
        for (var j = 0; j < Math.sqrt(tableSize); j++) {
            strHtml += '<td onclick="onCellClick(this)">cell</td>';
        }
        strHtml += '</tr>';
    }
    elTable.innerHTML = strHtml;
}

function changeCurrNumber() {
    document.querySelector('.currNumberDiv p').innerText = 'next number : ' + gNumbersOrder[0];
}

function onCellClick(cell) {

    if (+cell.innerText === gNumbersOrder[0]) {
        if (gNumbersOrder.length === tableSize) {
            startTimer();
            intevalFunc();
        }
        gNumbersOrder.shift();
        cell.classList.toggle('clickedCell');
        if (gNumbersOrder.length === 0) {
            clearInterval(timerInterval);
            return alert('victory!');
        }
        changeCurrNumber();
    }
    console.log(gNumbersOrder);
}



function startTimer() {
    timerInterval = setInterval(intevalFunc, 1000);
}


function intevalFunc() {
    seconds++;
    document.querySelector(".timerDiv #seconds").innerText = seconds;
}

function onRadioClick(radio) {
    if (radio.dataset.difficulty === 'easy') {
        tableSize = 16;
    } else if (radio.dataset.difficulty === 'medium') {
        tableSize = 25;
    } else {
        tableSize = 36;
    }
}


function onResetBtnClick() {
    startGame();
}