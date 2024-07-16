import {createGallery, MAX_PHOTO_LENGTH} from './gallery.js';

const imagePattern = document.querySelector('#picture').content.querySelector('.picture');
const fragment = document.createDocumentFragment();
const containerUsersPhoto = document.querySelector('.pictures');
const galery = createGallery(MAX_PHOTO_LENGTH);

galery.forEach(({url, likes, comment}) => {
  const patternClon = imagePattern.cloneNode(true);

  patternClon.querySelector('.picture__img').src = url;
  patternClon.querySelector('.picture__likes').textContent = likes;
  patternClon.querySelector('.picture__comments').textContent = comment.length;

  fragment.appendChild(patternClon);
});

containerUsersPhoto.appendChild(fragment);
