function isPalindrome(text) {
  const modifiedText = text.toLowerCase().replaceAll(' ', '');
  const halfLengthModifiedText = Math.ceil(modifiedText.length / 2);

  for (let i = 0; i < halfLengthModifiedText; i++) {
    if (modifiedText[i] !== modifiedText[modifiedText.length - 1 - i]) {
      return false;
    }
  }

  return true;
}

isPalindrome('топот');

isPalindrome('ДовОд');

isPalindrome('Кекс');

isPalindrome('Лёша на полке клопа нашёл ');

function getNumberFromString(text) {
  const modifiedText = text.toString().replaceAll(' ', '');
  let resultNumber = '';

  for (const letter of modifiedText){
    if (!Number.isNaN(Number(letter))) {
      resultNumber = resultNumber + letter;
    }
  }

  return parseInt(resultNumber,10);
}

getNumberFromString('2023 год');

getNumberFromString('ECMAScript 2022');

getNumberFromString('1 кефир, 0.5 батона');

getNumberFromString('агент 007');

getNumberFromString('а я томат');

getNumberFromString(2023);

getNumberFromString(-1);

getNumberFromString(1.5);

function getReplacingString(currentText, textLength, extraText) {
  if (textLength <= currentText.length) {
    return currentText;
  }

  let freeLength = textLength - currentText.length;
  const countOfRepeat = Math.floor(freeLength / extraText.length);
  let newCurrentText = extraText.repeat(countOfRepeat) + currentText;

  freeLength = textLength - newCurrentText.length;
  newCurrentText = extraText.slice(0, freeLength) + newCurrentText;

  return newCurrentText;
}

getReplacingString('1', 2, '0');

getReplacingString('1', 4, '0');

getReplacingString('q', 4, 'werty');

getReplacingString('q', 4, 'we');

getReplacingString('qwerty', 4, '0');

const isTextLengthValid = (currentText, maxLength) => currentText.length <= maxLength;

isTextLengthValid('проверяемая строка', 20);

isTextLengthValid('проверяемая строка', 18);

isTextLengthValid('проверяемая строка', 10);
