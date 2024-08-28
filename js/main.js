import './gallery.js';
import './big-picture.js';
import './form.js';

import {getData} from './api.js';
import {initGallery} from './gallery.js';
import {showAlert} from './dialogs.js';

getData()
  .then((photoData) => {
    initGallery(photoData);
  }).catch(
    () => {
      showAlert();
    }
  );
