'use strict';

var PINS = 8;
var LOCATION_RANGE = 1000;
var MOCK = {
  author: {
    avatar: ['01', '02', '03', '04', '05', '06', '07', '08']
  },

  offer: {
    title: 'Заголовок предложения ',
    address: 'Адрес',
    price: {min: 1000, max: 5000},
    type: ['palace', 'flat', 'house', 'bungalo'],
    rooms: {min: 1, max: 5},
    guests: {min: 1, max: 10},
    checkin: ['12:00', '13:00', '14:00'],
    checkout: ['12:00', '13:00', '14:00'],
    features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
    description: 'описание ',
    photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
  },

  location: {
    'x': {min: 0, max: 100},
    'y': {min: 130, max: 630}
  }
};

var generateRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var generateRandomLength = function (arr) {
  var array = [];
  var arrayQuantity = generateRandomNumber(0, arr.length - 1);
  for (var i = 0; i < arrayQuantity; i++) {
    array.push(arr[i]);
  }
  return array;
};

var generateData = function () {
  var arr = [];
  for (var i = 0; i < PINS; i++) {
    arr[i] = {
      author: {avatar: 'img/avatars/user' + MOCK.author.avatar[i] + '.png'},
      offer: {
        title: MOCK.offer.title + (i + 1),
        address: generateRandomNumber(0, LOCATION_RANGE) + ', ' + generateRandomNumber(MOCK.location.y.min, MOCK.location.y.max),
        price: generateRandomNumber(MOCK.offer.price.min, MOCK.offer.price.max),
        type: MOCK.offer.type[generateRandomNumber(0, MOCK.offer.type.length - 1)],
        rooms: generateRandomNumber(MOCK.offer.rooms.min, MOCK.offer.rooms.max),
        guests: generateRandomNumber(MOCK.offer.guests.min, MOCK.offer.guests.max),
        checkin: MOCK.offer.checkin[generateRandomNumber(0, MOCK.offer.checkin.length - 1)],
        checkout: MOCK.offer.checkout[generateRandomNumber(0, MOCK.offer.checkout.length - 1)],
        features: generateRandomLength(MOCK.offer.features),
        description: MOCK.offer.description + (i + 1),
        photos: generateRandomLength(MOCK.offer.photos)
      },
      location: {
        x: generateRandomNumber(0, LOCATION_RANGE),
        y: generateRandomNumber(MOCK.location.y.min, MOCK.location.y.max)
      }
    };
  }
  return arr;
};

var data = generateData();

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var renderMapPin = function (pin) {
  var mapPinElement = pinTemplate.cloneNode(true);
  mapPinElement.style.left = pin.location.x + 'px';
  mapPinElement.style.top = pin.location.y + 'px';
  mapPinElement.querySelector('img').src = pin.author.avatar;
  mapPinElement.querySelector('img').alt = pin.offer.title;

  return mapPinElement;
};

var getFragment = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < data.length; i++) {
    fragment.appendChild(renderMapPin(data[i]));
  }

  var mapPins = document.querySelector('.map__pins');
  mapPins.appendChild(fragment);
};

var adForm = document.querySelector('.ad-form');
var fieldsetArray = adForm.querySelectorAll('fieldset');

var getAdForm = function () {
  for (var i = 0; i < fieldsetArray.length; i++) {
    fieldsetArray[i].setAttribute('disabled', true);
  }
};

getAdForm();

var removeAdForm = function () {
  for (var i = 0; i < fieldsetArray.length; i++) {
    fieldsetArray[i].removeAttribute('disabled', true);
  }
};

var createPinAddress = adForm.querySelector('#address');

var mapPinMain = document.querySelector('.map__pin--main');
mapPinMain.addEventListener('mousedown', function () {
  removeAdForm();
  document.querySelector('.map').classList.remove('map--faded');
  getFragment();
  createPinAddress.value = mapPinMain.style.top + ', ' + mapPinMain.style.left;
});

mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 13) {
    removeAdForm();
    document.querySelector('.map').classList.remove('map--faded');
    getFragment();
    createPinAddress.value = mapPinMain.style.top + ', ' + mapPinMain.style.left;
  }
});

var roomNumber = adForm.querySelector('#room_number');
var roomNumberOptions = roomNumber.querySelectorAll('option');
var capacity = adForm.querySelector('#capacity');
var capacityOptions = capacity.querySelectorAll('option');

roomNumber.addEventListener('change', function () {
  for (var i = 0; i < roomNumberOptions.length; i++) {
    if (roomNumberOptions[i].value === '100') {
      for (var j = 0; j < capacityOptions.length; j++) {
        if (capacityOptions[j].value !== '0') {
          capacityOptions[j].toggleAttribute('disabled', capacityOptions[j].value === '1' || capacityOptions[j].value === '2' || capacityOptions[j].value === '3');
        }
      }
    }
    if (roomNumberOptions[i].value === '1') {
      for (var k = 0; k < capacityOptions.length; k++) {
        capacityOptions[i].removeAttribute('disabled', capacityOptions[i].value === '0' || capacityOptions[i].value === '1' || capacityOptions[i].value === '2' || capacityOptions[i].value === '3');
        if (capacityOptions[k].value !== '1') {
          capacityOptions[k].toggleAttribute('disabled', capacityOptions[k].value === '0' || capacityOptions[k].value === '2' || capacityOptions[k].value === '3');
        }
      }
    }
  }
});
