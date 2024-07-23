import {isEscKey} from './utils.js';
import * as bigPictureData from './big-picture-data.js';

const commentTemplate = document.querySelector('#comments').content.querySelector('.social__comment');

const renderPhotoInfo = (photo) => {
  bigPictureData.commentCount.classList.add('hidden');
  bigPictureData.commentLoader.classList.add('hidden');

  bigPictureData.bigPicImg.src = photo.url;
  bigPictureData.likesCount.textContent = photo.likes;
  bigPictureData.commentsCount.textContent = photo.comment.length;
  bigPictureData.bigPicCaption.textContent = photo.description;

};

const createComment = (comment) => {
  const listItem = commentTemplate.cloneNode(true);
  const picture = listItem.querySelector('.social__picture');

  picture.src = comment.avatar;
  picture.alt = comment.name;
  listItem.querySelector('.social__text').textContent = comment.message;

  return listItem;
};

export const renderComments = (comments) => {
  const fragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    fragment.append(createComment(comment));
  });

  return fragment;
};


const closeBigPicture = () => {
  bigPictureData.bigPicture.classList.add('hidden');
  bigPictureData.photoComments.innerHTML = '';
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown(evt) {
  if (isEscKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

bigPictureData.closeBtn.addEventListener('click', () => {
  closeBigPicture();
});

export const renderBigPhoto = (photo) => {
  const comments = renderComments(photo.comment);

  bigPictureData.bigPicture.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);

  renderPhotoInfo(photo);
  bigPictureData.photoComments.append(comments);
  document.body.classList.add('modal-open');
};
