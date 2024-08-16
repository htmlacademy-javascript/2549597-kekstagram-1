const SCALE_STEP = 25;
const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;
const QUANTITY_PERCENT = 100;
const FILTER_NAME = ['none', 'grayscale', 'sepia', 'invert', 'blur', 'brightness'];

const downScalePhoto = document.querySelector('.scale__control--smaller');
const upScalePhoto = document.querySelector('.scale__control--bigger');
const scale = document.querySelector('.scale__control--value');
const imgUploadPreview = document.querySelector('.img-upload__preview');
const filters = document.querySelectorAll('.effects__list input');
const sliderElement = document.querySelector('.effect-level__slider');
const valueElement = document.querySelector('.effect-level__value');
const sliderContainer = document.querySelector('.img-upload__effect-level');
let currentScale = QUANTITY_PERCENT;
let scaleValue = MAX_SCALE_VALUE;

const removeFilter = () => {
  for (const filter of filters) {
    if (imgUploadPreview.className.includes(filter.value)) {
      imgUploadPreview.classList.remove(`effects__preview--${filter.value}`);
    }
  }
};

export const createSlider = () => {
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
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });

  sliderContainer.classList.add('hidden');

  sliderElement.noUiSlider.on('update', () => {
    valueElement.value = sliderElement.noUiSlider.get();
  });
};

const settingSliderParameters = (min, max, step, filterName) => {
  let postfix = '';

  sliderElement.noUiSlider.updateOptions({
    range: {
      min,
      max
    },
    start: max,
    step,
  });

  if (filterName === FILTER_NAME[3]) {
    postfix = '%';
  }

  if (filterName === FILTER_NAME[4]) {
    postfix = 'px';
  }

  sliderElement.noUiSlider.on('update', () => {
    imgUploadPreview.style.filter = `${filterName}(${sliderElement.noUiSlider.get() + postfix})`;

    if (filterName === 'none') {
      imgUploadPreview.style.filter = `${filterName}`;
    }
  });
};

const setFilter = (effectValue) => {
  removeFilter();

  switch (effectValue) {
    case 'none' :
      imgUploadPreview.classList.add('effects__preview--none');

      settingSliderParameters(0, 1, 0.1, FILTER_NAME[0]);

      break;
    case 'chrome' :
      imgUploadPreview.classList.add('effects__preview--chrome');

      settingSliderParameters(0, 1, 0.1, FILTER_NAME[1]);

      break;
    case 'sepia' :
      imgUploadPreview.classList.add('effects__preview--sepia');

      settingSliderParameters(0, 1, 0.1, FILTER_NAME[2]);

      break;
    case 'marvin' :
      imgUploadPreview.classList.add('effects__preview--marvin');

      settingSliderParameters(0, 100, 1, FILTER_NAME[3]);

      break;
    case 'phobos' :
      imgUploadPreview.classList.add('effects__preview--phobos');

      settingSliderParameters(0, 3, 0.1, FILTER_NAME[4]);

      break;
    case 'heat' :
      imgUploadPreview.classList.add('effects__preview--heat');

      settingSliderParameters(1, 3, 0.1, FILTER_NAME[5]);

      break;
  }

  sliderContainer.classList.remove('hidden');

  if (effectValue === 'none') {
    sliderContainer.classList.add('hidden');
  }

};

export const selectionFilter = () => {
  for (const filter of filters) {
    filter.addEventListener('click', (evt) => {
      setFilter(evt.target.value);
    });
  }
};

const setPhotoScale = (evt) => {
  currentScale = Number(scale.value.replace('%', ''));

  if (evt.target.className.includes('smaller')) {
    scaleValue = currentScale > MIN_SCALE_VALUE ? currentScale - SCALE_STEP : currentScale;
  }

  if (evt.target.className.includes('bigger')) {
    scaleValue = currentScale < MAX_SCALE_VALUE ? currentScale + SCALE_STEP : currentScale;
  }

  scale.value = `${scaleValue}%`;
  imgUploadPreview.style.transform = `scale(${(scaleValue) / QUANTITY_PERCENT})`;
};

downScalePhoto.addEventListener('click', (evt) => {
  setPhotoScale(evt);
});

upScalePhoto.addEventListener('click', (evt) => {
  setPhotoScale(evt);
});
