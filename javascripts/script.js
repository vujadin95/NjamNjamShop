function onload() {
  getTime();

  changePicture(1);
}

function getTime() {
  var today = new Date();
  document.getElementById("time").innerHTML =
    addZero(today.getHours()) +
    ":" +
    addZero(today.getMinutes()) +
    ":" +
    addZero(today.getSeconds());
  setTimeout("getTime()", 500);
}

function addZero(i) {
  if (i < 10) i = "0" + i;
  return i;
}

function changePicture(x) {
  if (x === 4 || x === undefined) x = 1;

  var img = document.getElementById("headerImage");
  img.src = "images/header" + x + ".jpg";
  x++;

  setTimeout(function () {
    changePicture(x);
  }, 5000);
}

function loadXML() {
  if (window.XMLHttpRequest) {
    // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
  } else {
    // code for IE6, IE5
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }

  xmlhttp.open("GET", "data/info.xml", false);
  xmlhttp.send();
  xmlDoc = xmlhttp.responseXML;

  niz = xmlDoc.getElementsByTagName("post");

  showAbout();
}

function showAbout() {
  text = "<table class='about'><tr>";
  for (var i = 0, max = 3; i < max; i++) {
    header = niz[i].getElementsByTagName("header")[0].firstChild.nodeValue;
    text += "<th>" + header + "</th>";
  }
  text += "</tr><tr>";

  for (var i = 0, max = 3; i < max; i++) {
    description =
      niz[i].getElementsByTagName("description")[0].firstChild.nodeValue;
    text += "<td>" + description + "</td>";
  }
  text += "</tr></table>";

  document.getElementById("aboutXml").innerHTML += text;
}

function init_map() {
  var myOptions = {
    zoom: 17,
    center: new google.maps.LatLng(44.017936103171, 20.908006834918194),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  };
  map = new google.maps.Map(document.getElementById("googleMap"), myOptions);
  marker = new google.maps.Marker({
    map: map,
    position: new google.maps.LatLng(44.017936103171, 20.908006834918194),
  });
  infowindow = new google.maps.InfoWindow({
    content: "Radoja Domanovića 12, 34000 Kragujevac<br>",
  });
  google.maps.event.addListener(marker, "click", function () {
    infowindow.open(map, marker);
  });
  infowindow.open(map, marker);
}
google.maps.event.addDomListener(window, "load", init_map);
