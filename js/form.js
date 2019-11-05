'use strict';

(function () {
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');
  var capacityOptions = capacity.querySelectorAll('option');

  var roomValues = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0]
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

  checkRoom(1);

  var type = document.querySelector('#type');
  var price = document.querySelector('#price');

  var checkType = function () {
    switch (type.value) {
      case 'bungalo':
        price.min = 0;
        price.placeholder = 0;
        break;
      case 'flat':
        price.min = 1000;
        price.placeholder = 1000;
        break;
      case 'house':
        price.min = 5000;
        price.placeholder = 5000;
        break;
      case 'palace':
        price.min = 10000;
        price.placeholder = 10000;
        break;
    }
  };

  type.addEventListener('change', function () {
    checkType();
  });

  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var timeInOptions = timeIn.querySelectorAll('option');
  var timeOutOptions = timeOut.querySelectorAll('option');

  var timeValues = ['12:00', '13:00', '14:00'];

  var checkTimeIn = function () {
    timeValues.forEach(function (it) {
      if (timeIn.value === it) {
        timeOutOptions.forEach(function (option) {
          if (option.value === it) {
            option.selected = true;
          }
        });
      }
    });
  };

  var checkTimeOut = function () {
    timeValues.forEach(function (it) {
      if (timeOut.value === it) {
        timeInOptions.forEach(function (option) {
          if (option.value === it) {
            option.selected = true;
          }
        });
      }
    });
  };

  timeIn.addEventListener('change', function () {
    checkTimeIn();
  });
  timeOut.addEventListener('change', function () {
    checkTimeOut();
  });

})();
