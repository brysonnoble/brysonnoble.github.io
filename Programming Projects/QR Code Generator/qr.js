// Byte Mode: 0100
// Character Count: Versions 1-9: 8 bits, Versions 10-40: 16 bits
// Encoded Data: convert to ISO 8859-1, then to binary

// change between versions depending on character count
function versionCheck () {
  const charCount = document.getElementById("QRString").value.length;
  
  if (charCount <= 17) {
    alert(generateCharCount(1, charCount));
  } else if (charCount <= 32) {
    alert('version 2');
  } else if (charCount <= 53) {
    alert('version 3');
  } else if (charCount <= 78) {
    alert('version 4');
  } else if (charCount <= 106) {
    alert('version 5');
  } else if (charCount <= 134) {
    alert('version 6');
  } else if (charCount <= 154) {
    alert('version 7');
  } else if (charCount <= 192) {
    alert('version 8');
  } else if (charCount <= 230) {
    alert('version 9');
  } else if (charCount <= 271) {
    alert('version 10');
  } else if (charCount <= 321) {
    alert('version 11');
  } else if (charCount <= 367) {
    alert('version 12');
  } else if (charCount <= 425) {
    alert('version 13');
  } else if (charCount <= 458) {
    alert('version 14');
  } else if (charCount <= 520) {
    alert('version 15');
  } else if (charCount <= 586) {
    alert('version 16');
  } else if (charCount <= 644) {
    alert('version 17');
  } else if (charCount <= 718) {
    alert('version 18');
  } else if (charCount <= 792) {
    alert('version 19');
  } else if (charCount <= 858) {
    alert('version 20');
  } else if (charCount <= 929) {
    alert('version 21');
  } else if (charCount <= 1003) {
    alert('version 22');
  } else if (charCount <= 1091) {
    alert('version 23');
  } else if (charCount <= 1171) {
    alert('version 24');
  } else if (charCount <= 1273) {
    alert('version 25');
  } else if (charCount <= 1367) {
    alert('version 26');
  } else if (charCount <= 1465) {
    alert('version 27');
  } else if (charCount <= 1528) {
    alert('version 28');
  } else if (charCount <= 1628) {
    alert('version 29');
  } else if (charCount <= 1732) {
    alert('version 30');
  } else if (charCount <= 1840) {
    alert('version 31');
  } else if (charCount <= 1952) {
    alert('version 32');
  } else if (charCount <= 2068) {
    alert('version 33');
  } else if (charCount <= 2188) {
    alert('version 34');
  } else if (charCount <= 2303) {
    alert('version 35');
  } else if (charCount <= 2431) {
    alert('version 36');
  } else if (charCount <= 2563) {
    alert('version 37');
  } else if (charCount <= 2699) {
    alert('version 38');
  } else if (charCount <= 2809) {
    alert('version 39');
  } else if (charCount <= 2953) {
    alert('version 40');
  } else {
    alert('invalid number of characters');
  }
}

// generate binary character count
function generateCharCount (version, charCount) {
  if (version > 9) {
    return charCount.toString(2);
  }
  return charCount.toString(2);
}
