import {isEscKey} from './utils.js';

const commentTemplate = document.querySelector('#comments').content.querySelector('.social__comment');
const bigPicture = document.querySelector('.big-picture');
const closeBtn = bigPicture.querySelector('.big-picture__cancel');
const photoComments = bigPicture.querySelector('.social__comments');
const commentCount = bigPicture.querySelector('.social__comment-count');
const commentLoader = bigPicture.querySelector('.comments-loader');
const bigPicImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const bigPicCaption = bigPicture.querySelector('.social__caption');

const renderPhotoInfo = (photo) => {
  commentCount.classList.add('hidden');
  commentLoader.classList.add('hidden');

  bigPicImg.src = photo.url;
  likesCount.textContent = photo.likes;
  commentsCount.textContent = photo.comment.length;
  bigPicCaption.textContent = photo.description;

};

const createComment = (comment) => {
  const listItem = commentTemplate.cloneNode(true);
  const picture = listItem.querySelector('.social__picture');
  const commentMsg = listItem.querySelector('.social__text');

  picture.src = comment.avatar;
  picture.alt = comment.name;
  commentMsg.textContent = comment.message;

  return listItem;
};

const renderComments = (comments) => {
  const fragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    fragment.append(createComment(comment));
  });

  photoComments.append(fragment);
};


const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  photoComments.innerHTML = '';
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
  bigPicture.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);

  renderPhotoInfo(photo);
  document.body.classList.add('modal-open');
  renderComments(photo.comment);
};
