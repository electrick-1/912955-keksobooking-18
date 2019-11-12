'use strict';

(function () {
  var PIN_COUNT = 5;
  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var housingFeatures = document.querySelectorAll('.map__checkbox');

  var PriceType = {
    LOW: 'low',
    MIDDLE: 'middle',
    HIGH: 'high',
    MIN: 10000,
    MAX: 50000
  };

  var getHousingType = function (obj) {
    return housingType.value === 'any' ? true : housingType.value === obj.offer.type;
  };

  var getHousingPrice = function (obj) {
    switch (housingPrice.value) {
      case PriceType.LOW: return obj.offer.price <= PriceType.MIN;
      case PriceType.MIDDLE: return obj.offer.price >= PriceType.MIN && obj.offer.price <= PriceType.MAX;
      case PriceType.HIGH: return obj.offer.price >= PriceType.MAX;
      default: return true;
    }
  };

  var getHousingRooms = function (obj) {
    return housingRooms.value === 'any' ? true : Number(housingRooms.value) === obj.offer.rooms;
  };

  var getHousingGuests = function (obj) {
    return housingGuests.value === 'any' ? true : Number(housingGuests.value) === obj.offer.guests;
  };

  var getHousingFeatures = function (obj) {
    return Array.from(housingFeatures).filter(function (element) {
      return element.checked;
    }).map(function (element) {
      return element.value;
    }).every(function (feature) {
      return obj.offer.features.includes(feature);
    });
  };

  var getAllFilter = function (data) {
    return data.filter(function (obj) {
      return getHousingType(obj) &&
             getHousingPrice(obj) &&
             getHousingRooms(obj) &&
             getHousingGuests(obj) &&
             getHousingFeatures(obj);
    }).slice(0, PIN_COUNT);
  };

  var changeHousingHandler = window.debounce(function () {
    window.pin.removePins();
    if (document.querySelector('.map__card')) {
      window.card.removeCard();
    }
    window.pin.renderPins(getAllFilter(window.data));
  });

  getHousingFeatures();

  window.map.mapFilters.addEventListener('change', changeHousingHandler);

  window.filter = {
    getAllFilter: getAllFilter
  };
})();
