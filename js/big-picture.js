import {isEscKey} from './utils.js';

const COUNT_SHOWN_COMMENTS = 5;
const commentTemplate = document.querySelector('#comments').content.querySelector('.social__comment');
const bigPicture = document.querySelector('.big-picture');
const closeBtn = bigPicture.querySelector('.big-picture__cancel');
const photoComments = bigPicture.querySelector('.social__comments');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const bigPictureCaption = bigPicture.querySelector('.social__caption');
const showCommentsBtn = document.querySelector('.social__comments-loader');
const visibleCommentCount = document.querySelector('.visible-comments-count');
const commentCount = document.querySelector('.comments-count');
let commentArray;
let counterComments;

const renderPhotoInfo = (photo) => {
  bigPictureImg.src = photo.url;
  likesCount.textContent = photo.likes;
  bigPictureCaption.textContent = photo.description;
  commentCount.textContent = `${photo.comment.length}`;
};

const createComment = (comment) => {
  const commentEl = commentTemplate.cloneNode(true);
  const picture = commentEl.querySelector('.social__picture');
  const commentMsg = commentEl.querySelector('.social__text');

  picture.src = comment.avatar;
  picture.alt = comment.name;
  commentMsg.textContent = comment.message;

  return commentEl;
};

const renderComments = () => {
  const fragment = document.createDocumentFragment();
  const visibleComments = commentArray.slice(0, counterComments);

  visibleComments.forEach((comment) => {
    fragment.append(createComment(comment));
  });

  photoComments.replaceChildren(fragment);

  visibleCommentCount.textContent = `${visibleComments.length}`;
};

const showComments = () => {
  counterComments += COUNT_SHOWN_COMMENTS;
  renderComments();
};

const closeBigPicture = () => {
  commentCount.textContent = '';
  visibleCommentCount.textContent = '';

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

export const showBigPhoto = (photo) => {
  commentArray = photo.comment;
  counterComments = COUNT_SHOWN_COMMENTS;

  if (commentArray < COUNT_SHOWN_COMMENTS) {
    counterComments = commentArray;
  }

  bigPicture.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
  renderPhotoInfo(photo);
  document.body.classList.add('modal-open');
  renderComments();
};

showCommentsBtn.addEventListener('click', showComments);
