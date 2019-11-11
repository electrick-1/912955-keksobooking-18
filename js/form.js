'use strict';

(function () {
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');
  var capacityOptions = capacity.querySelectorAll('option');
  var type = document.querySelector('#type');
  var price = document.querySelector('#price');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var form = document.querySelector('.ad-form');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var success = successTemplate.cloneNode(true);
  var error = errorTemplate.cloneNode(true);
  var errorButton = error.querySelector('.error__button');

  var roomValues = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0]
  };

  var typeValues = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  var checkRoom = function (value) {
    capacityOptions.forEach(function (opt) {
      opt.disabled = true;
    });
    roomValues[value].forEach(function (it) {
      capacityOptions.forEach(function (option) {
        if (Number(option.value) === it) {
          option.disabled = false;
          option.selected = true;
        }
      });
    });
  };

  roomNumber.addEventListener('change', function (evt) {
    checkRoom(evt.target.value);
  });

  type.addEventListener('change', function () {
    price.placeholder = typeValues[type.value];
    price.min = typeValues[type.value];
  });

  timeIn.addEventListener('change', function () {
    timeOut.value = timeIn.value;
  });

  timeOut.addEventListener('change', function () {
    timeIn.value = timeOut.value;
  });

  checkRoom(1);

  var onEscErrorScreen = function (evt) {
    if (evt.keyCode === window.utils.KEYCODE_ESC) {
      errorRemove();
    }
  };

  var errorRemove = function () {
    error.remove();
    document.removeEventListener('keydown', onEscErrorScreen);
  };

  var onEscsSuccessScreen = function (evt) {
    if (evt.keyCode === window.utils.KEYCODE_ESC) {
      successRemove();
    }
  };

  var successRemove = function () {
    success.remove();
    document.removeEventListener('keydown', onEscsSuccessScreen);
  };

  var successHandler = function () {
    window.map.formReset();
    window.utils.main.insertAdjacentElement('afterbegin', success);

    success.addEventListener('click', function () {
      successRemove();
    });

    document.addEventListener('keydown', onEscsSuccessScreen);
  };

  var errorHandler = function (errorMessage) {
    error.querySelector('.error__message').textContent = errorMessage;
    window.utils.main.insertAdjacentElement('afterbegin', error);

    errorButton.addEventListener('click', function () {
      errorRemove();
    });

    errorButton.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.utils.KEYCODE_ENTER) {
        errorRemove();
      }
    });

    error.addEventListener('click', function () {
      errorRemove();
    });

    document.addEventListener('keydown', onEscErrorScreen);
  };

  form.addEventListener('submit', function (evt) {
    window.save(new FormData(form), successHandler, errorHandler);
    evt.preventDefault();
  });

  window.form = {
    errorHandler: errorHandler,
    form: form
  };
})();
