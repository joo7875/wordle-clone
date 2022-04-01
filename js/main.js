document.addEventListener('DOMContentLoaded', () => {
    createSquares();

    const GRAY = 'gray';
    const YELLOW = 'rgb(181, 159, 59)';
    const GREEN = 'rgb(83, 141, 78)';

    let stack = [[]];
    let availableSpace = 1;

    const WORD = 'dairy';
    let stackCount = 0;

    const keys = document.querySelectorAll('.keyboard-row button');
    
    // onClick
    for (let i = 0; i < keys.length; i++) {
        
        keys[i].onclick = ({ target }) => {
            const key = target.getAttribute('data-key');

            if (key === 'enter') {
                handleSubmit();
                return;
            }

            if (key === 'del') {
                handleDelete();
                return;
            }

            updateGuessedWords(key);
        };
    }

    // onPress
    document.addEventListener('keypress', (e) => {
        const key = e.key;

        if (key === 'enter') {
            handleSubmit();
            return;
        }

        if (key === 'del') {
            handleDelete();
            return;
        }

        updateGuessedWords(key);
    });

    // update color
    function getColor(letter, index) {
        // index 0 1 2 3 4
        const include = WORD.includes(letter);

        if (!include) return GRAY;
        if (WORD[index] === letter) return GREEN;
        
        return YELLOW;
    }

    // enter
    function handleSubmit() {
        const curArr = getCurWordArr();
        const curWord = curArr.join('');

        if (curArr.length !== 5) {
            window.alert('Word must be 5 letters');
            return;
        }

        // animation start
        const firstLetterId = stackCount * 5 + 1;
        const interval = 200;
        curArr.forEach((letter, index) => {
            const color = getColor(letter, index);

            setTimeout(() => {
                const letterId = firstLetterId + index;
                const letterEl = document.getElementById(letterId);
                letterEl.classList.add('animate__flipInX');
                letterEl.style = `background-color: ${color}; border-color: ${color}`;
            }, interval * index);

            const keyboardColor = document.getElementById(letter);
            keyboardColor.style = `background-color: ${color}`;
        });

        stackCount++;
        // animation end

        if (curWord === WORD) window.alert('Congratulations!');

        if (stack.length === 6) window.alert(`Sorry, you have no more guesses! The word is ${WORD}.`);

        stack.push([]);
    }

    // del
    function handleDelete() {
        const curArr = getCurWordArr();

        if (curArr && curArr.length > 0) {
            curArr.pop();

            stack[stack.length - 1] = curArr;

            const lastLetterEl = document.getElementById(String(availableSpace - 1));
            lastLetterEl.textContent = '';
            availableSpace--;
        }
    }

    // current array (row)
    function getCurWordArr() {
        return stack[stack.length - 1]; // [row]
    }

    // update row
    function updateGuessedWords(letter) {
        const curArr = getCurWordArr(); // col

        if (curArr && curArr.length < 5) {
            curArr.push(letter);

            const availableSpaceEl = document.getElementById(String(availableSpace++));
            availableSpaceEl.textContent = letter;
        }
    }
    
    // create board
    function createSquares() {
        const board = document.getElementById('board');

        for (let index = 0; index < 30; index++) {
            let square = document.createElement('div');

            square.classList.add('square');
            square.classList.add('animate__animated');
            square.setAttribute('id', index + 1);
            board.appendChild(square);
        }
    }


})