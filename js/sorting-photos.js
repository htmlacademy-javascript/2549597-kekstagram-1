const ACTIVE_FILTER = 'img-filters__button--active';

const imgFiltersSection = document.querySelector('.img-filters');
let filterId = 'filter-default';

export const setPhotoFilter = (cb) => {
  imgFiltersSection.addEventListener('click', (evt) => {
    const closestEl = evt.target.closest('.img-filters__button');
    const lastClosestEl = document.querySelector(`.${ACTIVE_FILTER}`);

    if (!closestEl) {
      return;
    }

    filterId = closestEl.id;

    lastClosestEl.classList.toggle(ACTIVE_FILTER);
    closestEl.classList.add(ACTIVE_FILTER);
    cb();
  });
};

export {filterId};
