import {showBigPhoto} from './big-picture.js';
import {filterId} from './sorting-photos.js';
import {getRandomArrayElement} from './utils.js';

const QUANTITY_UNIQUE_PHOTO = 10;

const imageTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictures = document.querySelector('.pictures');
const imageFilters = document.querySelector('.img-filters');

let photos = [];

const createPhotoElement = (data) => {
  const image = imageTemplate.cloneNode(true);

  image.querySelector('.picture__img').src = data.url;
  image.querySelector('.picture__likes').textContent = data.likes;
  image.querySelector('.picture__comments').textContent = data.comments.length;
  image.querySelector('.picture__img').setAttribute('data-id', data.id);

  return image;
};

const getRandomPhotos = (data) => {
  const mass = new Set();
  while (mass.size < QUANTITY_UNIQUE_PHOTO) {
    mass.add(getRandomArrayElement(data));
  }

  return Array.from(mass).toSorted((firstElem, secondElem) => firstElem.id - secondElem.id);
};


const getDiscussedPhotos = (data) => data.toSorted((firstElEM, secondElem) => secondElem.comments.length - firstElEM.comments.length);

const getNewPhotoElements = (data) => {
  if (filterId === 'filter-random') {
    return getRandomPhotos(data);
  }else {
    return getDiscussedPhotos(data);
  }
};

export const renderGallery = (data) => {
  const fragment = document.createDocumentFragment();

  if (filterId !== 'filter-default') {
    data = getNewPhotoElements(data);
  }

  data.forEach((element) => {
    fragment.append(createPhotoElement(element));
  });

  pictures.innerHTML = '';
  pictures.append(fragment);
};

export const initGallery = (photoData) => {
  renderGallery(photoData);
  photos = photoData;

  imageFilters.classList.remove('img-filters--inactive');
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
