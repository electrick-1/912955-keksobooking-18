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
    generateRandomNumber: generateRandomNumber,
    generateRandomLength: generateRandomLength,
    main: main
  };
})();
