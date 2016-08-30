var CentOSNotif = CentOSNotif || {};

(function() {
  'use strict';

  CentOSNotif.loadCriticalCount = function() {
    return localStorage.criticalCount || 0;
  };

  CentOSNotif.loadImportantCount = function() {
    return localStorage.importantCount || 0;
  };

  CentOSNotif.loadModerateCount = function() {
    return localStorage.moderateCount || 0;
  };

  CentOSNotif.saveStatus = function(status) {
    localStorage.criticalCount = status.counts[0];
    localStorage.importantCount = status.counts[1];
    localStorage.moderateCount = status.counts[2];
    localStorage.lastUpdateMonth = status.lastUpdateMonth;
  };

  CentOSNotif.loadStatus = function() {
    const criticalCount = localStorage.criticalCount || 0;
    const importantCount = localStorage.importantCount || 0;
    const moderateCount = localStorage.moderateCount || 0;
    const lastUpdateMonth = localStorage.lastUpdateMonth || '0';

    return {
      counts: [criticalCount, importantCount, moderateCount],
      lastUpdateMonth: lastUpdateMonth
    };
  };

  // options
  CentOSNotif.saveLastUpdateDate = function(lastUpdateDate) {
    localStorage.lastUpdateDate = lastUpdateDate;
  };

  CentOSNotif.loadLastUpdateDate = function() {
    const lastUpdateDate = localStorage.lastUpdateDate;
    return lastUpdateDate ? lastUpdateDate : '-';
  };

  CentOSNotif.saveNotification = function(notification) {
    localStorage.notification = notification;
  };

  CentOSNotif.loadNotification = function() {
    return localStorage.notification;
  };

  CentOSNotif.saveHighlight = function(highlight) {
    localStorage.highlight = highlight;
  };

  CentOSNotif.loadHighlight = function() {
    return localStorage.highlight;
  };

  CentOSNotif.saveIntervalMinute = function(intervalMinute) {
    localStorage.intervalMinute = intervalMinute;
    chrome.runtime.sendMessage({
      "method": "changeIntervalMinute",
      "intervalMinute": intervalMinute
    });
  };

  CentOSNotif.loadIntervalMinute = function() {
    return localStorage.intervalMinute;
  };
})();
