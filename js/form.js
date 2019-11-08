'use strict';

(function () {
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');
  var capacityOptions = capacity.querySelectorAll('option');
  var type = document.querySelector('#type');
  var price = document.querySelector('#price');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var form = document.querySelector('.ad-form');

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

  form.addEventListener('submit', function (evt) {
    window.save(new FormData(form), function () {
      form.reset();
      window.pin.removePins();
      if (document.querySelector('.map__card')) {
        window.card.removeCard();
      }
      window.map.mapPinMain.style.top = window.utils.MAIN_PIN.TOP + 'px';
      window.map.mapPinMain.style.left = window.utils.MAIN_PIN.LEFT + 'px';
      window.map.setAddress();
      window.message.successHandler('Данные отправлены');
    });
    evt.preventDefault();
  });
})();
