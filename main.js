const allWord = [
    'life', 'guess', 'mobile', 'song', 'superb', 'study', 'fruit', 'flower'
];
const words = document.querySelector('.words');
const screen = document.querySelector('.screen');
const right = document.querySelector('.right p');
const wrong = document.querySelector('.wrong p');
let rightAnswer = 0;
let wrongAnswer = 0;
let i = 0;
let currect = [];

window.addEventListener('load', game);

function game() {
    screen.style.color = null;
    wrong.innerText = wrongAnswer;
    right.innerText = rightAnswer;
    const index = Math.floor(Math.random() * allWord.length);
    const randomWord = allWord[index].split('');
    const randomiz = randomWord.sort(() => Math.random() - 0.5);
    load(randomiz.join(''), allWord[index].toUpperCase());
}

function load(randomizedWord, originalWord) {
    screen.innerHTML = '';
    words.innerHTML = '';
    for (let i = 0; i < randomizedWord.length; i++) {
        const screenSpan = document.createElement('span');
        screen.append(screenSpan);
        const span = document.createElement('span');
        span.innerText = randomizedWord[i];
        words.append(span);
        span.addEventListener('click', (e) => {
            checkValues(e.target, originalWord);
        });
    }
}

let pre = 0;
let next = 1;

function checkValues(span, word) {
    if (next < screen.childElementCount && span.innerText != '') {
        screen.children[pre].classList.remove('blink');
        screen.children[pre].style.borderBottom = null;
        pre++;
        screen.children[next].className = 'blink';
        screen.children[next].style.borderBottom = '1px solid yellow';
        next++;
    }

    if (i < screen.childElementCount && span.innerText != '') {
        screen.children[i].innerText = span.innerText;
        currect.push(span.innerText);
        span.innerText = '';
        i++;
        if (i == screen.childElementCount) {
            if (currect.join('') === word) {
                screen.style.color = 'green';
                screen.innerHTML = '<h2>Right</h2>';
                rightAnswer++;
                right.innerText = rightAnswer;
            } else {
                screen.style.color = 'red';
                screen.innerHTML = '<h2>Wrong</h2>';
                wrongAnswer++;
                wrong.innerText = wrongAnswer;
            }
            setTimeout(() => {
                i = 0;
                currect = [];
                game();
            }, 1000);
            pre = 0;
            next = 1;
        }
    }
}

