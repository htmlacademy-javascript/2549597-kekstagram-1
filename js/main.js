import './gallery.js';
import './big-picture.js';
import './form.js';

import {getData} from './api.js';
import {initGallery} from './gallery.js';

initGallery(getData());
