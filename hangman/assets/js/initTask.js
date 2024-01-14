import randomize from './randomize.js';
import questionList from '../questionList.js';

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const taskGameName = 'HANGMAN GAME';

const state = {
  answer: '',
  question: '',
  currentText: '',
  incorrectGuesses: 0,
};

window.addEventListener('keydown', (e) => {
  const key = e.key.toUpperCase();

  const currentButton = document.getElementById(key);

  if (currentButton) {
    currentButton.click();
  }
});

const resetState = () => {
  const keys = Object.keys(state);
  keys.forEach((key) => {
    if (typeof state[key] === 'number') {
      state[key] = 0;
    } else {
      state[key] = '';
    }
  });
};

const body = document.querySelector('body');

/* Create elements */

const taskContainer = document.createElement('div');
const hangmanArea = document.createElement('div');
const imageHangman = document.createElement('img');
const hangmanTitle = document.createElement('h2');

const gameArea = document.createElement('div');
const gameLetterList = document.createElement('ul');
const answer = document.createElement('div');

const question = document.createElement('div');
const questionText = document.createElement('h3');

const guesses = document.createElement('div');
const guessesTitle = document.createElement('h3');
const guessesCount = document.createElement('span');

const keyboard = document.createElement('div');

alphabet.split('')
  .forEach((el) => {
    const button = document.createElement('button');
    button.classList.add('game__keyboard_key');
    button.id = el;
    button.textContent = el;

    button.addEventListener('click', (e) => guessTheLetter(e));
    keyboard.append(button);
  });

/* Add classes to elements */
body.classList.add('page');

taskContainer.classList.add('container');
hangmanArea.classList.add('hangman');
imageHangman.classList.add('hangman__image', 'image');
hangmanTitle.classList.add('hangman__title');

gameArea.classList.add('game');
answer.classList.add('game__answer');
gameLetterList.classList.add('game__list');

question.classList.add('game__question');
questionText.classList.add('game__question_text');

guesses.classList.add('game__guesses');
guessesCount.classList.add('game__guesses_count');

keyboard.classList.add('game__keyboard');

const updateHtml = (list, letter) => {
  guessesCount.textContent = `${state.incorrectGuesses} / 6`;
  imageHangman.setAttribute('src', `./assets/images/hangman-${state.incorrectGuesses}.svg`);

  const currentButton = document.getElementById(letter);
  currentButton.disabled = true;

  if (state.incorrectGuesses >= 6) {
    setTimeout(() => {
      alert('You lose');
    }, 100);
  }

  const gameLetters = document.querySelectorAll('.game__letter');
  const replaceArr = state.currentText.split('');

  list.forEach((index) => {
    gameLetters[index].textContent = letter;
    gameLetters[index].classList.add('letter-open');

    replaceArr[index] = letter.toLowerCase();
  });

  state.currentText = replaceArr.join('');
  if (state.currentText === state.answer) {
    setTimeout(() => {
      alert('You win');
    }, 100);
  }
};

const guessTheLetter = (el) => {
  const currentLetter = el.target.textContent;

  if (state.answer.indexOf(currentLetter.toLowerCase()) === -1) {
    state.incorrectGuesses += 1;
  }

  const indexList = [];

  const findIndex = (i) => {
    const index = state.answer.indexOf(currentLetter.toLowerCase(), i);
    if (index !== -1) {
      indexList.push(index);
      findIndex(index + 1);
    }
  };

  findIndex(0);

  console.log(indexList);
  console.log(state);
  updateHtml(indexList, currentLetter);
};

const initTask = () => {
  resetState();
  /* Add attributes and values to element */

  hangmanTitle.textContent = taskGameName;
  guessesCount.textContent = '0 / 6';
  imageHangman.setAttribute('src', './assets/images/hangman-0.svg');
  guessesTitle.textContent = 'Incorrect guesses: ';

  /* Append children to parents */

  hangmanArea.append(imageHangman, hangmanTitle);

  answer.append(gameLetterList);

  question.append(questionText);
  guessesTitle.append(guessesCount);
  guesses.append(guessesTitle);
  gameArea.append(answer, question, guesses, keyboard);

  taskContainer.append(hangmanArea, gameArea);

  /* Get question and render html */
  const currentQuestionIndex = randomize(0, questionList.length - 1);
  const currentQuestionBlock = questionList[currentQuestionIndex];
  state.question = currentQuestionBlock.question;
  state.answer = currentQuestionBlock.answer;
  state.currentText = state.currentText.padStart(state.answer.length, '*');
  questionText.textContent = `Hint: ${state.question}`;
  console.log(state.answer);

  state.answer.split('')
    .forEach(() => {
      const letter = document.createElement('li');
      letter.classList.add('game__letter');
      gameLetterList.append(letter);
    });

  body.append(taskContainer);
};

export default initTask;
