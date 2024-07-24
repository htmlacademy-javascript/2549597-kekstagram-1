import {isEscKey} from './utils.js';
import {COUNT_SHOWN_COMMENTS} from './data.js';

const commentTemplate = document.querySelector('#comments').content.querySelector('.social__comment');
const bigPicture = document.querySelector('.big-picture');
const closeBtn = bigPicture.querySelector('.big-picture__cancel');
const photoComments = bigPicture.querySelector('.social__comments');
const commentCount = bigPicture.querySelector('.social__comment-count');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const bigPictureCaption = bigPicture.querySelector('.social__caption');
const showCommentsBtn = document.querySelector('.social__comments-loader');

const renderPhotoInfo = (photo) => {
  const comment = photo.comment.length < COUNT_SHOWN_COMMENTS ? photo.comment.length : COUNT_SHOWN_COMMENTS;

  bigPictureImg.src = photo.url;
  likesCount.textContent = photo.likes;
  bigPictureCaption.textContent = photo.description;
  commentCount.textContent = `${comment} из ${photo.comment.length} комментариев`;
};

const createComment = (comment, commentIndex) => {
  const commentEl = commentTemplate.cloneNode(true);
  const picture = commentEl.querySelector('.social__picture');
  const commentMsg = commentEl.querySelector('.social__text');

  if (commentIndex > COUNT_SHOWN_COMMENTS - 1) {
    commentEl.classList.add('hidden');
  }
  picture.src = comment.avatar;
  picture.alt = comment.name;
  commentMsg.textContent = comment.message;

  return commentEl;
};

const renderComments = (comments) => {
  const fragment = document.createDocumentFragment();

  comments.forEach((comment, commentIndex) => {
    fragment.append(createComment(comment, commentIndex));
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

const showMoreComments = (comments) => {
  const count = comments.length > COUNT_SHOWN_COMMENTS ? COUNT_SHOWN_COMMENTS : comments.length;

  for (let i = 0; i < count; i++) {
    comments[i].classList.remove('hidden');
  }
};

export const renderBigPhoto = (photo) => {
  bigPicture.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);

  renderPhotoInfo(photo);
  document.body.classList.add('modal-open');
  renderComments(photo.comment);
};

showCommentsBtn.addEventListener('click', () => {
  let hiddenComments = bigPicture.querySelectorAll('.social__comment.hidden');

  if (!(hiddenComments === 0)) {
    showMoreComments(hiddenComments);

    hiddenComments = bigPicture.querySelectorAll('.social__comment.hidden');
    const allComments = bigPicture.querySelectorAll('.social__comment');
    const commentsLength = allComments.length - hiddenComments.length;

    commentCount.textContent = `${commentsLength} из ${allComments.length} комментариев`;
  }
});
