import {isEscKey} from './utils.js';

const bigPicture = document.querySelector('.big-picture');
const closeBtn = bigPicture.querySelector('.big-picture__cancel');
const commentTemplate = document.querySelector('#comments').content.querySelector('.social__comment');

const renderPhotoInfo = (photo) => {
  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');

  bigPicture.querySelector('.big-picture__img img').src = photo.url;
  bigPicture.querySelector('.likes-count').textContent = photo.likes;
  bigPicture.querySelector('.comments-count').textContent = photo.comment.length;
  bigPicture.querySelector('.social__caption').textContent = photo.description;

};

const createComment = (comment) => {
  const listItem = commentTemplate.cloneNode(true);
  const picture = listItem.querySelector('.social__picture');

  picture.src = comment.avatar;
  picture.alt = comment.name;
  listItem.querySelector('.social__text').textContent = comment.message;

  return listItem;
};

const createComments = (comments) => {
  const fragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    fragment.append(createComment(comment));
  });

  return fragment;
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
  const comments = createComments(photo.comment);

  bigPicture.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);

  renderPhotoInfo(photo);
  bigPicture.querySelector('.social__comments').append(comments);
  document.body.classList.add('modal-open');
};
