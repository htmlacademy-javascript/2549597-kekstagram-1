import {isEscKey} from './utils.js';

const COUNT_SHOWN_COMMENTS = 5;

const commentTemplate = document.querySelector('#comments').content.querySelector('.social__comment');
const bigPicture = document.querySelector('.big-picture');
const onCloseBtnClick = bigPicture.querySelector('.big-picture__cancel');
const photoComments = bigPicture.querySelector('.social__comments');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const bigPictureCaption = bigPicture.querySelector('.social__caption');
const onCommentsLoaderBtnClick = document.querySelector('.social__comments-loader');
const visibleCommentCount = document.querySelector('.visible-comments-count');
const commentsCount = document.querySelector('.comments-count');

let comments = [];
let activeComment = 0;

const renderPhotoInfo = (photo) => {
  bigPictureImg.src = photo.url;
  likesCount.textContent = photo.likes;
  bigPictureCaption.textContent = photo.description;
  commentsCount.textContent = `${comments.length}`;
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
  const visibleComments = comments.slice(0, activeComment);

  visibleComments.forEach((comment) => {
    fragment.append(createComment(comment));
  });

  photoComments.replaceChildren(fragment);
  visibleCommentCount.textContent = `${visibleComments.length}`;
};

const showMoreComments = () => {
  activeComment = Math.min(comments.length, activeComment + COUNT_SHOWN_COMMENTS);

  if (comments.length === activeComment) {
    onCommentsLoaderBtnClick.classList.add('hidden');
  }

  renderComments();
};

const closeBigPicture = () => {
  activeComment = 0;
  comments = [];
  commentsCount.textContent = '0';
  visibleCommentCount.textContent = '0';

  onCommentsLoaderBtnClick.classList.add('hidden');
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

onCloseBtnClick.addEventListener('click', () => {
  closeBigPicture();
});

export const showBigPhoto = (photo) => {
  comments = photo.comment;

  bigPicture.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
  renderPhotoInfo(photo);
  document.body.classList.add('modal-open');

  if (comments.length) {
    onCommentsLoaderBtnClick.classList.remove('hidden');

    showMoreComments();
  }
};

onCommentsLoaderBtnClick.addEventListener('click', showMoreComments);
