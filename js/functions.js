function isPalindrom(text){
  text = text.toLowerCase().replaceAll(' ','');
  let reverseText = '';
  for (let i = text.length - 1;i >= 0;i--){
    reverseText += text[i];
  }
  return text === reverseText;
}

isPalindrom('топот');
isPalindrom('ДовОд');
isPalindrom('Кекс');
isPalindrom('Лёша на полке клопа нашёл ');

function getNumberFromString(text){
  text = text.toString();
  let resultNumber = '';
  for (let i = 0;i < text.length;i++){
    resultNumber += !isNaN(text[i]) ? text[i] : '';
  }
  resultNumber = parseInt(resultNumber,10);
  return resultNumber;
}

getNumberFromString('2023 год');
getNumberFromString('ECMAScript 2022');
getNumberFromString('1 кефир, 0.5 батона');
getNumberFromString('агент 007');
getNumberFromString('а я томат');
getNumberFromString(2023);
getNumberFromString(-1);
getNumberFromString(1.5);

function getReplacingString(currentText,textLength,addedText){
  if (textLength > currentText.length){
    let freeLength = textLength - currentText.length;
    const countOfRepeat = Math.floor(freeLength / addedText.length);
    currentText = addedText.repeat(countOfRepeat) + currentText;
    freeLength = textLength - currentText.length;
    currentText = addedText.slice(0,freeLength) + currentText;
  }
  return currentText;
}

getReplacingString('1', 2, '0');
getReplacingString('1', 4, '0');
getReplacingString('q', 4, 'werty');
getReplacingString('q', 4, 'we');
getReplacingString('qwerty', 4, '0');

function checkingLengthString(currentText,maxLength){
  return currentText.length <= maxLength;
}

checkingLengthString('проверяемая строка', 20);
checkingLengthString('проверяемая строка', 18);
checkingLengthString('проверяемая строка', 10);
