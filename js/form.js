import {isEscKey} from './utils.js';

const onUploadFileChange = document.querySelector('.img-upload__input');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const onImgUploadCancelClick = document.querySelector('.img-upload__cancel');
const imgUploadPreview = document.querySelector('.img-upload__preview img');
const onFormSubmit = document.querySelector('.img-upload__form');
const userHashtags = document.querySelector('.text__hashtags');
const userTextDescription = document.querySelector('.text__description');

let hashtags = [];
const MAX_TEXT_LENGTH = 140;
const MAX_QUANTITY_HASHTAGS = 5;
const MAX_LENGTH_HASHTAGS = 19;
const MIN_LENGTH_HASHTAGS = 2;

const hashtag = new RegExp('^#[a-zа-яё0-9]{1,19}$','i');

const closeImgUpload = () => {
  hashtags = [];
  onUploadFileChange.value = '';

  document.body.classList.remove('modal-open');
  imgUploadOverlay.classList.add('hidden');

  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown(evt) {
  if (isEscKey(evt)) {
    evt.preventDefault();
    closeImgUpload();
  }
}

onUploadFileChange.addEventListener('change', () => {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);

  imgUploadPreview.src = onUploadFileChange.files[0].name;
});

onImgUploadCancelClick.addEventListener('click', () => {
  closeImgUpload();
});

const pristine = new Pristine(onFormSubmit, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'span',
  errorTextClass: 'form__error',
});

const validateHashtags = () => {
  let validateHashtag = true;
  hashtags = userHashtags.value.split(' ');

  for (let i = 0; i < hashtags.length; i++){
    if(!hashtag.test(hashtags[i])){
      validateHashtag = false;
      break;
    }
  }
  return validateHashtag;
};

const errorTextValidateHahtags = () => {
  if (hashtags.length > MAX_QUANTITY_HASHTAGS) {
    return `Количество хэштегов не больше ${MAX_QUANTITY_HASHTAGS}`;
  }

  if(!(hashtags.find((element) => element.length > MAX_LENGTH_HASHTAGS) === undefined)){
    return `Длина одного хештега не больше ${MAX_LENGTH_HASHTAGS} символов`;
  }

  if(!(hashtags.find((element) => element.length < MIN_LENGTH_HASHTAGS) === undefined)){
    return `Длина одного хештега не меньше ${MIN_LENGTH_HASHTAGS} символов`;
  }
};

const errorTextValidateTextarea = () => `Длина комментария не больше ${MAX_TEXT_LENGTH} символов`;

const validateTextDescription = () => userTextDescription.value.length < MAX_TEXT_LENGTH;

pristine.addValidator(userHashtags, validateHashtags, errorTextValidateHahtags);

pristine.addValidator(userTextDescription, validateTextDescription, errorTextValidateTextarea);

onFormSubmit.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();

  if (!isValid) {
    evt.preventDefault();
  }
});

userHashtags.addEventListener('keydown', (evt) => {
  if (isEscKey(evt)) {
    evt.stopPropagation();
  }
});
userTextDescription.addEventListener('keydown', (evt) => {
  if (isEscKey(evt)) {
    evt.stopPropagation();
  }
});
