'use strict';

(function () {
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');

  var roomValues = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0]
  };

  var capacityOptions = capacity.querySelectorAll('option');

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
})();
