const mapping = {
  lost: 'You Lost',
  win: 'You Win',
};

const openModal = (modal, status, answer) => {
  const modalStatus = modal.querySelector('.modal__status');
  modalStatus.textContent = mapping[status];

  const modalAnswer = modal.querySelector('.modal__answer');
  const modalAnswerWord = modal.querySelector('.modal__answer_word');
  modalAnswer.textContent = 'The correct answer was: ';
  modalAnswerWord.textContent = answer;
  modalAnswer.append(modalAnswerWord);

  modal.classList.add('show');
};

export default openModal;
