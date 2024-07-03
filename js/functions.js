const isPalindrome = (text) => {
  const letters = text.toLowerCase().replaceAll(' ', '');
  const lettersCenter = Math.ceil(letters.length / 2);

  for (let i = 0; i < lettersCenter; i++) {
    if (letters[i] !== letters[letters.length - 1 - i]) {
      return false;
    }
  }

  return true;
};

isPalindrome('топот');
isPalindrome('ДовОд');
isPalindrome('Кекс');
isPalindrome('Лёша на полке клопа нашёл ');

const getNumberFromString = (text) => {
  const modifiedText = text.toString().replaceAll(' ', '');
  let result = '';

  for (const letter of modifiedText){
    if (!Number.isNaN(Number(letter))) {
      result = result + letter;
    }
  }

  return parseInt(result, 10);
};

getNumberFromString('2023 год');
getNumberFromString('ECMAScript 2022');
getNumberFromString('1 кефир, 0.5 батона');
getNumberFromString('агент 007');
getNumberFromString('а я томат');
getNumberFromString(2023);
getNumberFromString(-1);
getNumberFromString(1.5);

const getReplacingString = (currentText, textLength, extraText) => {
  if (textLength <= currentText.length) {
    return currentText;
  }

  let freeLength = textLength - currentText.length;
  const countOfRepeat = Math.floor(freeLength / extraText.length);
  const newCurrentText = extraText.repeat(countOfRepeat) + currentText;

  freeLength = textLength - newCurrentText.length;

  return extraText.slice(0, freeLength) + newCurrentText;
};

getReplacingString('1', 2, '0');
getReplacingString('1', 4, '0');
getReplacingString('q', 4, 'werty');
getReplacingString('q', 4, 'we');
getReplacingString('qwerty', 4, '0');

const isTextLengthValid = (currentText, maxLength) => currentText.length <= maxLength;

isTextLengthValid('проверяемая строка', 20);
isTextLengthValid('проверяемая строка', 18);
isTextLengthValid('проверяемая строка', 10);
