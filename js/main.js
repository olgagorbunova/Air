/*Olga Gorbunova
olgo1700
olgo1700@student.miun.se
*/

//Script detects user's webbrowser and updates a html tag with result
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
