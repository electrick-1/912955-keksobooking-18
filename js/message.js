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

    document.addEventListener('click', function () {
      success.remove();
    });
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.utils.KEYCODE_ENTER) {
        success.remove();
      }
    });
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
    document.addEventListener('click', function () {
      error.remove();
    });
    errorButton.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.utils.KEYCODE_ENTER) {
        error.remove();
      }
    });
  };

  window.message = {
    successHandler: successHandler,
    errorHandler: errorHandler
  };
})();
