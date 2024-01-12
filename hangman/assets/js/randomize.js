export default (min, max) => {
  const randomNumber = min + Math.random() * (max + 1 - min);

  return Math.floor(randomNumber);
};
