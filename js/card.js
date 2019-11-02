'use strict';

(function () {
  var map = document.querySelector('.map');
  var card = document.querySelector('#card');
  var cardTemplate = card.content.querySelector('article');
  var rooms;

  var type = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'palace': 'Дворец',
    'house': 'Дом'
  };

  var createCardElement = function (data) {
    var cardElement = cardTemplate.cloneNode(true);

    var cardTitle = cardElement.querySelector('.popup__title');
    cardTitle.textContent = data.offer.title;

    var cardAddress = cardElement.querySelector('.popup__text--address');
    cardAddress.textContent = data.offer.address;

    var cardPrice = cardElement.querySelector('.popup__text--price');
    cardPrice.textContent = data.offer.price + '₽/ночь';

    var cardType = cardElement.querySelector('.popup__type');

    cardType.textContent = type[data.offer.type];

    // insertBefore || insertAdjacentElement

    var cardRooms = cardElement.querySelector('.popup__text--capacity');
    switch (data.offer.rooms) {
      case 0: rooms = ' комнат для ';
        break;
      case 1: rooms = ' комната для ';
        break;
      default: rooms = ' комнаты для ';
        break;
    }

    var guests = data.offer.guests === 1 ? ' гостя' : data.offer.guests + ' гостей';
    cardRooms.textContent = data.offer.rooms + rooms + guests;

    var cardTime = cardElement.querySelector('.popup__text--time');
    cardTime.textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;

    var cardFeatures = cardElement.querySelector('.popup__features');
    createFeaturesElement(cardFeatures, data.offer.features);

    // В список .popup__features выведите все доступные удобства в объявлении.

    var cardDescription = cardElement.querySelector('.popup__description');
    cardDescription.textContent = data.offer.description;

    var cardPhotos = cardElement.querySelector('.popup__photos');
    createPhotosElement(cardPhotos, data.offer.photos);

    var cardAvatar = cardElement.querySelector('.popup__avatar');
    cardAvatar.src = data.author.avatar;

    return cardElement;
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

  var createCards = function (data) {
    data.forEach(function (it) {
      map.appendChild(createCardElement(it));
    });
  };

  window.card = {
    createCards: createCards
  };
})();
