import * as CONSTANTS from './data.js';
import {getRandomValue, getRandomArrayElement} from './utils.js';

const imageTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictures = document.querySelector('.pictures');

const createPhotoComment = (id) => ({
  id,
  avatar: `img/avatar-${getRandomValue(CONSTANTS.MIN_AVATAR_ID, CONSTANTS.MAX_AVATAR_ID)}.svg`,
  message: getRandomArrayElement(CONSTANTS.COMMENTS),
  name: getRandomArrayElement(CONSTANTS.USERNAMES),
});

const createPhoto = (id) => ({
  id,
  url: `photos/${id}.jpg`,
  description: getRandomArrayElement(CONSTANTS.PHOTO_DESCRIPTIONS),
  likes: getRandomValue(CONSTANTS.MIN_LIKES, CONSTANTS.MAX_LIKES),
  comment: Array.from({length: getRandomValue(CONSTANTS.MIN_QUANTITY_COMMENTS, CONSTANTS.MAX_QUANTITY_COMMENTS)}, (_, i) => createPhotoComment(i + 1)),
});

const createGallery = (length) => Array.from({length}, (_, i) => createPhoto(i + 1));

const createPhotoElement = (element) => {
  const patternClon = imageTemplate.cloneNode(true);

  patternClon.querySelector('.picture__img').src = element.url;
  patternClon.querySelector('.picture__likes').textContent = element.likes;
  patternClon.querySelector('.picture__comments').textContent = element.comment.length;

  return patternClon;
};

const renderGallery = (arrayPhoto) => {
  const fragment = document.createDocumentFragment();

  arrayPhoto.forEach((element) => {
    fragment.append(createPhotoElement(element));
  });

  pictures.append(fragment);
};

renderGallery(createGallery(CONSTANTS.MAX_PHOTO_LENGTH));
