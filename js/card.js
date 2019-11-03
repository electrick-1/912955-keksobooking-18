'use strict';

(function () {
  var map = document.querySelector('.map');
  var cardTemplate = document.querySelector('#card').content.querySelector('article');
  var rooms;

  var type = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'palace': 'Дворец',
    'house': 'Дом'
  };

  var createCardElement = function (data) {
    var cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector('.popup__title').textContent = data.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = data.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = data.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = type[data.offer.type];

    switch (data.offer.rooms) {
      case 0: rooms = ' комнат для ';
        break;
      case 1: rooms = ' комната для ';
        break;
      default: rooms = ' комнаты для ';
        break;
    }

    var guests = data.offer.guests === 1 ? ' гостя' : data.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--capacity').textContent = data.offer.rooms + rooms + guests;

    var cardTime = cardElement.querySelector('.popup__text--time');
    cardTime.textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;

    var cardFeatures = cardElement.querySelector('.popup__features');
    createFeaturesElement(cardFeatures, data.offer.features);

    cardElement.querySelector('.popup__description').textContent = data.offer.description;

    var cardPhotos = cardElement.querySelector('.popup__photos');
    createPhotosElement(cardPhotos, data.offer.photos);

    cardElement.querySelector('.popup__avatar').src = data.author.avatar;

    window.map.map.appendChild(cardElement);
  };

  var createFeaturesElement = function (element, data) {
    element.innerHTML = '';
    data.forEach(function (features) {
      var listElement = document.createElement('li');
      listElement.classList.add('popup__feature');
      listElement.classList.add('popup__feature--' + features);
      element.appendChild(listElement);
    });
  };

  var createPhotosElement = function (element, data) {
    element.innerHTML = '';
    data.forEach(function (src) {
      var image = document.createElement('img');
      image.src = src;
      image.width = 45;
      image.height = 40;
      image.classList.add('popup__photo');
      image.setAttribute('alt', 'Фотография жилья');
      element.appendChild(image);
    });
  };

  window.card = {
    createCardElement: createCardElement
  };
})();
