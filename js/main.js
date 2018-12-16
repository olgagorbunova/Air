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

/*BOOKING.HTML methods*/
var seats; //array of seats

var oldSeat = null; //used by chooseSeat() method

//draws table with airplane seats, assigns current seat states("free", "looking", "busy") and class("business" or "economy");
function loadSeats() {

  if(!sessionStorage.getItem("bookedSeats")) {
    var seatsRows = new Array(3).fill("free"); //two-dimentional array with seats
    seats = new Array(6).fill(seatsRows);
    sessionStorage.setItem("seatsUpd", JSON.stringify(seats));
  }
  seats = JSON.parse(sessionStorage.getItem("seatsUpd"));

  var abc = ["A", "B", "C"]; //seat letters
  var rows = 6; //nr of rows
  var cols = 3; //nr of columns
  var business = 2; //nr of business class rows

  var table = document.getElementById("myTable");
  var caption = document.createElement("caption");
  caption.appendChild(document.createTextNode("First " + business + " rows are Business class"));
  table.appendChild(caption);

  var tbody = document.getElementById("tablebody");

  for(var i = 0; i < rows; i++) {
    var row = document.createElement("tr");
    for(var j = 0; j < cols; ++j) {
      var text = (i + 1) + abc[j]; //seat number to display in the cell
      var cell = document.createElement("td");
      cell.appendChild(document.createTextNode(text));
      var state = seats[i][j]; //get seat state from seats array
      cell.setAttribute("id", j);
      cell.setAttribute("class", state);
      //add info about class in a "title" attribute
      if(i < business) {
        cell.setAttribute("title", "Business");
      }
      else {
        cell.setAttribute("title", "Economy");
      }
      row.setAttribute("id", i);
      row.appendChild(cell);
    }
    tbody.appendChild(row);
  }
  document.getElementById("tablebody").addEventListener("click", chooseSeat, false);
}

//Handles choosing of seat. Controls that a chosen seat is free; allows only one seat to be chosen at a time; updates Class and Seat information for the booking.
function chooseSeat(e) {
  if(e.target.tagName.toLowerCase() == "td") {

    if(e.target.getAttribute("class") == "free") {
      //if this is not the first time seat is chosen
      if(oldSeat != null) {
        oldSeat.setAttribute("class", "free");
      }
      e.target.setAttribute("class", "looking");
      oldSeat = e.target;

      //update booking form
      var seatClass = e.target.getAttribute("title");
      var seatNr = e.target.innerHTML;
      document.getElementById("class").setAttribute("value", seatClass);
      document.getElementById("seatnr").setAttribute("value", seatNr);
      }
      else if(e.target.getAttribute("class") == "busy") {
      alert("This seat is already booked");
    }
  }
}

//Makes a form field read only (necessary because html "readonly" attribute does not work with "required" attribute)
function readOnly(element_id) {
  document.getElementById(element_id).blur();
}

//Stores form entries in sessionStorage
function storeFormEntry(id) {
  var item = document.getElementById(id);
  sessionStorage.setItem(id, item.value);
}

//Saves information about a newly-booked sear to sessionStorage; removes input data stored in sessionStorage. Calls printPass().
function submitForm() {
  var columnIdx = oldSeat.getAttribute("id");
  var rowIdx = oldSeat.parentNode.getAttribute("id");
  seats[rowIdx][columnIdx] = "busy";

  if(!sessionStorage.getItem("bookedSeats")) {
    sessionStorage.setItem("bookedSeats", true);
  }
  sessionStorage.setItem("seatsUpd", JSON.stringify(seats));

  sessionStorage.setItem("class", document.getElementById("class").value);
  sessionStorage.setItem("seatnr", document.getElementById("seatnr").value);

  printPass();
}

//Opens a printable boarding pass in a new window. Removes booking data from sessionStorage.
function printPass() {
  var windowFeatures = "resizable=no,scrollable=no,width=900,height=450";

  var passWindow = window.open("", '_blank', windowFeatures);

  var type = "<!DOCTYPE html>";
  var head = "<head><meta charset='utf-8'><title>Bookings</title><link rel='stylesheet' href='css/style.css'></head>";

  var name = sessionStorage.getItem("name") + " " + sessionStorage.getItem("lastname");
  var persnr = sessionStorage.getItem("persnr");
  var seat = sessionStorage.getItem("seatnr");
  var clas = sessionStorage.getItem("class");
  var printBtn = "<input type='button' onClick='window.print()' value='Print'/>";

  var section = "<section id='pass'><h2>Boarding Pass</h2><h3>Passenger name: " + name + "</h3><h3>Pers. Nr: " + persnr + "</h3><h3>Seat: " + seat + "</h3><h4>" + clas +  " class</h4></section>";
  var body = "<body id='boardingPass'>" + section + printBtn + "</body><footer></footer></html>";
  passWindow.document.write(type + "<html>" + head + body);

  sessionStorage.removeItem("name");
  sessionStorage.removeItem("lastname");
  sessionStorage.removeItem("persnr");
  sessionStorage.removeItem("class");
  sessionStorage.removeItem("seatnr");
}

//Cancells last viewed seat if form is reset; removes input data stored in sessionStorage
function resetForm() {
  if(oldSeat != null) {
    oldSeat.setAttribute("class", "free");
  }
  document.getElementById("class").setAttribute("value", "");
  document.getElementById("seatnr").setAttribute("value", "");

  sessionStorage.removeItem("name");
  sessionStorage.removeItem("lastname");
  sessionStorage.removeItem("persnr");
}

/*COMMON START METHOD*/
//Registers event listeners / calls methods based on current location
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
  else if (myLocation == 'booking.html') {
    loadSeats();

    //event listeners for making some fields readonly
    var classBtn = document.forms["myForm"]["class"];
    var seatBtn = document.forms["myForm"]["seatnr"];
    classBtn.addEventListener("focus", function() {readOnly("class");}, false);
    seatBtn.addEventListener("focus", function() {readOnly("seatnr");}, false);

    //submit and reset event listeners
    var form = document.getElementById("myForm");
    form.addEventListener("submit", submitForm, false);
    form.addEventListener("reset", resetForm, false);

    //Event listeners to autosave entered data
    var nameField = document.forms["myForm"]["name"];
    nameField.addEventListener("change", function() {storeFormEntry("name");}, false);
    var lastNameField = document.forms["myForm"]["lastname"];
    lastNameField.addEventListener("change", function() {storeFormEntry("lastname");}, false);
    var persNrField = document.forms["myForm"]["persnr"];
    persNrField.addEventListener("change", function() {storeFormEntry("persnr");}, false);

    //sets autosaved values when page is reloaded
    nameField.value = sessionStorage.getItem("name");
    lastNameField.value = sessionStorage.getItem("lastname");
    persNrField.value = sessionStorage.getItem("persnr");
  }
}

window.addEventListener("load", start, false);
