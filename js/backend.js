'use strict';

(function () {
  var loadURL = 'https://js.dump.academy/keksobooking/data';
  var saveURL = 'https://js.dump.academy/keksobooking';

  window.load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.open('GET', loadURL);
    xhr.send();
  };

  window.save = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responceType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.open('POST', saveURL);
    xhr.send(data);
  };
})();
