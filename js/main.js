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
//Displays large image accessed with help of arguments that create it's name ("<content><nr>.jpg")
var imgNr, imgName;

function showLargeImg(imgNr, imgName) {
  var largeImg = document.getElementById("imgLarge");
  largeImg.src = "img/" + imgName + imgNr + ".jpg";
}

/*COMMON START METHOD*/
//Registers event listeners / calls methods based on curremt location
function start() {
var myLocation = detectLocation();

  if (myLocation == 'employees.html' || myLocation == 'ourfleet.html') {
    var imgContent; //
      if (myLocation == 'employees.html') {
        imgContent = "pilot";
      }
      else if (myLocation == 'ourfleet.html') {
        imgContent = "plane";
      }
    //css currently allows up to 8 images for the photobooks, therefore loop limited to 8
    for(let i = 1; i <= 8; i++) {
      var imgThumb  = document.getElementById("imgsmall" + i);
      imgThumb.addEventListener("click", function() {showLargeImg(i, imgContent);}, false);
    }
  }
  else if (myLocation == 'contact.html') {
    detectBrowser();
  }
}

window.addEventListener("load", start, false);
