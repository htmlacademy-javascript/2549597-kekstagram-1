import {dataGallery} from './gallery.js';
import {USER_PHOTO_SIZE} from './data.js';

const bigPicture = document.querySelector('.big-picture');
const photoGallery = document.querySelectorAll('.picture__img');
const resetBtn = bigPicture.querySelector('.big-picture__cancel');
const commentTemplate = document.querySelector('#comments').content.querySelector('.social__comment');

const renderPhotoInfo = (index) => {
  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');

  bigPicture.querySelector('img').src = dataGallery[index].url;
  bigPicture.querySelector('.likes-count').textContent = dataGallery[index].likes;
  bigPicture.querySelector('.comments-count').textContent = dataGallery[index].comment.length;
  bigPicture.querySelector('.social__caption').textContent = dataGallery[index].description;

};

const createComments = (comments) => {
  bigPicture.querySelector('.social__comments').innerHTML = '';

  const fragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    const listItem = commentTemplate.cloneNode(true);

    listItem.querySelector('.social__picture').src = comment.avatar;
    listItem.querySelector('.social__picture').alt = comment.name;
    listItem.querySelector('.social__picture').width = USER_PHOTO_SIZE;
    listItem.querySelector('.social__picture').height = USER_PHOTO_SIZE;
    listItem.querySelector('.social__text').textContent = comment.message;

    fragment.append(listItem);
  });

  return fragment;
};

const createElement = (element,index) => {
  element.addEventListener('click', () => {
    openBigPicture();
    renderPhotoInfo(index);
    bigPicture.querySelector('.social__comments').append(createComments(dataGallery[index].comment));
    document.body.classList.add('modal-open');
  });
};

const renderBigPhoto = (gallery) => {
  gallery.forEach((element, index) => {
    createElement(element,index);
  });
};

resetBtn.addEventListener('click', () => {
  closeBigPicture();
});

const onDocumentKeydown = (evt) => {
  if(evt.key === 'Escape') {
    evt.preventDefault();

    closeBigPicture();
  }
};

function openBigPicture() {
  bigPicture.classList.remove('hidden');

  document.addEventListener('keydown', onDocumentKeydown);
}

function closeBigPicture() {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
}

renderBigPhoto(photoGallery);
