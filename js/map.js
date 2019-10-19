'use strict';

(function () {
  var mapPinMain = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var createPinAddress = adForm.querySelector('#address');
  var fieldsetArray = adForm.querySelectorAll('fieldset');

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

  var successHandler = function (pins) {
    window.pin.renderPins(pins);
  };

  var errorHandler = function (message) {
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var error = errorTemplate.cloneNode(true);
    var errorMessage = error.querySelector('.error__message');
    errorMessage.innerText = message;
    error.style = 'z-index: 100;';
    error.style.position = 'absolute';
    window.utils.main.insertAdjacentElement('afterbegin', error);

    var errorButton = error.querySelector('.error__button');
    errorButton.addEventListener('click', function () {
      error.remove();
    });
    errorButton.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.utils.KEYCODE_ENTER) {
        error.remove();
      }
    });
  };

  var activePage = function () {
    window.load(successHandler, errorHandler);
    removeDisabledAttribute();
    setAddress();
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
