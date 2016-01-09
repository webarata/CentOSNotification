var notification = document.getElementsByName('notification');

notification[0].addEventListener('change', function() {
  localStorage['notification'] = 'true';
});

notification[1].addEventListener('change', function() {
  localStorage['notification'] = 'false';
});

var highlight = document.getElementsByName('highlight');

highlight[0].addEventListener('change', function() {
  localStorage['highlight'] = true;
});

highlight[1].addEventListener('change', function() {
  localStorage['highlight'] = false;
});

document.body.onload = function() {
  localStorage['notification'] === 'true' ? notification[0].checked = true : notification[1].checked = true;
  localStorage['highlight'] === 'true' ? highlight[0].checked = true : highlight[1].checked = true;
};
