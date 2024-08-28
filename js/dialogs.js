import {isEscKey} from './utils.js';

const ALERT_SHOW_TIME = 3000;

const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const alertContainer = document.querySelector('#error__data').content.querySelector('.error__load');

export{errorTemplate, successTemplate};

let alert;
let activeDialog = null;

export const showAlert = () => {
  alert = alertContainer.cloneNode(true);

  document.body.append(alert);

  setTimeout(() => {
    alert.remove();
  }, ALERT_SHOW_TIME);
};

const closeDialog = () => {
  document.querySelector(activeDialog).remove();

  activeDialog = null;

  document.removeEventListener('keydown', onDocumentKeydown, true);
  document.removeEventListener('click', onFieldClick);
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
    evt.stopPropagation();
    evt.preventDefault();

    closeDialog();
  }
}

export const showDialog = (template) => {
  const fragment = document.createDocumentFragment();
  fragment.append(template.cloneNode(true));

  document.body.append(fragment);

  activeDialog = `.${template.classList.value}`;

  document.addEventListener('keydown', onDocumentKeydown, true);
  document.addEventListener('click', onFieldClick);

  const queryBtn = template
    .querySelector('button')
    .classList.value === 'success__button' ? '.success__button' : '.error__button';

  const onBtnClick = document.querySelector(queryBtn);
  onBtnClick.addEventListener('click', closeDialog);
};
