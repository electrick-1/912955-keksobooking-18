'use strict';

(function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapPins = document.querySelector('.map__pins');

  var createMapPin = function (pin) {
    var mapPinElement = pinTemplate.cloneNode(true);
    mapPinElement.style.left = pin.location.x - window.utils.PIN.WIDTH / 2 + 'px';
    mapPinElement.style.top = pin.location.y - window.utils.PIN.HEIGHT + 'px';
    mapPinElement.querySelector('img').src = pin.author.avatar;
    mapPinElement.querySelector('img').alt = pin.offer.title;

    mapPinElement.addEventListener('click', function (evt) {
      pinListenerHandler(pin);
      evt.currentTarget.classList.add('map__pin--active');
    });

    mapPinElement.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.utils.KEYCODE_ENTER) {
        pinListenerHandler(pin);
        evt.currentTarget.classList.add('map__pin--active');
      }
    });

    return mapPinElement;
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

  var pinListenerHandler = function (dataPin) {
    if (document.querySelector('.map__card')) {
      window.card.removeCard();
    }
    window.card.renderCard(dataPin);
  };

  window.pin = {
    renderPins: renderPins,
    removePins: removePins,
  };
})();
