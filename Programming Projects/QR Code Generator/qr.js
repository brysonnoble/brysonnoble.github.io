// Byte Mode: 0100
// Character Count: Versions 1-9: 8 bits, Versions 10-40: 16 bits
// Encoded Data: convert to ISO 8859-1, then to binary

// change between versions depending on character count
function versionCheck () {
  const charCount = document.getElementById("QRString").value.length;
  
  if (charCount <= 17) {
    document.getElementById("QRCharCount").innerHTML = generateCharCount(1, charCount);
  } else if (charCount <= 32) {
    document.getElementById("QRCharCount").innerHTML = generateCharCount(2, charCount);
  } else if (charCount <= 53) {
    document.getElementById("QRCharCount").innerHTML = generateCharCount(3, charCount);
  } else if (charCount <= 78) {
    document.getElementById("QRCharCount").innerHTML = generateCharCount(4, charCount);
  } else if (charCount <= 106) {
    document.getElementById("QRCharCount").innerHTML = generateCharCount(5, charCount);
  } else if (charCount <= 134) {
    document.getElementById("QRCharCount").innerHTML = generateCharCount(6, charCount);
  } else if (charCount <= 154) {
    document.getElementById("QRCharCount").innerHTML = generateCharCount(7, charCount);
  } else if (charCount <= 192) {
    document.getElementById("QRCharCount").innerHTML = generateCharCount(8, charCount);
  } else if (charCount <= 230) {
    document.getElementById("QRCharCount").innerHTML = generateCharCount(9, charCount);
  } else if (charCount <= 271) {
    document.getElementById("QRCharCount").innerHTML = generateCharCount(10, charCount);
  } else if (charCount <= 321) {
    document.getElementById("QRCharCount").innerHTML = generateCharCount(11, charCount);
  } else if (charCount <= 367) {
    document.getElementById("QRCharCount").innerHTML = generateCharCount(12, charCount);
  } else if (charCount <= 425) {
    document.getElementById("QRCharCount").innerHTML = generateCharCount(13, charCount);
  } else if (charCount <= 458) {
    document.getElementById("QRCharCount").innerHTML = generateCharCount(14, charCount);
  } else if (charCount <= 520) {
    document.getElementById("QRCharCount").innerHTML = generateCharCount(15, charCount);
  } else if (charCount <= 586) {
    document.getElementById("QRCharCount").innerHTML = generateCharCount(16, charCount);
  } else if (charCount <= 644) {
    document.getElementById("QRCharCount").innerHTML = generateCharCount(17, charCount);
  } else if (charCount <= 718) {
    document.getElementById("QRCharCount").innerHTML = generateCharCount(18, charCount);
  } else if (charCount <= 792) {
    document.getElementById("QRCharCount").innerHTML = generateCharCount(19, charCount);
  } else if (charCount <= 858) {
    document.getElementById("QRCharCount").innerHTML = generateCharCount(20, charCount);
  } else if (charCount <= 929) {
    document.getElementById("QRCharCount").innerHTML = generateCharCount(21, charCount);
  } else if (charCount <= 1003) {
    document.getElementById("QRCharCount").innerHTML = generateCharCount(22, charCount);
  } else if (charCount <= 1091) {
    document.getElementById("QRCharCount").innerHTML = generateCharCount(23, charCount);
  } else if (charCount <= 1171) {
    document.getElementById("QRCharCount").innerHTML = generateCharCount(24, charCount);
  } else if (charCount <= 1273) {
    document.getElementById("QRCharCount").innerHTML = generateCharCount(25, charCount);
  } else if (charCount <= 1367) {
    document.getElementById("QRCharCount").innerHTML = generateCharCount(26, charCount);
  } else if (charCount <= 1465) {
    document.getElementById("QRCharCount").innerHTML = generateCharCount(27, charCount);
  } else if (charCount <= 1528) {
    document.getElementById("QRCharCount").innerHTML = generateCharCount(28, charCount);
  } else if (charCount <= 1628) {
    document.getElementById("QRCharCount").innerHTML = generateCharCount(29, charCount);
  } else if (charCount <= 1732) {
    document.getElementById("QRCharCount").innerHTML = generateCharCount(30, charCount);
  } else if (charCount <= 1840) {
    document.getElementById("QRCharCount").innerHTML = generateCharCount(31, charCount);
  } else if (charCount <= 1952) {
    document.getElementById("QRCharCount").innerHTML = generateCharCount(32, charCount);
  } else if (charCount <= 2068) {
    document.getElementById("QRCharCount").innerHTML = generateCharCount(33, charCount);
  } else if (charCount <= 2188) {
    document.getElementById("QRCharCount").innerHTML = generateCharCount(34, charCount);
  } else if (charCount <= 2303) {
    document.getElementById("QRCharCount").innerHTML = generateCharCount(35, charCount);
  } else if (charCount <= 2431) {
    document.getElementById("QRCharCount").innerHTML = generateCharCount(36, charCount);
  } else if (charCount <= 2563) {
    document.getElementById("QRCharCount").innerHTML = generateCharCount(37, charCount);
  } else if (charCount <= 2699) {
    document.getElementById("QRCharCount").innerHTML = generateCharCount(38, charCount);
  } else if (charCount <= 2809) {
    document.getElementById("QRCharCount").innerHTML = generateCharCount(39, charCount);
  } else if (charCount <= 2953) {
    document.getElementById("QRCharCount").innerHTML = generateCharCount(40, charCount);
  } else {
    alert('invalid number of characters');
  }

  encode();
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

// convert input to binary
function encode () {
  const str = document.getElementById("QRString").value;
  let output = document.getElementById("QRData");
  output.value = "";
  for (let i = 0; i < str.length; i++) {
      output.value += str[i].charCodeAt(0).toString(2) + " ";
  }
}
