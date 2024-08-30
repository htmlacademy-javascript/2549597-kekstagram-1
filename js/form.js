import {isEscKey} from './utils.js';
import {resetScale, resetSlider} from './photo-filters.js';
import {sendData} from './api.js';
import {showDialog} from './dialogs.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png', 'raw'];
const MAX_TEXT_LENGTH = 140;
const MAX_HASHTAGS_QUANTITY = 5;
const TAG_PATTERN = /^#[a-zа-яё0-9]{1,19}$/i;
const HASHTAG_ERROR_TEXT = 'Не верный хештэг';
const TEXTAREA_ERROR_TEXT = `Длина комментария не больше ${MAX_TEXT_LENGTH} символов`;
const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};

const onUploadFileChange = document.querySelector('.img-upload__input');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const onImgUploadCancelClick = document.querySelector('.img-upload__cancel');
const onFormSubmit = document.querySelector('.img-upload__form');
const userHashtags = document.querySelector('.text__hashtags');
const description = document.querySelector('.text__description');
const submitBtn = document.querySelector('.img-upload__submit');
const errorFeedback = document.querySelector('#error').content.querySelector('.error');
const successFeedback = document.querySelector('#success').content.querySelector('.success');
const imgUploadPreview = document.querySelector('.img-upload__preview img');
const backgroundImgFilters = document.querySelectorAll('.effects__preview');

const clearImgFilters = () => {
  backgroundImgFilters.forEach((image) => {
    image.removeAttribute('style');
  });
};

export const closeForm = () => {
  onFormSubmit.reset();
  resetSlider();

  clearImgFilters();

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

const setImgFilters = (file) => {
  backgroundImgFilters.forEach((image) => {
    image.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
  });
};

const setUserPhoto = () => {
  const file = onUploadFileChange.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    imgUploadPreview.src = URL.createObjectURL(file);

    setImgFilters(file);
  }
};

onUploadFileChange.addEventListener('change', () => {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  setUserPhoto();

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

const toggleSubmitBtn = (disable) => {
  submitBtn.disabled = disable;
  submitBtn.textContent = disable ? SubmitButtonText.SENDING : SubmitButtonText.IDLE;
};

onFormSubmit.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();

  if (isValid) {
    toggleSubmitBtn(true);
    sendData(new FormData(evt.target))
      .then(() => {
        closeForm();
        showDialog(successFeedback);
      })
      .catch(() => {
        showDialog(errorFeedback);
      })
      .finally(() => {
        toggleSubmitBtn(false);
      });
  }
});

