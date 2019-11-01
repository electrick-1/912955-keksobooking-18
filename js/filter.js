'use strict';

(function () {
  var PIN_COUNT = 5;
  var housingType = document.querySelector('#housing-type');

  var getHousingType = function (obj) {
    return housingType.value === 'any' ? true : housingType.value === obj.offer.type;
  };

  var getAllFilter = function (data) {
    return data.filter(function (obj) {
      return getHousingType(obj);
    }).slice(0, PIN_COUNT);
  };

  var changeHousingHandler = function () {
    window.pin.removePins();
    window.pin.renderPins(getAllFilter(window.data));
  };

  window.map.mapFilters.addEventListener('change', changeHousingHandler);

  window.filter = {
    getAllFilter: getAllFilter
  };
})();
