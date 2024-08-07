import {isEscKey} from './utils.js';

const COUNT_SHOWN_COMMENTS = 5;

const commentTemplate = document.querySelector('#comments').content.querySelector('.social__comment');
const bigPicture = document.querySelector('.big-picture');
const closeBtn = bigPicture.querySelector('.big-picture__cancel');
const photoComments = bigPicture.querySelector('.social__comments');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const bigPictureCaption = bigPicture.querySelector('.social__caption');
const commentsLoaderBtn = document.querySelector('.social__comments-loader');
const visibleCommentCount = document.querySelector('.visible-comments-count');
const commentCount = document.querySelector('.comments-count');

let comments;
let countAddedComments = 0;

const renderPhotoInfo = (photo) => {
  bigPictureImg.src = photo.url;
  likesCount.textContent = photo.likes;
  bigPictureCaption.textContent = photo.description;
  commentCount.textContent = `${comments.length}`;
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
  const visibleComments = comments.slice(0, countAddedComments);
  visibleComments.forEach((comment) => {
    fragment.append(createComment(comment));
  });

  photoComments.replaceChildren(fragment);
  visibleCommentCount.textContent = `${visibleComments.length}`;
};

const renderMoreComments = () => {
  const socialComment = document.querySelectorAll('.social__comment').length;
  countAddedComments += COUNT_SHOWN_COMMENTS;

  if (!(comments.length === socialComment)) {
    renderComments();
  }
};

const closeBigPicture = () => {
  countAddedComments = 0;
  comments = 0;
  visibleCommentCount.textContent = '0';

  commentsLoaderBtn.classList.remove('hidden');
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

const showBtn = () => {
  if (comments.length > COUNT_SHOWN_COMMENTS) {
    commentsLoaderBtn.classList.remove('hidden');
  }
};

export const showBigPhoto = (photo) => {
  comments = photo.comment;

  bigPicture.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
  renderPhotoInfo(photo);
  document.body.classList.add('modal-open');

  commentsLoaderBtn.classList.add('hidden');

  if (comments.length) {
    countAddedComments = Math.min(comments.length, COUNT_SHOWN_COMMENTS);

    renderComments();
    showBtn();
  }
};

commentsLoaderBtn.addEventListener('click', renderMoreComments);
