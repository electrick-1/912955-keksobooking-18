'use strict';

(function () {
  var main = document.querySelector('main');

  var generateRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  var generateRandomLength = function (arr) {
    var array = [];
    var arrayQuantity = generateRandomNumber(0, arr.length - 1);
    for (var i = 0; i < arrayQuantity; i++) {
      array.push(arr[i]);
    }
    return array;
  };

  window.utils = {
    KEYCODE_ENTER: 13,
    KEYCODE_ESC: 27,
    MAIN_PIN: {
      WIDTH: 65,
      HEIGHT: 80
    },
    PIN: {
      WIDTH: 50,
      HEIGHT: 70
    },
    NEW_COORD: {
      MIN_X: 0,
      MAX_X: 1135,
      MIN_Y: 130,
      MAX_Y: 630
    },
    generateRandomNumber: generateRandomNumber,
    generateRandomLength: generateRandomLength,
    main: main
  };
})();
