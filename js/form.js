'use strict';

(function () {
  var roomValues = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0]
  };

  var capacityOptions = window.utils.capacity.querySelectorAll('option');

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

  window.utils.roomNumber.addEventListener('change', function (evt) {
    checkRoom(evt.target.value);
  });

  checkRoom(1);
})();
