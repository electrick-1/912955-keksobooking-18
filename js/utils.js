'use strict';

(function () {
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
    generateRandomNumber: generateRandomNumber,
    generateRandomLength: generateRandomLength,
    adForm: document.querySelector('.ad-form'),
    roomNumber: document.querySelector('#room_number'),
    capacity: document.querySelector('#capacity')
  };
})();
