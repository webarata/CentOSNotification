var CentOSNotif = CentOSNotif || {};

(function() {
  'use strict';

  var MONTH_NAME = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // 当日から、検索するURLを決定する
  var today = new Date();
  var dateUrl = today.getFullYear() + '-' + MONTH_NAME[today.getMonth()] + '/date.html';
  CentOSNotif.url = 'https://lists.centos.org/pipermail/centos-announce/' + dateUrl;

  /**
   * 文字列の中の特定の文字列の出現数をカウントする
   * @param text 対象の文字列
   * @param str カウントする文字列
   * @returns {number} 出現数
   */
  CentOSNotif.countString = function(text, str) {
    var count = text.length;
    return (count - text.replace(new RegExp(str, 'g'), '').length) / str.length;
  };

  /**
   * YYYYMM形式の文字列を返す
   * @param date 対象となる日付
   * @returns {string} YYYYMM形式の文字列
   */
  CentOSNotif.getYearMohth = function(date) {
    var month = date.getMonth() + 1;
    return date.getFullYear().toString() + (month < 10 ? '0' + month : month);
  };

  /**
   * 汎用的なAjaxのGETリクエスト
   * @param url アクセスするURL
   * @param doneCallBack Ajaxの成功の時のコールバック
   * @param failCallBack Ajaxの失敗の時のコールバック
   */
  CentOSNotif.ajax = function(url, doneCallBack, failCallBack) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(data) {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          doneCallBack(xhr.responseText);
        } else {
          failCallBack(xhr.statusText);
        }
      }
    };
    xhr.onerror = function(e) {
      failCallBack(xhr.statusText);
    };

    xhr.open('GET', url, true);
    xhr.send();
  };

  CentOSNotif.formatDate = function(date) {
    return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate() + ' ' +
        date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
  };
})();
