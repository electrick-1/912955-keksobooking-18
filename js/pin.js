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

  window.pin = {
    renderPins: renderPins,
    removePins: removePins
  };
})();
