const URL = 'https://28.javascript.htmlacademy.pro/kekstagram';
const ROUTE = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};
const ERROR_TEXT = 'Не удалось загрузить данные. Попробуйте обновить страницу';
const METHOD = {
  GET: 'GET',
  POST: 'POST',
};

const load = (route, errorText = ERROR_TEXT, method = METHOD.GET, body = null) =>
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

export const getData = () => load(ROUTE.GET_DATA, ERROR_TEXT);

export const sendData = (body) => load(ROUTE.SEND_DATA, ERROR_TEXT, METHOD.POST, body);
