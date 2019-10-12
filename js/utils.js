'use strict';

(function () {
  window.utils = {
    KEYCODE_ENTER: 13,
    generateRandomNumber: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    generateRandomLength: function (arr) {
      var array = [];
      var arrayQuantity = this.generateRandomNumber(0, arr.length - 1);
      for (var i = 0; i < arrayQuantity; i++) {
        array.push(arr[i]);
      }
      return array;
    },
    adForm: document.querySelector('.ad-form'),
    roomNumber: document.querySelector('#room_number'),
    capacity: document.querySelector('#capacity')
  };
})();
