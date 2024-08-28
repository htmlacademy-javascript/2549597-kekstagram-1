import {showBigPhoto} from './big-picture.js';

const imageTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictures = document.querySelector('.pictures');

let photos = [];

const createPhotoElement = (data) => {
  const image = imageTemplate.cloneNode(true);

  image.querySelector('.picture__img').src = data.url;
  image.querySelector('.picture__likes').textContent = data.likes;
  image.querySelector('.picture__comments').textContent = data.comments.length;
  image.querySelector('.picture__img').setAttribute('data-id', data.id);

  return image;
};

export const renderGallery = (data) => {
  const fragment = document.createDocumentFragment();

  data.forEach((element) => {
    fragment.append(createPhotoElement(element));
  });

  pictures.append(fragment);
};

export const initGallery = (photoData) => {
  renderGallery(photoData);
  photos = photoData;
};

pictures.addEventListener('click', (evt) => {
  const closestEl = evt.target.closest('.picture__img[data-id]');

  if (!closestEl) {
    return;
  }

  const photoData = photos.find((item) => item.id === Number(closestEl.dataset.id));

  if (photoData) {
    showBigPhoto(photoData);
  }
});
