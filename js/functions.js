function isPalindrom(text){
  text = text.toLowerCase().replaceAll(' ','');
  let reverseText = '';
  for (let i = text.length - 1;i >= 0;i--){
    reverseText += text[i];
  }
  return text === reverseText;
}

function getNumberFromString(text){
  text = text.toString();
  let resultNumber = '';
  for (let i = 0;i < text.length;i++){
    resultNumber += !isNaN(text[i]) ? text[i] : '';
  }
  resultNumber = parseInt(resultNumber,10);
  return resultNumber;
}

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

function checkingLengthString(currentText,maxLength){
  return currentText.length <= maxLength;
}
