var password = "No pain no gain";
password = password.toUpperCase();

var fails = 0;
var password1 = "";

for (var i = 0; i < password.length; i++) {
  if (password.charAt(i) == " ") password1 = password1 + " ";
  else password1 = password1 + "-";
}

function writePassword() {
  document.getElementById("passwordHangman").innerHTML = password1;
}

window.onload = start;


var letters = new Array(35);

letters = ["A", "Ą", "B", "C", "Ć", "D", "E", "Ę", "F", "G", "H", "I", "J", "K", "L", "Ł", "M", "N", "Ń", "O", "Ó", "P", "Q", "R", "S", "Ś", "T", "U", "V", "W", "X", "Y", "Z", "Ż", "Ź"];

function start() {
  var divContent = "";

  for (i = 0; i <= 34; i++) {
    var element = "let" + i;
    divContent = divContent + '<div class="letter" onclick="check(' + i + ')" id="' + element + '">' + letters[i] + '</div>';
    if ((i + 1) % 7 == 0) divContent = divContent + '<div style="clear:both;"></div>'
  }

  document.getElementById("alphabet").innerHTML = divContent;

  writePassword();
}

String.prototype.setSign = function(place, sign) {
  if (place > this.length - 1) return this.toString();
  else {
    return this.substr(0, place) + sign + this.substr(place + 1);
  }
}

function check(nr) {

  var letterInPassword = false;

  for (var i = 0; i < password.length; i++) {
    if (password.charAt(i) == letters[nr]) {
      password1 = password1.setSign(i, letters[nr]);
      letterInPassword = true;
    }
  }

  if (letterInPassword == true) {
    var element = "let" + nr;
    document.getElementById(element).style.background = "#003300";
    document.getElementById(element).style.color = "#00C000";
    document.getElementById(element).style.border = "3px solid #00C000";
    document.getElementById(element).style.cursor = "default";

    writePassword();
  } else {
    var element = "let" + nr;
    document.getElementById(element).style.background = "#330000";
    document.getElementById(element).style.color = "#C00000";
    document.getElementById(element).style.border = "3px solid #C00000";
    document.getElementById(element).style.cursor = "default";
    // Turn off onclick after fail.
    document.getElementById(element).setAttribute("onclick", ";");

    // How many fails, image change
    fails++;
    var image = "images/hangman/s" + fails + ".jpg";
    document.getElementById("hangman").innerHTML = '<img src="' + image + '" alt="" />';
  }

  // WINNER
  if (password == password1)
    document.getElementById("alphabet").innerHTML = "Good job, that is it!: " + '<br/><br/>' + "\"" + password + "\"" + '<br/><br/><span class="reset" onclick="location.reload()">ONE MORE TIME ? </span>';

  // LOST
  if (fails >= 9)
  document.getElementById("alphabet").innerHTML = "Sorry.. but YOU ARE A LOOSER!! ^^ " + '<br/><br/>' + "The password was: \"" + password + "\"" + '<br/><br/><span class="reset" onclick="location.reload()">ONE MORE TIME ? </span>';


writePassword();
}
