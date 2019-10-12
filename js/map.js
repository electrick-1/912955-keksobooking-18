'use strict';

(function () {
  var mapPinMain = document.querySelector('.map__pin--main');
  var createPinAddress = window.utils.adForm.querySelector('#address');
  var fieldsetArray = window.utils.adForm.querySelectorAll('fieldset');

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
    window.pin.renderPins(window.data.data);
  };

  mapPinMain.addEventListener('mousedown', function () {
    activePage();
  });

  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.utils.KEYCODE_ENTER) {
      activePage();
    }
  });
})();
