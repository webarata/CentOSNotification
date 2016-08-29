var CentOSNotif = CentOSNotif || {};

(function() {
  'use strict';

  var notification = document.getElementsByName('notification');

  notification[0].addEventListener('change', function() {
    CentOSNotif.saveNotification('true');
  });

  notification[1].addEventListener('change', function() {
    CentOSNotif.saveNotification('false');
  });

  var highlight = document.getElementsByName('highlight');

  highlight[0].addEventListener('change', function() {
    CentOSNotif.saveHighlight('true');
  });

  highlight[1].addEventListener('change', function() {
    CentOSNotif.saveHighlight('false');
  });

  var intervalMinute = document.getElementById('intervalMinute');

  intervalMinute.addEventListener('input', function() {
    this.value = this.value.replace(/[^0-9]/, '');
    CentOSNotif.saveIntervalMinute(this.value === '' ? 60 : this.value);
  });

  document.body.onload = function() {
    CentOSNotif.saveNotification('true' ? notification[0].checked = true : notification[1].checked = true);
    CentOSNotif.saveHighlight('true' ? highlight[0].checked = true : highlight[1].checked = true);
    intervalMinute.value = CentOSNotif.loadIntervalMinute() == null ? 60 : CentOSNotif.loadIntervalMinute();
  };
})();
