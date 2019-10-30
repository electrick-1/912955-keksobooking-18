'use strict';

(function () {
  var PIN_COUNT = 5;
  var count;
  var housingType;
  var housingTypeSelect = document.querySelector('#housing-type');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapPins = document.querySelector('.map__pins');
  var data = [];
  var dataArray = [];

  var createMapPin = function (pin) {
    var mapPinElement = pinTemplate.cloneNode(true);
    mapPinElement.style.left = pin.location.x + 'px';
    mapPinElement.style.top = pin.location.y + 'px';
    mapPinElement.querySelector('img').src = pin.author.avatar;
    mapPinElement.querySelector('img').alt = pin.offer.title;

    return mapPinElement;
  };

  var remove = function () {
    var toRemove = document.querySelectorAll('.map__pin');
    for (var d = 1; d < toRemove.length; d++) {
      toRemove[d].remove();
    }
  };

  var render = function (arr) {
    if (arr.length < PIN_COUNT) {
      count = arr.length;
    } else {
      count = PIN_COUNT;
    }

    for (var j = 0; j < count; j++) {
      mapPins.appendChild(createMapPin(arr[j]));
    }
  };

  var renderForAny = function (pins) {
    remove();
    render(pins);
  };

  var renderForType = function (pins, type) {
    dataArray = [];
    remove();
    for (var i = 0; i < pins.length; i++) {
      if (pins[i].offer.type === type) {
        dataArray.push(pins[i]);
      }
    }
    render(dataArray);
  };

  var renderPins = function (dataPin) {
    renderForAny(dataPin);
    housingTypeSelect.addEventListener('change', function (evt) {
      housingType = evt.target.value;
      data = dataPin.filter(function (it) {
        return it.offer.type === housingType;
      });
      if (housingType === 'any') {
        renderForAny(dataPin);
      } else {
        renderForType(data, housingType);
      }
    });
  };

  window.pin = {
    renderPins: renderPins
  };
})();
