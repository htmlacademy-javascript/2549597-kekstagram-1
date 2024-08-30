import {showBigPhoto} from './big-picture.js';
import {debounce} from './utils.js';

const MAX_RANDOM_PHOTOS = 10;
const ACTIVE_FILTER_CLASS = '.img-filters__button--active';
const FilterId = {
  FILTER_RANDOM: 'filter-random',
  FILTER_DISCUSSED: 'filter-discussed',
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

const removeGallery = () => {
  const allPhotos = pictures.querySelectorAll('.picture');

  allPhotos.forEach((element) => {
    element.remove();
  });
};

const getRandomPhotos = (data) => data.toSorted(() => Math.random() - 0.5).slice(0, MAX_RANDOM_PHOTOS);

const getDiscussedPhotos = (data) => data.toSorted((first, second) => second.comments.length - first.comments.length);

const getSortedPhotos = (filter) => {
  switch (filter) {
    case FilterId.FILTER_RANDOM: return getRandomPhotos(photos);
    case FilterId.FILTER_DISCUSSED: return getDiscussedPhotos(photos);
    default: return photos;
  }
};

export const renderGallery = (data) => {
  const fragment = document.createDocumentFragment();

  data.forEach((element) => {
    fragment.append(createPhotoElement(element));
  });

  pictures.append(fragment);
};

const debounceRender = debounce(renderGallery);

imgFiltersSection.addEventListener('click', (evt) => {
  const filterBtn = evt.target.closest('.img-filters__button');
  const activeFilter = document.querySelector(ACTIVE_FILTER_CLASS);

  if (!filterBtn) {
    return;
  }

  activeFilter?.classList.remove(ACTIVE_FILTER_CLASS.slice(1));
  filterBtn.classList.add(ACTIVE_FILTER_CLASS.slice(1));

  removeGallery();
  debounceRender(getSortedPhotos(filterBtn.id));
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
