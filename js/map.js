'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var createPinAddress = adForm.querySelector('#address');
  var mapFilters = document.querySelector('.map__filters');
  var fieldsetArray = adForm.querySelectorAll('fieldset');
  var data = [];

  var successHandler = function (pins) {
    window.data = pins;
    window.pin.renderPins(window.filter.getAllFilter(pins));
  };

  var mapFiltersDisabled = function () {
    for (var i = 0; i < fieldsetArray.length; i++) {
      fieldsetArray[i].setAttribute('disabled', true);
    }
    for (var j = 0; j < mapFilters.children.length; j++) {
      mapFilters.children[j].setAttribute('disabled', true);
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
    createPinAddress.value = (Math.floor(mapPinMain.offsetTop + window.utils.MAIN_PIN.HEIGHT)) +
                              'px , ' +
                              Math.floor((mapPinMain.offsetLeft + window.utils.MAIN_PIN.WIDTH / 2)) +
                              'px';
    createPinAddress.setAttribute('readonly', true);
  };

  var activePage = function () {
    window.load(successHandler, window.form.errorHandler);
    mapPinMain.addEventListener('mousedown', onMouseDown);
    removeDisabledAttribute();
    setAddress();
  };

  mapPinMain.addEventListener('mousedown', activePage);

  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.utils.KEYCODE_ENTER) {
      activePage();
    }
  });

  var onMouseDown = function (downEvt) {
    downEvt.preventDefault();
    mapPinMain.removeEventListener('mousedown', activePage);

    var startCoords = {
      x: downEvt.clientX,
      y: downEvt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      var newTopCoord = mapPinMain.offsetTop - shift.y;
      var newLeftCoord = mapPinMain.offsetLeft - shift.x;

      if (newTopCoord < window.utils.NEW_COORD.MIN_Y) {
        newTopCoord = window.utils.NEW_COORD.MIN_Y;
      } else if (newTopCoord > window.utils.NEW_COORD.MAX_Y) {
        newTopCoord = window.utils.NEW_COORD.MAX_Y;
      } else {
        newTopCoord = mapPinMain.offsetTop - shift.y;
      }

      if (newLeftCoord < window.utils.NEW_COORD.MIN_X) {
        newLeftCoord = window.utils.NEW_COORD.MIN_X;
      } else if (newLeftCoord > window.utils.NEW_COORD.MAX_X) {
        newLeftCoord = window.utils.NEW_COORD.MAX_X;
      } else {
        newLeftCoord = mapPinMain.offsetLeft - shift.x;
      }

      mapPinMain.style.top = newTopCoord + 'px';
      mapPinMain.style.left = newLeftCoord + 'px';

      setAddress();
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      setAddress();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (evt) {
          evt.preventDefault();
          mapPinMain.removeEventListener('click', onClickPreventDefault);
        };
        mapPinMain.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  var formReset = function () {
    window.form.form.reset();
    window.pin.removePins();
    mapFilters.reset();
    if (document.querySelector('.map__card')) {
      window.card.removeCard();
    }
    mapPinMain.style.top = window.utils.MAIN_PIN.TOP + 'px';
    mapPinMain.style.left = window.utils.MAIN_PIN.LEFT + 'px';
    setAddress();
    adForm.classList.add('ad-form--disabled');
    map.classList.add('map--faded');
    mapPinMain.removeEventListener('mousedown', onMouseDown);
    mapPinMain.addEventListener('mousedown', activePage);
  };

  window.map = {
    map: map,
    data: data,
    mapFilters: mapFilters,
    mapPinMain: mapPinMain,
    setAddress: setAddress,
    formReset: formReset
  };
})();
