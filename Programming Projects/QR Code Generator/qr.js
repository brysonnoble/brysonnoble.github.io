// Byte Mode: 0100
// Character Count: Versions 1-9: 8 bits, Versions 10-40: 16 bits
// Encoded Data: convert to ISO 8859-1, then to binary

// change between versions depending on character count
function versionCheck () {
  const charCount = document.getElementById("QRString").value.length;
  
  if (charCount <= 17) {
    const version = 1;
  } else if (charCount <= 32) {
    const version = 2;
  } else if (charCount <= 53) {
    const version = 3;
  } else if (charCount <= 78) {
    const version = 4;
  } else if (charCount <= 106) {
    const version = 5;
  } else if (charCount <= 134) {
    const version = 6;
  } else if (charCount <= 154) {
    const version = 7;
  } else if (charCount <= 192) {
    const version = 8;
  } else if (charCount <= 230) {
    const version = 9;
  } else if (charCount <= 271) {
    const version = 10;
  } else if (charCount <= 321) {
    const version = 11;
  } else if (charCount <= 367) {
    const version = 12;
  } else if (charCount <= 425) {
    const version = 13;
  } else if (charCount <= 458) {
    const version = 14;
  } else if (charCount <= 520) {
    const version = 15;
  } else if (charCount <= 586) {
    const version = 16;
  } else if (charCount <= 644) {
    const version = 17;
  } else if (charCount <= 718) {
    const version = 18;
  } else if (charCount <= 792) {
    const version = 19;
  } else if (charCount <= 858) {
    const version = 20;
  } else if (charCount <= 929) {
    const version = 21;
  } else if (charCount <= 1003) {
    const version = 22;
  } else if (charCount <= 1091) {
    const version = 23;
  } else if (charCount <= 1171) {
    const version = 24;
  } else if (charCount <= 1273) {
    const version = 25;
  } else if (charCount <= 1367) {
    const version = 26;
  } else if (charCount <= 1465) {
    const version = 27;
  } else if (charCount <= 1528) {
    const version = 28;
  } else if (charCount <= 1628) {
    const version = 29;
  } else if (charCount <= 1732) {
    const version = 30;
  } else if (charCount <= 1840) {
    const version = 31;
  } else if (charCount <= 1952) {
    const version = 32;
  } else if (charCount <= 2068) {
    const version = 33;
  } else if (charCount <= 2188) {
    const version = 34;
  } else if (charCount <= 2303) {
    const version = 35;
  } else if (charCount <= 2431) {
    const version = 36;
  } else if (charCount <= 2563) {
    const version = 37;
  } else if (charCount <= 2699) {
    const version = 38;
  } else if (charCount <= 2809) {
    const version = 39;
  } else if (charCount <= 2953) {
    const version = 40;
  } else {
    alert('invalid number of characters');
  }

  document.getElementById("QRCharCount").innerHTML = generateCharCount(version, charCount);
  document.getElementById("QRData").innerHTML = encode();
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
  let output = "";
  for (let i = 0; i < str.length; i++) {
      output += str[i].charCodeAt(0).toString(2) + " ";
  }
  return output;
}
