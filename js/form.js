import {isEscKey} from './utils.js';

const MAX_TEXT_LENGTH = 140;
const MAX_QUANTITY_HASHTAGS = 5;
const TAG_PATTERN = /^#[a-zа-яё0-9]{1,19}$/i;
const HASHTAG_ERROR_TEXT = 'Не верный хештэг';
const TEXTAREA_ERROR_TEXT = `Длина комментария не больше ${MAX_TEXT_LENGTH} символов`;

const onUploadFileChange = document.querySelector('.img-upload__input');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const onImgUploadCancelClick = document.querySelector('.img-upload__cancel');
const onFormSubmit = document.querySelector('.img-upload__form');
const userHashtags = document.querySelector('.text__hashtags');
const description = document.querySelector('.text__description');

const closeForm = () => {
  onUploadFileChange.value = '';

  document.body.classList.remove('modal-open');
  imgUploadOverlay.classList.add('hidden');

  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown(evt) {
  if (document.activeElement === userHashtags || document.activeElement === description){
    return;
  }

  if (isEscKey(evt)) {
    evt.preventDefault();
    closeForm();
  }
}

onUploadFileChange.addEventListener('change', () => {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
});

onImgUploadCancelClick.addEventListener('click', () => {
  closeForm();
});

const pristine = new Pristine(onFormSubmit, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'span',
  errorTextClass: 'form__error',
});

const validateQuantityHashtags = (arrayHashtags) => arrayHashtags.length < MAX_QUANTITY_HASHTAGS;

const validatePatternMatching = (arrayHashtags) => {
  let validateHashtag = true;

  for (let i = 0; i < arrayHashtags.length; i++){
    if(!TAG_PATTERN.test(arrayHashtags[i])){
      validateHashtag = false;
      break;
    }
  }
  return validateHashtag;
};

const validateUniquenessHashtags = (arrayHashtags) => {
  let valideateHashtag = true;

  for (let i = 0; i < arrayHashtags.length; i++) {
    if (arrayHashtags.indexOf(arrayHashtags[i]) !== arrayHashtags.lastIndexOf(arrayHashtags[i])) {
      valideateHashtag = false;
      break;
    }
  }

  return valideateHashtag;
};

const validateHashtags = () => {
  const hashtags = userHashtags.value.split(' ');

  if (!(validateQuantityHashtags(hashtags) && validatePatternMatching(hashtags) && validateUniquenessHashtags(hashtags))) {
    return false;
  }

  return true;
};

const validateDescription = () => description.value.length < MAX_TEXT_LENGTH;

pristine.addValidator(userHashtags, validateHashtags, HASHTAG_ERROR_TEXT);

pristine.addValidator(description, validateDescription, TEXTAREA_ERROR_TEXT);

onFormSubmit.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();

  if (!isValid) {
    evt.preventDefault();
  }
});
