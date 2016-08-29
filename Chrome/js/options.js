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
