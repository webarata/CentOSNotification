document.getElementById('newUrl').setAttribute('href', url);

document.getElementById('critical').innerText = CentOS.getCriticalCount();
document.getElementById('important').innerText = CentOS.getImportantCount();
document.getElementById('moderate').innerText = CentOS.getModerateCount();
