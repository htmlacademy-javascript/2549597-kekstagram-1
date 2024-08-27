import { isEscKey } from './utils.js';

const ALERT_SHOW_TIME = 3000;

const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const alertContainer = document.querySelector('#error_data').content.querySelector('.error_load');

export const showAlert = () => {
  const fragment = document.createDocumentFragment();
  fragment.append(alertContainer.cloneNode(true));

  document.body.append(fragment);

  setTimeout(() => {
    const errorLoad = document.querySelector('.error_load');
    errorLoad.remove();
  }, ALERT_SHOW_TIME);
};

export const isErrorFieldEnable = () => document.querySelector('.error');

const closeDialog = () => {
  if (isErrorFieldEnable()){
    document.querySelector('.error').remove();
  } else {
    document.querySelector('.success').remove();
  }

  document.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('click', onFieldClick);
};

const errorDialog = () => {
  const fragment = document.createDocumentFragment();
  fragment.append(errorTemplate.cloneNode(true));

  document.body.append(fragment);

  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onFieldClick);

  const onErrorBtnClick = document.querySelector('.error__button');
  onErrorBtnClick.addEventListener('click', closeDialog);
};

const successDialog = () => {
  const fragment = document.createDocumentFragment();
  fragment.append(successTemplate.cloneNode(true));

  document.body.append(fragment);

  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onFieldClick);

  const onSuccessBtnClick = document.querySelector('.success__button');
  onSuccessBtnClick.addEventListener('click', closeDialog);
};

function onFieldClick(evt) {
  const closestSuccessEl = evt.target.closest('.success__inner');
  const closestErrorEl = evt.target.closest('.error__inner');

  if (closestErrorEl || closestSuccessEl) {
    return;
  }

  closeDialog();
}

function onDocumentKeydown(evt) {
  if (isEscKey(evt)) {
    evt.preventDefault();
    closeDialog();
  }
}

export const showDialog = (success) => {
  if (success) {
    successDialog();
  } else {
    errorDialog();
  }
};
