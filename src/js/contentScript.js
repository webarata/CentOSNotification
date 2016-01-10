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
chrome.runtime.sendMessage({method: 'getHighlight'}, function(response) {
  if (response.highlight != null && response.highlight === 'true') {
    var html = document.getElementsByTagName('body')[0].innerHTML;

    html = html.replace(/Moderate/g, '<span style="color: black;">Moderate</span>');
    html = html.replace(/Important/g, '<span style="color: red;">Important</span>');
    html = html.replace(/Critical/g, '<span style="color: red; background-color: yellow;">Critical</span>');

    document.getElementsByTagName('body')[0].innerHTML = html;
  }
});
