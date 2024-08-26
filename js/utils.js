const ALERT_SHOW_TIME = 3000;
const GRADIENT = {
  SUCCESS: 'linear-gradient(90deg, rgba(159,180,58,1) 0%, rgba(29,253,36,1) 50%, rgba(251,252,69,1) 100%)',
  UNSUCCESS:  'linear-gradient(90deg, rgba(180,138,58,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)'
};

export const getRandomValue = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

export const getRandomArrayElement = (elements) => elements[getRandomValue(0, elements.length - 1)];

export const isEscKey = (evt) => evt.key === 'Escape';

export const convertToNumber = (value) => parseInt(value, 10);

export const showAlert = (message, success = false) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '20%';
  alertContainer.style.top = '0';
  alertContainer.style.right = '20%';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '20px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.borderRadius = '10px';
  alertContainer.style.background = success ? GRADIENT.SUCCESS : GRADIENT.UNSUCCESS;

  alertContainer.textContent = success ? `${message}${String.fromCodePoint(0x1F609)}` : `${message}${String.fromCodePoint(0x1F928)}`;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};
