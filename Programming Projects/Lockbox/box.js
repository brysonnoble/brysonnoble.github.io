function encrypt() {
  const key = document.getElementById("key").value;
  var passwords = document.getElementById("passwords").value.replace(/\r\n/g,"\n").split("\n");

  alert(key);
  alert(passwords);

  // document.getElementById("passwords").value = whatever
}

function decrypt() {

}
