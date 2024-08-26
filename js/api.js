import {setUserFormSubmit, closeForm} from './form.js';

const URL = 'https://28.javascript.htmlacademy.pro/kekstagram';
const ROUTE = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};
const ERROR_TEXT = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз',
};
const METHOD = {
  GET: 'GET',
  POST: 'POST',
};

const load = (route, errorText, method = METHOD.GET, body = null) =>
  fetch(`${URL}${route}`, {method, body})
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      throw new Error(errorText);
    });

export const getData = () => load(ROUTE.GET_DATA, ERROR_TEXT.GET_DATA);

export const sendData = (body) => load(ROUTE.SEND_DATA, ERROR_TEXT.SEND_DATA, METHOD.POST, body);

setUserFormSubmit(closeForm);
