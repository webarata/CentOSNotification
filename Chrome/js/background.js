var CentOSNotif = CentOSNotif || {};

(function() {
  'use strict';

  const CHECK_SITE_ALARM_NAME = 'CHECK_SITE';

  function getStatus(responseText) {
    const criticalCount = CentOSNotif.countString(responseText, 'Critical');
    const importantCount = CentOSNotif.countString(responseText, 'Important');
    const moderateCount = CentOSNotif.countString(responseText, 'Moderate');

    const lastUpdateMonth = CentOSNotif.getYearMohth(new Date());

    return {
      counts: [criticalCount, importantCount, moderateCount],
      lastUpdateMonth: lastUpdateMonth
    };
  }

  function equalStatus(status1, status2) {
    if (status1.lastUpdateMonth !== status2.lastUpdateMonth) {
      for (let i = 0; i < status2.counts.length; i++) {
        if (status2.counts[i] > 0) {
          return false;
        }
      }
      return true;
    }
    for (let i = 0; i < status1.counts.length; i++) {
      if (status1.counts[i].toString() !== status2.counts[i].toString()) {
        return false;
      }
    }
    return true;
  }


  function checkStatus() {
    CentOSNotif.saveLastUpdateDate(CentOSNotif.formatDate(new Date()));
    CentOSNotif.ajax(CentOSNotif.url, (responseText) => {
      const status = getStatus(responseText);

      if (equalStatus(CentOSNotif.loadStatus(), status)) {
        chrome.browserAction.setBadgeBackgroundColor({color: '#0000ff'});
      } else {
        if (CentOSNotif.loadNotification() === 'true') {
          new Notification('重要な更新があります', {
            tag: 'tag', body: 'CentOSにCriticalもしくはImportantの更新が追加されました。', icon: '/image/icon64.png'
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
  }

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.method === 'getHighlight') {
      sendResponse({highlight: CentOSNotif.loadHighlight()});
    } else if (message.method === 'changeIntervalMinute') {
      setCheckSiteInterval(Number.parseInt(message.intervalMinute, 10));
    }
  });

  function getIntervalMinute() {
    let intervalMinute = CentOSNotif.loadIntervalMinute() || '60';
    if (intervalMinute === undefined || intervalMinute.match(/[^0-9]+/)) {
      intervalMinute = 60;
    }

    return parseInt(intervalMinute, 10);
  }

  chrome.runtime.onInstalled.addListener(() => {
    checkStatus();

    const minute = getIntervalMinute();
    setCheckSiteInterval(getIntervalMinute());
  });

  function alarmCallback(alarm) {
    if (alarm.name === CHECK_SITE_ALARM_NAME) {
      checkStatus();
    }
  }

  // 指定の時間のたびに、新規の情報がないか確認する
  function setCheckSiteInterval(minute) {
    chrome.alarms.clear(CHECK_SITE_ALARM_NAME);
    chrome.alarms.onAlarm.removeListener(alarmCallback);

    chrome.alarms.create(CHECK_SITE_ALARM_NAME, {delayInMinutes: minute, periodInMinutes: minute});
    chrome.alarms.onAlarm.addListener(alarmCallback);
  }
})();
