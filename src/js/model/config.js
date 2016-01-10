var CentOS = CentOS || {};

(function() {
  'use strict';

  CentOS.getCriticalCount = function() {
    return localStorage['criticalCount'] || 0;
  };

  CentOS.getImportantCount = function() {
    return localStorage['importantCount'] || 0;
  };

  CentOS.getModerateCount = function() {
    return localStorage['moderateCount'] || 0;
  };
})();
