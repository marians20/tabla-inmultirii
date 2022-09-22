const isDigitCheckRegex = /[0-9]|\./;

const isDigit = (key) => !!isDigitCheckRegex.test(key);

export { isDigit }