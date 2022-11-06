/**
 *
 * @returns a random number between 2 and 9
 */
const getRandomNumber = () => Math.floor(Math.random() * 8) + 2;

const calculateCorrectAnswer = (x, y) => x * y;

const isProductCorrect = (result, x, y) => result === calculateCorrectAnswer(x, y);

const isAnswerCorrect = (result) => isProductCorrect(result.result, result.x, result.y);

const calculateScore = (results) => {
  if (!results || results.length === 0) {
    return {
      questionsCount: 0,
      correctAnswersCount: 0,
      mark: undefined,
    };
  }

  const correctAnswersCount = results.filter(isAnswerCorrect).length;

  return {
    questionsCount: results.length,
    correctAnswersCount: correctAnswersCount,
    mark: Math.floor(20 * correctAnswersCount / results.length ) / 2,
  };
};

export { getRandomNumber, calculateScore };
