chrome.runtime.sendMessage({method: 'getHighlight'}, function(response) {
  if (response.highlight != null && response.highlight === 'true') {
    var html = document.getElementsByTagName('body')[0].innerHTML;

    html = html.replace(/Moderate/g, '<span style="color: black;">Moderate</span>');
    html = html.replace(/Important/g, '<span style="color: red;">Important</span>');
    html = html.replace(/Critical/g, '<span style="color: red; background-color: yellow;">Critical</span>');

    document.getElementsByTagName('body')[0].innerHTML = html;
  }
});
