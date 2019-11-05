'use strict';

(function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapPins = document.querySelector('.map__pins');

  var createMapPin = function (pin) {
    var mapPinElement = pinTemplate.cloneNode(true);
    mapPinElement.style.left = pin.location.x + 'px';
    mapPinElement.style.top = pin.location.y + 'px';
    mapPinElement.querySelector('img').src = pin.author.avatar;
    mapPinElement.querySelector('img').alt = pin.offer.title;

    mapPinElement.addEventListener('click', function () {
      if (document.querySelector('.map__card')) {
        document.querySelector('.map__card').remove();
      }
      window.card.renderCard(pin);
      removeCard();
    });

    mapPinElement.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.utils.KEYCODE_ENTER) {
        if (document.querySelector('.map__card')) {
          document.querySelector('.map__card').remove();
        }
        window.card.renderCard(pin);
        removeCard();
      }
    });

    return mapPinElement;
  };

  var removeCard = function () {
    document.querySelector('.popup__close').addEventListener('click', function () {
      document.querySelector('.map__card').remove();
    });
  };

  var removePins = function () {
    var toRemove = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    toRemove.forEach(function (it) {
      it.remove();
    });
  };

  var renderPins = function (dataPin) {
    dataPin.forEach(function (it) {
      mapPins.appendChild(createMapPin(it));
    });
  };

  window.pin = {
    renderPins: renderPins,
    removePins: removePins,
  };
})();
