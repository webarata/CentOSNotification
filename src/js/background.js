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

  var getStatus = function(responseText) {
    var criticalCount = CentOSNotif.countString(responseText, 'Critical');
    var importantCount = CentOSNotif.countString(responseText, 'Important');
    var moderateCount = CentOSNotif.countString(responseText, 'Moderate');

    var lastUpdateMonth = CentOSNotif.getYearMohth(new Date());

    return {
      counts: [criticalCount, importantCount, moderateCount],
      lastUpdateMonth: lastUpdateMonth
    };
  };

  var equalStatus = function(status1, status2) {
    var i;
    if (status1.lastUpdateMonth !== status2.lastUpdateMonth) {
      for (i = 0; i < status2.counts.length; i++) {
        if (status2.counts[i] > 0) {
          return false;
        }
      }
      return true;
    }
    for (i = 0; i < status1.counts.length; i++) {
      if (status1.counts[i].toString() !== status2.counts[i].toString()) {
        return false;
      }
    }
    return true;
  };

  var getData = function() {
    CentOSNotif.ajax(CentOSNotif.url, function(responseText) {
      var status = getStatus(responseText);

      if (equalStatus(CentOSNotif.loadStatus(), status)) {
        chrome.browserAction.setBadgeBackgroundColor({color: '#0000ff'});
      } else {
        if (CentOSNotif.loadNotification() === 'true') {
          new Notification('重要な更新があります', {
            tag: 'tag', body: 'CentOSにCriticalもしくはImportantの更新が追加されました。', icon: '/src//image/icon64.png'
          });
        }
        chrome.browserAction.setBadgeBackgroundColor({color: '#ff0000'});
      }

      CentOSNotif.saveStatus(status);

      chrome.browserAction.setBadgeText({text: (status.counts[0] + status.counts[1]).toString()});
    }, function(statusText) {
      chrome.browserAction.setBadgeText({text: '-'});
      chrome.browserAction.setBadgeBackgroundColor({color: [0, 0, 0, 100]});
    });
  };

  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.method === 'getHighlight') {
      sendResponse({highlight: CentOSNotif.loadHighlight()});
    } else {
      sendResponse({});
    }
  });

  var getIntervalMinute = function() {
    var intervalMinute = CentOSNotif.loadIntervalMinute() || '60';
    if (intervalMinute == null || intervalMinute.match(/[^0-9]+/)) {
      intervalMinute = 60;
    }

    return parseInt(intervalMinute, 10);
  };

  getData();

  var timer;
  var minute;
  setInterval(function() {
    if (timer == null) {
      minute = getIntervalMinute();
      timer = setInterval(getData, minute * 60 * 1000);
    }
    if (minute !== getIntervalMinute()) {
      timer.clear();
      minute = getIntervalMinute();
      timer = setInterval(getData, minute * 60 * 1000);
    }
  }, 10 * 1000);
})();
