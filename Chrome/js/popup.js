var CentOSNotif = CentOSNotif || {};

(function() {
  'use strict';

  document.getElementById('newUrl').setAttribute('href', CentOSNotif.url);

  document.getElementById('lastUpdateDate').innerText = CentOSNotif.loadLastUpdateDate();

  document.getElementById('critical').innerText = CentOSNotif.loadCriticalCount();
  document.getElementById('important').innerText = CentOSNotif.loadImportantCount();
  document.getElementById('moderate').innerText = CentOSNotif.loadModerateCount();
})();
