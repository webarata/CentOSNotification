var notification = document.getElementsByName('notification');

notification[0].addEventListener('change', function() {
  localStorage['notification'] = 'true';
});

notification[1].addEventListener('change', function() {
  localStorage['notification'] = 'false';
});

document.body.onload = function() {
  localStorage['notification'] === 'true' ? notification[0].checked = true : notification[1].checked = true;
};
