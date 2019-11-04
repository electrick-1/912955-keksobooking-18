'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var createPinAddress = adForm.querySelector('#address');
  var mapFilters = document.querySelector('.map__filters');
  var fieldsetArray = adForm.querySelectorAll('fieldset');
  var data = [];

  var mapFiltersDisabled = function () {
    for (var i = 0; i < mapFilters.children.length; i++) {
      mapFilters.children[i].setAttribute('disabled', true);
    }
  };
  mapFiltersDisabled();

  var removeDisabledAttribute = function () {
    for (var i = 0; i < fieldsetArray.length; i++) {
      fieldsetArray[i].removeAttribute('disabled', true);
    }
    for (var j = 0; j < mapFilters.children.length; j++) {
      mapFilters.children[j].removeAttribute('disabled', true);
    }
    adForm.classList.remove('ad-form--disabled');
    map.classList.remove('map--faded');
  };

  var setAddress = function () {
    createPinAddress.value = mapPinMain.style.top + ', ' + mapPinMain.style.left;
    createPinAddress.setAttribute('readonly', true);
  };

  var successHandler = function (pins) {
    window.data = pins;
    window.pin.renderPins(window.filter.getAllFilter(pins));
    window.card.createCardElement(pins[5]);
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

  window.map = {
    map: map,
    data: data,
    mapFilters: mapFilters
  };
})();
