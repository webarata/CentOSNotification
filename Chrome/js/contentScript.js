var CentOSNotif = CentOSNotif || {};

(function() {
  'use strict';

  const replaceAll = (str, pattern, color, backgroundColor) => {
    let replacement = '<span style="color: ' + color + ';';
    if (backgroundColor) {
      replacement = replacement + ' background-color: ' + backgroundColor + ';';
    }
    replacement = replacement + '">' + pattern + '</span>';

    return str.replace(new RegExp(pattern, 'g'), replacement);
  };

  chrome.runtime.sendMessage({method: 'getHighlight'}, response => {
    if (response.highlight !== undefined && response.highlight === 'true') {
      let html = document.getElementsByTagName('body')[0].innerHTML;

      html = replaceAll(html, 'Moderate', 'black');
      html = replaceAll(html, 'Important', 'red');
      html = replaceAll(html, 'Critical', 'red', 'yellow');

      document.getElementsByTagName('body')[0].innerHTML = html;
    }
  });
})();
