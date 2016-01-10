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
  localstorage['highlight'] = false;
});

var intervalMinute = document.getElementById('intervalMinute');

intervalMinute.addEventListener('input', function() {
  this.value = this.value.replace(/[^0-9]/, '');
  localStorage['intervalMinute'] = this.value === '' ? 60 : this.value;
});

document.body.onload = function() {
  localStorage['notification'] === 'true' ? notification[0].checked = true : notification[1].checked = true;
  localStorage['highlight'] === 'true' ? highlight[0].checked = true : highlight[1].checked = true;
  intervalMinute.value = localStorage['intervalMinute'] == null ? 60 : localStorage['intervalMinute'];
};
