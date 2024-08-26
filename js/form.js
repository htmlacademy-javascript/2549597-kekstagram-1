import {isEscKey, showAlert} from './utils.js';
import {resetScale, resetSlider} from './photo-filters.js';
import {sendData} from './api.js';

const MAX_TEXT_LENGTH = 140;
const MAX_HASHTAGS_QUANTITY = 5;
const TAG_PATTERN = /^#[a-zа-яё0-9]{1,19}$/i;
const HASHTAG_ERROR_TEXT = 'Не верный хештэг';
const TEXTAREA_ERROR_TEXT = `Длина комментария не больше ${MAX_TEXT_LENGTH} символов`;
const SUBMIT_BUTTON_TEXT = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};
const SUCCESS_MESSAGE = 'Данные успешно отправлены';

const onUploadFileChange = document.querySelector('.img-upload__input');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const onImgUploadCancelClick = document.querySelector('.img-upload__cancel');
const onFormSubmit = document.querySelector('.img-upload__form');
const userHashtags = document.querySelector('.text__hashtags');
const description = document.querySelector('.text__description');
const submitBtn = document.querySelector('.img-upload__submit');

export const closeForm = () => {
  onFormSubmit.reset();
  resetSlider();

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

  resetScale();
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

const isHashtagsPatternValid = (hashtags) => {
  for (const hashtag of hashtags) {
    if (!TAG_PATTERN.test(hashtag)) {
      return false;
    }
  }

  return true;
};

const isHashtagsUnique = (hashtags) => hashtags.length === new Set(hashtags).size;

const isHashtagsValid = () => {
  const hashtags = userHashtags.value.toLowerCase().split(' ');

  if (!hashtags.length) {
    return true;
  }

  return isQuantityHashtagsValid(hashtags) && isHashtagsPatternValid(hashtags) && isHashtagsUnique(hashtags);
};

const isDescriptionValid = () => description.value.length < MAX_TEXT_LENGTH;

pristine.addValidator(userHashtags, isHashtagsValid, HASHTAG_ERROR_TEXT);
pristine.addValidator(description, isDescriptionValid, TEXTAREA_ERROR_TEXT);

const lockSubmitBtn = () => {
  submitBtn.disabled = 'true';
  submitBtn.textContent = SUBMIT_BUTTON_TEXT.SENDING;
};

const unlockSubmitBtn = () => {
  submitBtn.removeAttribute('disabled');
  submitBtn.textContent = SUBMIT_BUTTON_TEXT.IDLE;
};

export const setUserFormSubmit = (onSuccess) => {
  onFormSubmit.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      lockSubmitBtn();
      sendData(new FormData(evt.target))
        .then(onSuccess)
        .catch((err) => {
          showAlert(err.message);
        })
        .finally(() => {
          showAlert(SUCCESS_MESSAGE, true);
          unlockSubmitBtn();
        });
    }
  });
};
