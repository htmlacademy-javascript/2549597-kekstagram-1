import {convertToNumber} from './utils.js';

const SCALE_STEP = 25;
const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;
const FILTERS = {
  'none': {
    min: 0,
    max: 1,
    step: 0.1,
    filter: 'none',
    postfix: '',
  },
  'chrome': {
    min: 0,
    max: 1,
    step: 0.1,
    filter: 'grayscale',
    postfix: '',
  },
  'sepia': {
    min: 0,
    max: 1,
    step: 0.1,
    filter: 'sepia',
    postfix: '',
  },
  'marvin': {
    min: 0,
    max: 100,
    step: 1,
    filter: 'invert',
    postfix: '%',
  },
  'phobos': {
    min: 0,
    max: 3,
    step: 0.1,
    filter: 'blur',
    postfix: 'px',
  },
  'heat': {
    min: 1,
    max: 3,
    step: 0.1,
    filter: 'brightness',
    postfix: '',
  },
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
let filterData = {};

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  connect: 'lower',
  step: 1,
  format: {
    to: function (value) {
      return Number.isInteger(value) ? value.toFixed(0) : value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

sliderElement.noUiSlider.on('update', () => {
  valueElement.value = sliderElement.noUiSlider.get();

  imgUploadPreview.style.filter = `${filterData.filter}(${sliderElement.noUiSlider.get() + filterData.postfix})`;
});

export const resetSlider = () => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
  });

  imgUploadPreview.style.filter = 'none';

  sliderContainer.classList.add('hidden');
};

const removeFilter = () => {
  imgUploadPreview.classList.remove(`effects__preview--${currentFilter}`);
};

const settingSliderParameters = (parametersFilter) => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: parametersFilter.min,
      max: parametersFilter.max,
    },
    start: parametersFilter.max,
    step: parametersFilter.step,
  });
};

const setFilter = (effectValue, filterName) => {
  removeFilter();

  imgUploadPreview.classList.add(`effects__preview--${filterName}`);

  settingSliderParameters(effectValue);

  sliderContainer.classList.remove('hidden');

  currentFilter = filterName;
};

filters.addEventListener('click', (evt) => {
  const closestEl = evt.target.closest('.effects__radio[id]');

  if (!closestEl) {
    return;
  }

  filterData = FILTERS[closestEl.value];

  if (closestEl.value === 'none') {
    resetSlider();

    return;
  }

  if (filterData) {
    setFilter(filterData, closestEl.value);
  }
});

const setScaleValue = (scaleSize) => {
  scale.value = `${scaleSize}%`;
  imgUploadPreview.style.transform = `scale(${(scaleSize) / MAX_SCALE_VALUE})`;
};

export const resetScale = () => {
  setScaleValue(scaleValue);
};

const setUpScalePhoto = () => {
  scaleValue = Math.min(MAX_SCALE_VALUE, convertToNumber(scale.value) + SCALE_STEP);

  setScaleValue(scaleValue);
};

const setDownScalePhoto = () => {
  scaleValue = Math.max(MIN_SCALE_VALUE, convertToNumber(scale.value) - SCALE_STEP);

  setScaleValue(scaleValue);
};

downScalePhoto.addEventListener('click', () => {
  setDownScalePhoto();
});

upScalePhoto.addEventListener('click', () => {
  setUpScalePhoto();
});
