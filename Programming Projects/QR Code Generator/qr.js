// Byte Mode: 0100
// Character Count: Versions 1-9: 8 bits, Versions 10-40: 16 bits
// Encoded Data: convert to ISO 8859-1, then to binary

// change between versions depending on character count
function versionCheck () {
  const charCount = document.getElementById("QRString").value.length;
  
  if (charCount <= 17) {
    alert(generateCharCount(1, charCount));
  } else if (charCount <= 32) {
    alert(generateCharCount(2, charCount));
  } else if (charCount <= 53) {
    alert(generateCharCount(3, charCount));
  } else if (charCount <= 78) {
    alert(generateCharCount(4, charCount));
  } else if (charCount <= 106) {
    alert(generateCharCount(5, charCount));
  } else if (charCount <= 134) {
    alert(generateCharCount(6, charCount));
  } else if (charCount <= 154) {
    alert(generateCharCount(7, charCount));
  } else if (charCount <= 192) {
    alert(generateCharCount(8, charCount));
  } else if (charCount <= 230) {
    alert(generateCharCount(9, charCount));
  } else if (charCount <= 271) {
    alert(generateCharCount(10, charCount));
  } else if (charCount <= 321) {
    alert(generateCharCount(11, charCount));
  } else if (charCount <= 367) {
    alert(generateCharCount(12, charCount));
  } else if (charCount <= 425) {
    alert(generateCharCount(13, charCount));
  } else if (charCount <= 458) {
    alert(generateCharCount(14, charCount));
  } else if (charCount <= 520) {
    alert(generateCharCount(15, charCount));
  } else if (charCount <= 586) {
    alert(generateCharCount(16, charCount));
  } else if (charCount <= 644) {
    alert(generateCharCount(17, charCount));
  } else if (charCount <= 718) {
    alert(generateCharCount(18, charCount));
  } else if (charCount <= 792) {
    alert(generateCharCount(19, charCount));
  } else if (charCount <= 858) {
    alert(generateCharCount(20, charCount));
  } else if (charCount <= 929) {
    alert(generateCharCount(21, charCount));
  } else if (charCount <= 1003) {
    alert(generateCharCount(22, charCount));
  } else if (charCount <= 1091) {
    alert(generateCharCount(23, charCount));
  } else if (charCount <= 1171) {
    alert(generateCharCount(24, charCount));
  } else if (charCount <= 1273) {
    alert(generateCharCount(25, charCount));
  } else if (charCount <= 1367) {
    alert(generateCharCount(26, charCount));
  } else if (charCount <= 1465) {
    alert(generateCharCount(27, charCount));
  } else if (charCount <= 1528) {
    alert(generateCharCount(28, charCount));
  } else if (charCount <= 1628) {
    alert(generateCharCount(29, charCount));
  } else if (charCount <= 1732) {
    alert(generateCharCount(30, charCount));
  } else if (charCount <= 1840) {
    alert(generateCharCount(31, charCount));
  } else if (charCount <= 1952) {
    alert(generateCharCount(32, charCount));
  } else if (charCount <= 2068) {
    alert(generateCharCount(33, charCount));
  } else if (charCount <= 2188) {
    alert(generateCharCount(34, charCount));
  } else if (charCount <= 2303) {
    alert(generateCharCount(35, charCount));
  } else if (charCount <= 2431) {
    alert(generateCharCount(36, charCount));
  } else if (charCount <= 2563) {
    alert(generateCharCount(37, charCount));
  } else if (charCount <= 2699) {
    alert(generateCharCount(38, charCount));
  } else if (charCount <= 2809) {
    alert(generateCharCount(39, charCount));
  } else if (charCount <= 2953) {
    alert(generateCharCount(40, charCount));
  } else {
    alert('invalid number of characters');
  }
}

// generate binary character count
function generateCharCount (version, charCount) {
  if (version > 9) {
    return pad(charCount.toString(2), 16);
  }
  return pad(charCount.toString(2), 8);
}

// add leading zeros
function pad (n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}
