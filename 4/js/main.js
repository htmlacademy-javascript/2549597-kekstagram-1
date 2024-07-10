const COUNT_PHOTO_OBJECT = 25;
const DESCRIPTION_PHOTOS = [
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
const USER_NAMES = [
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
const COMMENT_MESSAGES = [
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

const createPhotoComment = (id) => ({
  return: {
    id: id,
    avatar: `img/avatar-${getRandomValue(0, 6)}.svg`,
    message: COMMENT_MESSAGES[getRandomValue(0, COMMENT_MESSAGES.length - 1)],
    name: USER_NAMES[getRandomValue(0, USER_NAMES.length - 1)],
  }
});

const createPhotoObject = (id) => ({
  return: {
    id : id,
    url: `photos/${id}.jpg)`,
    description: DESCRIPTION_PHOTOS[getRandomValue(0, DESCRIPTION_PHOTOS.length - 1)],
    likes: getRandomValue(15, 200),
    comment: createPhotoComment(id),
  }
});

const createGallery = (arrayLength) => ({
  return : Array.from({length : arrayLength}, (_, i) => createPhotoObject(i + 1))
});

createGallery(COUNT_PHOTO_OBJECT);
