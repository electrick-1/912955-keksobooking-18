'use strict';

(function () {
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');
  var capacityOptions = capacity.querySelectorAll('option');
  var type = document.querySelector('#type');
  var price = document.querySelector('#price');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');

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


  // var checkType = function () {
  //   switch (type.value) {
  //     case 'bungalo':
  //       price.min = 0;
  //       price.placeholder = 0;
  //       break;
  //     case 'flat':
  //       price.min = 1000;
  //       price.placeholder = 1000;
  //       break;
  //     case 'house':
  //       price.min = 5000;
  //       price.placeholder = 5000;
  //       break;
  //     case 'palace':
  //       price.min = 10000;
  //       price.placeholder = 10000;
  //       break;
  //   }
  // };

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
})();
