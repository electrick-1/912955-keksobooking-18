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
      pinListenerHandler(pin);
    });

    mapPinElement.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.utils.KEYCODE_ENTER) {
        pinListenerHandler(pin);
      }
    });

    return mapPinElement;
  };

  var pinListenerHandler = function (dataPin) {
    if (document.querySelector('.map__card')) {
      window.card.removeCard();
    }
    window.card.renderCard(dataPin);
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
