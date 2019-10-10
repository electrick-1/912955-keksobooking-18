'use strict';

(function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapPins = document.querySelector('.map__pins');
  var createPinAddress = window.util.adForm.querySelector('#address');
  var fieldsetArray = window.util.adForm.querySelectorAll('fieldset');

  var createMapPin = function (pin) {
    var mapPinElement = pinTemplate.cloneNode(true);
    mapPinElement.style.left = pin.location.x + 'px';
    mapPinElement.style.top = pin.location.y + 'px';
    mapPinElement.querySelector('img').src = pin.author.avatar;
    mapPinElement.querySelector('img').alt = pin.offer.title;

    return mapPinElement;
  };

  var renderPins = function (dataPin) {
    dataPin.forEach(function (it) {
      mapPins.appendChild(createMapPin(it));
    });
  };

  var removeDisabledAttribute = function () {
    for (var i = 0; i < fieldsetArray.length; i++) {
      fieldsetArray[i].removeAttribute('disabled', true);
    }
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');
    document.querySelector('.map').classList.remove('map--faded');
  };

  var setAddress = function () {
    createPinAddress.value = mapPinMain.style.top + ', ' + mapPinMain.style.left;
    createPinAddress.setAttribute('readonly', true);
  };

  var activePage = function () {
    removeDisabledAttribute();
    setAddress();
    renderPins(window.data.data);
  };

  mapPinMain.addEventListener('mousedown', function () {
    activePage();
  });

  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.KEYCODE_ENTER) {
      activePage();
    }
  });
})();
