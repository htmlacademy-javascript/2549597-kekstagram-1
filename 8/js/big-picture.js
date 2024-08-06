import {isEscKey} from './utils.js';

const countShownComments = 5;
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

const renderPhotoInfo = (photo) => {
  bigPictureImg.src = photo.url;
  likesCount.textContent = photo.likes;
  bigPictureCaption.textContent = photo.description;

  const comment = photo.comment.length < countShownComments ? photo.comment.length : countShownComments;
  commentCount.textContent = `${photo.comment.length}`;
  visibleCommentCount.textContent = `${comment}`;
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

const renderComments = (comments, counter) => {
  const fragment = document.createDocumentFragment();
  const visibleComments = comments.slice(0, counter);

  visibleComments.forEach((comment) => {
    fragment.append(createComment(comment));
  });

  photoComments.innerHTML = '';
  photoComments.append(fragment);

  visibleCommentCount.textContent = `${visibleComments.length}`;
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
  let counterComments = countShownComments;
  bigPicture.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
  renderPhotoInfo(photo);
  document.body.classList.add('modal-open');
  renderComments(photo.comment, countShownComments);

  showCommentsBtn.addEventListener('click', () => {
    counterComments += countShownComments;
    renderComments(photo.comment, counterComments);
  });
};

