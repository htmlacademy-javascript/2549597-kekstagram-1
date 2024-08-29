import './gallery.js';
import './big-picture.js';
import './form.js';
import './sorting-photos.js';

import {getData} from './api.js';
import {initGallery} from './gallery.js';
import {showAlert} from './dialogs.js';
import {setPhotoFilter} from './sorting-photos.js';
import {debounce} from './utils.js';

getData()
  .then((photoData) => {
    initGallery(photoData);
    setPhotoFilter(debounce(
      () => initGallery(photoData)));
  }).catch(
    () => {
      showAlert();
    }
  );
