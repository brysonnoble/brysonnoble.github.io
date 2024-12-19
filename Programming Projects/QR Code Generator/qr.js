// Byte Mode: 0100
// Character Count: Versions 1-9: 8 bits, Versions 10-40: 16 bits
// Encoded Data: convert to ISO 8859-1, then to binary

// change between versions depending on character count
function versionCheck () {
  if (document.getElementById("QRString").value.length <= 17) {
    alert('version 1');
  } else if (document.getElementById("QRString").value.length <= 32) {
    alert('version 2');
  } else if (document.getElementById("QRString").value.length <= 53) {
    alert('version 3');
  } else if (document.getElementById("QRString").value.length <= 78) {
    alert('version 4');
  } else if (document.getElementById("QRString").value.length <= 106) {
    alert('version 5');
  } else if (document.getElementById("QRString").value.length <= 134) {
    alert('version 6');
  } else if (document.getElementById("QRString").value.length <= 154) {
    alert('version 7');
  } else if (document.getElementById("QRString").value.length <= 192) {
    alert('version 8');
  } else if (document.getElementById("QRString").value.length <= 230) {
    alert('version 9');
  } else if (document.getElementById("QRString").value.length <= 271) {
    alert('version 10');
  } else if (document.getElementById("QRString").value.length <= 321) {
    alert('version 11');
  } else if (document.getElementById("QRString").value.length <= 367) {
    alert('version 12');
  } else if (document.getElementById("QRString").value.length <= 425) {
    alert('version 13');
  } else if (document.getElementById("QRString").value.length <= 458) {
    alert('version 14');
  } else if (document.getElementById("QRString").value.length <= 520) {
    alert('version 15');
  } else if (document.getElementById("QRString").value.length <= 586) {
    alert('version 16');
  } else if (document.getElementById("QRString").value.length <= 644) {
    alert('version 17');
  } else if (document.getElementById("QRString").value.length <= 718) {
    alert('version 18');
  } else if (document.getElementById("QRString").value.length <= 792) {
    alert('version 19');
  } else if (document.getElementById("QRString").value.length <= 858) {
    alert('version 20');
  } else if (document.getElementById("QRString").value.length <= 929) {
    alert('version 21');
  } else if (document.getElementById("QRString").value.length <= 1003) {
    alert('version 22');
  } else if (document.getElementById("QRString").value.length <= 1091) {
    alert('version 23');
  } else if (document.getElementById("QRString").value.length <= 1171) {
    alert('version 24');
  } else if (document.getElementById("QRString").value.length <= 1273) {
    alert('version 25');
  } else if (document.getElementById("QRString").value.length <= 1367) {
    alert('version 26');
  } else if (document.getElementById("QRString").value.length <= 1465) {
    alert('version 27');
  } else if (document.getElementById("QRString").value.length <= 1528) {
    alert('version 28');
  } else if (document.getElementById("QRString").value.length <= 1628) {
    alert('version 29');
  } else if (document.getElementById("QRString").value.length <= 1732) {
    alert('version 30');
  } else if (document.getElementById("QRString").value.length <= 1840) {
    alert('version 31');
  } else if (document.getElementById("QRString").value.length <= 1952) {
    alert('version 32');
  } else if (document.getElementById("QRString").value.length <= 2068) {
    alert('version 33');
  } else if (document.getElementById("QRString").value.length <= 2188) {
    alert('version 34');
  } else if (document.getElementById("QRString").value.length <= 2303) {
    alert('version 35');
  } else if (document.getElementById("QRString").value.length <= 2431) {
    alert('version 36');
  } else if (document.getElementById("QRString").value.length <= 2563) {
    alert('version 37');
  } else if (document.getElementById("QRString").value.length <= 2699) {
    alert('version 38');
  } else if (document.getElementById("QRString").value.length <= 2809) {
    alert('version 39');
  } else if (document.getElementById("QRString").value.length <= 2953) {
    alert('version 40');
  } else {
    alert('invalid number of characters');
  }
}
