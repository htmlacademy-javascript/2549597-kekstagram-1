import * as CONSTANTS from './data.js';
import {getRandomValue, getRandomArrayElement} from './utils.js';
import {renderBigPhoto} from './big-picture.js';

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

const createPhotoElement = (data) => {
  const image = imageTemplate.cloneNode(true);

  image.querySelector('.picture__img').src = data.url;
  image.querySelector('.picture__likes').textContent = data.likes;
  image.querySelector('.picture__comments').textContent = data.comment.length;
  image.querySelector('.picture__img').setAttribute('data-id', data.id);

  return image;
};

const renderGallery = (data) => {
  const fragment = document.createDocumentFragment();

  data.forEach((element) => {
    fragment.append(createPhotoElement(element));
  });

  pictures.append(fragment);
};
const galleryData = createGallery(CONSTANTS.MAX_PHOTO_LENGTH);

renderGallery(galleryData);

pictures.addEventListener('click', (evt) => {
  if (!(evt.target.closest('.picture').className && evt.target.dataset.id)) {
    return;
  }

  renderBigPhoto(galleryData.find((item) => item.id === Number(evt.target.dataset.id)) || []);
});
