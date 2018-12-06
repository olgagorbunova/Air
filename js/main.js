/*Olga Gorbunova
olgo1700
olgo1700@student.miun.se
*/

/*COMMON METHODS*/
//Detects current location and returns characters after last '/' as string
function detectLocation() {
  var pathArray = window.location.pathname.split('/');
  return pathArray[pathArray.length-1];
}

/*CONTACT.HTML methods*/
//Detects user's webbrowser and updates a html tag with result
function detectBrowser() {
  let browserDetector = navigator.userAgent;
  let browserName;

  if (browserDetector.indexOf("Firefox") != -1) {
       browserName = "Mozilla Firefox";
  }
  else if (browserDetector.indexOf("Opera") != -1) {
       browserName = "Opera";
  }
  else if (browserDetector.indexOf("Trident") != -1) {
       browserName = "Microsoft Internet Explorer";
  }
  else if (browserDetector.indexOf("Edge") != -1) {
       browserName = "Microsoft Edge";
  }
  else if (browserDetector.indexOf("Chrome") != -1) {
      browserName = "Google Chrome or Chromium";
  }
  else if (browserDetector.indexOf("Safari") != -1) {
      browserName = "Apple Safari";
  }
  else {
      browserName = "unable to detect";
  }
  document.getElementById("browser").textContent = "Browser used: " + browserName;
}

/*EMPLOYESS.HTML methods*/
var imgNr; //image number argument for a showLargeImg

function showLargeImg(imgNr) {
  var largeImg = document.getElementById("pilotLarge");
  largeImg.src = "img/pilot" + imgNr + ".jpg";
}

/*COMMON START METHOD*/
//Registers event listeners / calls methods based on curremt location
function start() {

var myLocation = detectLocation();

  if (myLocation == 'employees.html') {
    var img1thumb  = document.getElementById("pilot1");
    img1thumb.addEventListener("click", function() {showLargeImg(1);}, false);
    var img2thumb  = document.getElementById("pilot2");
    img2thumb.addEventListener("click", function() {showLargeImg(2);}, false);
    var img3thumb  = document.getElementById("pilot3");
    img3thumb.addEventListener("click", function() {showLargeImg(3);}, false);
    var img4thumb  = document.getElementById("pilot4");
    img4thumb.addEventListener("click", function() {showLargeImg(4);}, false);
  }
  else if (myLocation == 'contact.html') {
    detectBrowser();
  }
}

window.addEventListener("load", start, false);
