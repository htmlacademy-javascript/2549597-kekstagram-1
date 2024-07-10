const MAX_PHOTO_LENGTH = 25;
const MAX_LIKES = 200;
const MIN_LIKES = 15;
const MIN_QUANTITY_COMMENTS = 1;
const MAX_QUANTITY_COMMENTS = 7;
const MIN_AVATAR_ID = 0;
const MAX_AVATAR_ID = 6;
const PHOTO_DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi facilisis.',
  'Fusce congue lacinia ligula nec sagittis. Curabitur ante nibh, sagittis.',
  'Donec sagittis nisl et felis ultrices lacinia. Maecenas condimentum condimentum.',
  'Cras in eros sagittis, luctus enim et, venenatis ante. Maecenas.',
  'Proin id cursus ipsum. Mauris aliquam vehicula velit, efficitur maximus.',
  'Proin suscipit efficitur justo eu eleifend. Morbi sit amet nisi.',
  'Nullam nunc leo, tincidunt eu magna in, sodales porttitor nunc.',
  'Curabitur bibendum tortor mauris, in volutpat urna lobortis at. Fusce.',
  'Sed auctor purus quis nulla egestas, porttitor euismod diam laoreet.',
  'Morbi a arcu semper, convallis quam vel, efficitur ipsum. Pellentesque.',
  'Morbi eleifend orci vel diam rutrum, id tempus ligula porttitor.',
  'Maecenas consequat nibh id sapien ornare pellentesque. Suspendisse porttitor fringilla.',
  'Curabitur fermentum nibh a ligula iaculis, in iaculis dolor feugiat.',
  'Vivamus dapibus pulvinar cursus. Donec fermentum placerat pulvinar. Mauris ac.',
  'Integer augue neque, tempor eget vehicula faucibus, viverra volutpat lorem.'
];
const USERNAMES = [
  'Alastair',
  'Fergus',
  'Crispin',
  'Kenzie',
  'Ewan',
  'Lachlan',
  'Amelia',
  'Gladys',
  'Myrtle',
  'Frideswide',
  'Oliver',
  'Jacob',
  'Lily',
  'Mia',
  'George',
  'Charlotte',
  'Benjamin'
];
const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const getRandomValue = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomValue(0, elements.length - 1)];

const createPhotoComment = (id) => ({
  id,
  avatar: `img/avatar-${getRandomValue(MIN_AVATAR_ID, MAX_AVATAR_ID)}.svg`,
  message: getRandomArrayElement(COMMENTS),
  name: getRandomArrayElement(USERNAMES),
});

const createPhoto = (id) => ({
  id,
  url: `photos/${id}.jpg`,
  description: getRandomArrayElement(PHOTO_DESCRIPTIONS),
  likes: getRandomValue(MIN_LIKES, MAX_LIKES),
  comment: Array.from({length: getRandomValue(MIN_QUANTITY_COMMENTS, MAX_QUANTITY_COMMENTS)}, (_, i) => createPhotoComment(i + 1)),
});

const createGallery = (length) => Array.from({length}, (_, i) => createPhoto(i + 1));

createGallery(MAX_PHOTO_LENGTH);
