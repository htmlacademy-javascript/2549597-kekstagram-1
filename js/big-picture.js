import {isEscKey} from './utils.js';

const bigPicture = document.querySelector('.big-picture');
const closeBtn = bigPicture.querySelector('.big-picture__cancel');
const commentTemplate = document.querySelector('#comments').content.querySelector('.social__comment');

const renderPhotoInfo = (photo) => {
  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');

  bigPicture.querySelector('img').src = photo.url;
  bigPicture.querySelector('.likes-count').textContent = photo.likes;
  bigPicture.querySelector('.comments-count').textContent = photo.comment.length;
  bigPicture.querySelector('.social__caption').textContent = photo.description;

};

const createComments = (comments) => {
  const fragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    const listItem = commentTemplate.cloneNode(true);

    listItem.querySelector('.social__picture').src = comment.avatar;
    listItem.querySelector('.social__picture').alt = comment.name;
    listItem.querySelector('.social__text').textContent = comment.message;

    fragment.append(listItem);
  });

  return fragment;
};

const openBigPicture = () => {
  bigPicture.classList.remove('hidden');

  document.addEventListener('keydown', onDocumentKeydown);
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  bigPicture.querySelector('.social__comments').innerHTML = '';
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown(evt) {
  if (isEscKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

closeBtn.addEventListener('click', () => {
  closeBigPicture();
});

export const renderBigPhoto = (photo) => {
  openBigPicture();
  renderPhotoInfo(photo);
  bigPicture.querySelector('.social__comments').append(createComments(photo.comment));
  document.body.classList.add('modal-open');
};
