var adoptNowButtonEl = document.querySelector('#adopt-now');
var aboutUsButtonEl = document.querySelector('#about-us');
var contactUsButtonEl = document.querySelector('#contact-us');

var switchAboutUs = function (event) {
    var aboutUsButtonEl = event.target.setAttribute(document.location.replace('./about-us.html'));
  }
  
  var switchContactUs = function (event) {
    var contactUsButtonEl = event.target.setAttribute(document.location.replace('./contact-us.html'));
  }
  
  var switchAdoptNow = function (event) {
    var adoptNowButtonEl = event.target.setAttribute(document.location.replace('./index.html'));
  }
  
  aboutUsButtonEl.addEventListener('click', switchAboutUs);
  adoptNowEl.addEventListener('click', switchAdoptNow);
  contactUsButtonEl.addEventListener('click', switchContactUs);
  