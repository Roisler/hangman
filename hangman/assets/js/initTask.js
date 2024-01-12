import randomize from './randomize.js';
import questionList from '../questionList.js';

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const taskGameName = 'HANGMAN GAME';

const initTask = () => {
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
      button.textContent = el;
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

  /* Add attributes and values to element */

  imageHangman.setAttribute('src', './assets/images/hangman-0.svg');
  hangmanTitle.textContent = taskGameName;

  guessesTitle.textContent = 'Incorrect guesses: ';

  /* Append children to parents */

  hangmanArea.append(imageHangman, hangmanTitle);

  answer.append(gameLetterList);

  question.append(questionText);
  guessesTitle.append(guessesCount);
  guesses.append(guessesTitle);
  gameArea.append(answer, question, guesses, keyboard);

  taskContainer.append(hangmanArea, gameArea);
  const currentQuestionIndex = randomize(0, questionList.length - 1);
  const currentQuestionBlock = questionList[currentQuestionIndex];
  const currentQuestion = currentQuestionBlock.question;
  const currentAnswer = currentQuestionBlock.answer;

  questionText.textContent = `Hint: ${currentQuestion}`;

  currentAnswer.split('')
    .forEach((el, i) => {
      const letter = document.createElement('li');
      letter.classList.add('game__letter', `letter_${i}`);
      gameLetterList.append(letter);
    });

  body.append(taskContainer);
};

export default initTask;
