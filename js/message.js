'use strict';

(function () {
  var successHandler = function (message) {
    var successTemplate = document.querySelector('#success').content.querySelector('.success');
    var success = successTemplate.cloneNode(true);
    var successMessage = success.querySelector('.success__message');
    successMessage.innerText = message;
    success.style = 'z-index: 100;';
    success.style.position = 'absolute';
    window.utils.main.insertAdjacentElement('afterbegin', success);

    success.addEventListener('click', function () {
      successRemove();
    });

    var onPressEscButton = function (evt) {
      if (evt.keyCode === window.utils.KEYCODE_ESC) {
        successRemove();
      }
    };

    document.addEventListener('keydown', onPressEscButton);

    var successRemove = function () {
      success.remove();
      document.removeEventListener('keydown', onPressEscButton);
    };
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

    var onPressEscButton = function (evt) {
      if (evt.keyCode === window.utils.KEYCODE_ESC) {
        errorRemove();
      }
    };

    document.addEventListener('keydown', onPressEscButton);

    var errorRemove = function () {
      error.remove();
      document.removeEventListener('keydown', onPressEscButton);
    };
  };

  window.message = {
    successHandler: successHandler,
    errorHandler: errorHandler
  };
})();
