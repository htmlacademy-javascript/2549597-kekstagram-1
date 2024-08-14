import {isEscKey} from './utils.js';

const MAX_TEXT_LENGTH = 140;
const MAX_HASHTAGS_QUANTITY = 5;
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
  onFormSubmit.reset();

  document.body.classList.remove('modal-open');
  imgUploadOverlay.classList.add('hidden');

  document.removeEventListener('keydown', onDocumentKeydown);
};

const isTextFieldFocused = () => document.activeElement === userHashtags || document.activeElement === description;

function onDocumentKeydown(evt) {
  if (isTextFieldFocused()) {
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

const isQuantityHashtagsValid = (hashtags) => hashtags.length < MAX_HASHTAGS_QUANTITY;

const isPatternMatchingValid = (hashtags) => {
  for (const hashtag of hashtags) {
    if (!TAG_PATTERN.test(hashtag)) {
      return false;
    }
  }

  return true;
};

const isUniquenessHashtagsValid = (hashtags) => {
  const uniqueHashtags = new Set(hashtags);

  if (!(hashtags.length === uniqueHashtags.size)) {
    return false;
  }

  return true;
};

const isHashtagsValid = () => {
  const hashtags = userHashtags.value.toLowerCase().split(' ');

  return isQuantityHashtagsValid(hashtags) && isPatternMatchingValid(hashtags) && isUniquenessHashtagsValid(hashtags);
};

const isDescriptionValid = () => description.value.length < MAX_TEXT_LENGTH;

pristine.addValidator(userHashtags, isHashtagsValid, HASHTAG_ERROR_TEXT);
pristine.addValidator(description, isDescriptionValid, TEXTAREA_ERROR_TEXT);

onFormSubmit.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();

  if (!isValid) {
    evt.preventDefault();
  }
});
