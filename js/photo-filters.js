import {extractScaleValue} from './utils.js';

const SCALE_STEP = 25;
const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;
const SLIDER_PARAMETERS = {
  'none': [[0, 1, 0.1], 'none'],
  'chrome': [[0, 1, 0.1], 'grayscale'],
  'sepia': [[0, 1, 0.1], 'sepia'],
  'marvin': [[0, 100, 1], 'invert'],
  'phobos': [[0, 3, 0.1], 'blur'],
  'heat': [[1, 3, 0.1], 'brightness'],
};

export const sliderElement = document.querySelector('.effect-level__slider');
const valueElement = document.querySelector('.effect-level__value');
const downScalePhoto = document.querySelector('.scale__control--smaller');
const upScalePhoto = document.querySelector('.scale__control--bigger');
const scale = document.querySelector('.scale__control--value');
const imgUploadPreview = document.querySelector('.img-upload__preview');
const filters = document.querySelector('.effects__list');
const sliderContainer = document.querySelector('.img-upload__effect-level');
let scaleValue = MAX_SCALE_VALUE;
let currentFilter = '';

const removeFilter = () => {
  imgUploadPreview.classList.remove(`effects__preview--${currentFilter}`);
};

const settingSliderParameters = (parametersFilter, filterName) => {
  let postfix = '';

  sliderElement.noUiSlider.updateOptions({
    range: {
      min: parametersFilter[0],
      max: parametersFilter[1],
    },
    start: parametersFilter[1],
    step: parametersFilter[2],
  });

  if (filterName === 'invert') {
    postfix = '%';
  }

  if (filterName === 'blur') {
    postfix = 'px';
  }

  sliderElement.noUiSlider.on('update', () => {
    valueElement.value = sliderElement.noUiSlider.get();

    imgUploadPreview.style.filter = `${filterName}(${sliderElement.noUiSlider.get() + postfix})`;

    if (filterName === 'none') {
      imgUploadPreview.style.filter = `${filterName}`;
    }
  });
};

const setFilter = (effectValue) => {
  removeFilter();

  const filterName = effectValue[0];
  const filterParameters = effectValue[1][0];
  const filter = effectValue[1][1];

  imgUploadPreview.classList.add(`effects__preview--${filterName}`);

  settingSliderParameters(filterParameters, filter);

  sliderContainer.classList.toggle('hidden', filterName === 'none');

  currentFilter = filterName;
};

export const selectFilter = () => {
  filters.addEventListener('click', (evt) => {
    const closestEl = evt.target.closest('.effects__radio[id]');

    if (!closestEl) {
      return;
    }

    const filterData = Object.entries(SLIDER_PARAMETERS).find((item) => item[0] === closestEl.value);

    if (filterData) {
      setFilter(filterData);
    }
  });
};

export const setDefaultScalePhoto = () => {
  scale.value = `${MAX_SCALE_VALUE}%`;
};

const setUpScalePhoto = () => {
  scaleValue = Math.min(MAX_SCALE_VALUE, extractScaleValue(scale.value) + SCALE_STEP);

  scale.value = `${scaleValue}%`;
  imgUploadPreview.style.transform = `scale(${(scaleValue) / MAX_SCALE_VALUE})`;
};

const setDownScalePhoto = () => {
  scaleValue = Math.max(MIN_SCALE_VALUE, extractScaleValue(scale.value) - SCALE_STEP);

  scale.value = `${scaleValue}%`;
  imgUploadPreview.style.transform = `scale(${(scaleValue) / MAX_SCALE_VALUE})`;
};

downScalePhoto.addEventListener('click', () => {
  setDownScalePhoto();
});

upScalePhoto.addEventListener('click', () => {
  setUpScalePhoto();
});
