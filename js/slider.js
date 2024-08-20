import { sliderElement } from './photo-filters.js';

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

export const resetSlider = () => {
  sliderElement.noUiSlider.destroy();
};
