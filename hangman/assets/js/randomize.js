const randomize = (min, max, previous) => {
  const randomNumber = min + Math.random() * (max + 1 - min);
  if (Math.floor(randomNumber) === previous) {
    return randomize(min, max, previous);
  }

  return Math.floor(randomNumber);
};

export default randomize;
