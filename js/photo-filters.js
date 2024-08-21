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
    name: 'none',
    postfix: '',
  },
  'chrome': {
    min: 0,
    max: 1,
    step: 0.1,
    filter: 'grayscale',
    name: 'chrome',
    postfix: '',
  },
  'sepia': {
    min: 0,
    max: 1,
    step: 0.1,
    filter: 'sepia',
    name: 'sepia',
    postfix: '',
  },
  'marvin': {
    min: 0,
    max: 100,
    step: 1,
    filter: 'invert',
    name: 'marvin',
    postfix: '%',
  },
  'phobos': {
    min: 0,
    max: 3,
    step: 0.1,
    filter: 'blur',
    name: 'phobos',
    postfix: 'px',
  },
  'heat': {
    min: 1,
    max: 3,
    step: 0.1,
    filter: 'brightness',
    name: 'heat',
    postfix: '',
  },
};

const sliderElement = document.querySelector('.effect-level__slider');
const valueElement = document.querySelector('.effect-level__value');
const onScaleDownClick = document.querySelector('.scale__control--smaller');
const onScaleUpClick = document.querySelector('.scale__control--bigger');
const scale = document.querySelector('.scale__control--value');
const imgUploadPreview = document.querySelector('.img-upload__preview');
const filters = document.querySelector('.effects__list');
const sliderContainer = document.querySelector('.img-upload__effect-level');

let activeFilter = FILTERS.none ;

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

  imgUploadPreview.style.filter = `${activeFilter.filter}(${sliderElement.noUiSlider.get() + activeFilter.postfix})`;
});

const updateSlider = () => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: activeFilter.min,
      max: activeFilter.max,
    },
    start: activeFilter.max,
    step: activeFilter.step,
  });
};

const setFilter = () => {
  imgUploadPreview.className = `effects__preview--${activeFilter.name}`;
  updateSlider();

  if (activeFilter === FILTERS.none) {
    sliderContainer.classList.add('hidden');
  } else {
    sliderContainer.classList.remove('hidden');
  }
};

export const resetSlider = () => {
  activeFilter = FILTERS.none;

  setFilter();
  imgUploadPreview.removeAttribute('style');
};

filters.addEventListener('change', (evt) => {
  const effectEl = evt.target.closest('.effects__radio[id]');

  if (!effectEl) {
    return;
  }

  activeFilter = FILTERS[effectEl.value] ?? FILTERS.none;

  if (activeFilter.name === 'none') {
    resetSlider();
  } else {
    setFilter();
  }
});

const setScaleValue = (scaleSize) => {
  scale.value = `${scaleSize}%`;
  imgUploadPreview.style.transform = `scale(${(scaleSize) / MAX_SCALE_VALUE})`;
};

export const resetScale = () => {
  setScaleValue(MAX_SCALE_VALUE);
};

onScaleDownClick.addEventListener('click', () => {
  const scaleValue = Math.max(MIN_SCALE_VALUE, convertToNumber(scale.value) - SCALE_STEP);

  setScaleValue(scaleValue);
});

onScaleUpClick.addEventListener('click', () => {
  const scaleValue = Math.min(MAX_SCALE_VALUE, convertToNumber(scale.value) + SCALE_STEP);

  setScaleValue(scaleValue);
});
