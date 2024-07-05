const count = 25;
const idPhotos = Array.from({length : count}, (_, i) => i + 1);
const urlPhotos = Array.from({length : count}, (_, i) => `photos/${i + 1}.jpg)`);
const descriptionPhotos = [
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
const names = [
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
const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const avatars = Array.from({length : 6}, (_, x) => `img/avatar-${x + 1}.svg`);

const getRandomValue = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomValue(0, elements.length - 1)];

const createUniqueRandomComment = () => {
  const arrayOfComments = [];

  return function () {
    const comment = {
      id: Math.ceil(Math.random() * 100),
      avatar: getRandomArrayElement(avatars),
      message: getRandomArrayElement(messages),
      name: getRandomArrayElement(names),
    };
    const arrayIdFromArrayComments = arrayOfComments.map((obj) => obj.id);

    while (arrayIdFromArrayComments.includes(comment.id)) {
      comment.id = Math.ceil(Math.random() * 100);
    }

    arrayOfComments.push(comment);

    return comment;
  };
};

const getMassRandomQuantityComments = (lengthMass) => Array.from({length: lengthMass}, createUniqueRandomComment());

const createUniqueRandomPhotoInfo = () => {
  const arrayPhotoDescriptions = [];

  return function () {
    let photoDescription = {
      id: getRandomArrayElement(idPhotos),
      url: getRandomArrayElement(urlPhotos),
      description: getRandomArrayElement(descriptionPhotos),
      likes: getRandomValue(15, 200),
      comment: getMassRandomQuantityComments(Math.floor(Math.random() * 10)),
    };
    const arrayIdFromArrayPhotoDescriptions = arrayPhotoDescriptions.map((obj) => obj.id);
    const arrayUrlFromArrayPhotoDescriptions = arrayPhotoDescriptions.map((obj) => obj.url);

    while (arrayIdFromArrayPhotoDescriptions.includes(photoDescription.id) || arrayUrlFromArrayPhotoDescriptions.includes(photoDescription.url)) {
      photoDescription = {
        id: getRandomArrayElement(idPhotos),
        url: getRandomArrayElement(urlPhotos),
        description: getRandomArrayElement(descriptionPhotos),
        likes: getRandomValue(15, 200),
        comment: getMassRandomQuantityComments(Math.floor(Math.random() * 10)),
      };
    }

    arrayPhotoDescriptions.push(photoDescription);

    return photoDescription;
  };
};

const mass = Array.from({length : count}, createUniqueRandomPhotoInfo());

