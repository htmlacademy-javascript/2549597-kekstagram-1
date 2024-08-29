import {showBigPhoto} from './big-picture.js';
import {debounce} from './utils.js';

const QUANTITY_UNIQUE_PHOTO = 10;
const ACTIVE_FILTER = 'img-filters__button--active';
const FilterId = {
  FILTER_RANDOM: 'filter-random',
  FILTER_DISCUSSED: 'filter-discussed',
  FILTER_DEFAULT: 'filter-default',
};

const imageTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictures = document.querySelector('.pictures');
const imageFilters = document.querySelector('.img-filters');
const imgFiltersSection = document.querySelector('.img-filters');

let photos = [];

const createPhotoElement = (data) => {
  const image = imageTemplate.cloneNode(true);

  image.querySelector('.picture__img').src = data.url;
  image.querySelector('.picture__likes').textContent = data.likes;
  image.querySelector('.picture__comments').textContent = data.comments.length;
  image.querySelector('.picture__img').setAttribute('data-id', data.id);

  return image;
};

const getClearScreen = () => {
  const allPhotos = document.querySelectorAll('.picture');

  for (const photo of allPhotos) {
    photo.remove();
  }
};

const getRandomPhotos = (data) => data.toSorted(() => Math.random() - 0.5).slice(0, QUANTITY_UNIQUE_PHOTO);

const getDiscussedPhotos = (data) => data.toSorted((first, second) => second.comments.length - first.comments.length);

const getSortedPhotos = (filter, data) => {
  switch (filter) {
    case 'filter-random': return getRandomPhotos(data);
    case 'filter-discussed': return getDiscussedPhotos(data);
    case 'filter-default': return data;
  }
};

export const renderGallery = (data) => {
  const fragment = document.createDocumentFragment();

  data.forEach((element) => {
    fragment.append(createPhotoElement(element));
  });

  pictures.append(fragment);
};

const debounceData = debounce((data) => renderGallery(data));

imgFiltersSection.addEventListener('click', (evt) => {
  const filtersBtn = evt.target.closest('.img-filters__button');
  const activeFilter = document.querySelector(`.${ACTIVE_FILTER}`);

  if (!filtersBtn) {
    return;
  }

  activeFilter?.classList.remove(ACTIVE_FILTER);
  filtersBtn.classList.add(ACTIVE_FILTER);

  getClearScreen();
  debounceData(getSortedPhotos(filtersBtn.ыid, photos));
});

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
