/*
 * Copyright 2016 Shinichi ARATA
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var CentOSNotif = CentOSNotif || {};

(function() {
  'use strict';

  CentOSNotif.loadCriticalCount = function() {
    return localStorage['criticalCount'] || 0;
  };

  CentOSNotif.loadImportantCount = function() {
    return localStorage['importantCount'] || 0;
  };

  CentOSNotif.loadModerateCount = function() {
    return localStorage['moderateCount'] || 0;
  };

  CentOSNotif.saveStatus = function(status) {
    localStorage['criticalCount'] = status.counts[0];
    localStorage['importantCount'] = status.counts[1];
    localStorage['moderateCount'] = status.counts[2];
    localStorage['lastUpdateMonth'] = status.lastUpdateMonth;
  };
})();
