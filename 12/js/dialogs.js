import {isEscKey} from './utils.js';

const ALERT_SHOW_TIME = 3000;

const alertContainer = document.querySelector('#error__data').content.querySelector('.error__load');

let activeDialog = null;

export const showAlert = () => {
  const alert = alertContainer.cloneNode(true);

  document.body.append(alert);

  setTimeout(() => {
    alert.remove();
  }, ALERT_SHOW_TIME);
};

const closeDialog = () => {
  activeDialog?.remove();
  activeDialog = null;

  document.removeEventListener('keydown', onDocumentKeydown, true);
  document.removeEventListener('click', onFieldClick);
};

function onFieldClick(evt) {
  if (!evt.target.hasAttribute('data-dialog-close')) {
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
  activeDialog = template.cloneNode(true);

  document.addEventListener('keydown', onDocumentKeydown, true);
  document.addEventListener('click', onFieldClick);


  document.body.append(activeDialog);
};
