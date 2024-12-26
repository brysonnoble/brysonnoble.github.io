/*
Byte Mode: 0100
Character Count: Versions 1-9: 8 bits, Versions 10-40: 16 bits
Encoded Data: convert to ISO 8859-1, then to binary
Required Bits: version max * 8
Size: (((V-1)*4)+21)
Finder Patterns: (0, 0) ([(((V-1)*4)+21) - 7], 0) (0,[(((V-1)*4)+21) - 7])
*/

// calls all functions to update qr
function dynamic () {
  const input = document.getElementById("QRString").value;
  
  document.getElementById("QRCharCount").innerHTML = generateCharCount(versionCheck(input.length), input.length);
  document.getElementById("QRData").innerHTML = encode(input);
  resize(versionCheck(input.length), dataToArray(encode(input), versionCheck(input.length)));
  functionPatterns(input, versionCheck(input.length));
}

// change between versions depending on character count
function versionCheck (charCount) {
  let version = 0;
  
  if (charCount <= 17) {
    version = 1;
  } else if (charCount <= 32) {
    version = 2;
  } else if (charCount <= 53) {
    version = 3;
  } else if (charCount <= 78) {
    version = 4;
  } else if (charCount <= 106) {
    version = 5;
  } else if (charCount <= 134) {
    version = 6;
  } else if (charCount <= 154) {
    version = 7;
  } else if (charCount <= 192) {
    version = 8;
  } else if (charCount <= 230) {
    version = 9;
  } else if (charCount <= 271) {
    version = 10;
  } else if (charCount <= 321) {
    version = 11;
  } else if (charCount <= 367) {
    version = 12;
  } else if (charCount <= 425) {
    version = 13;
  } else if (charCount <= 458) {
    version = 14;
  } else if (charCount <= 520) {
    version = 15;
  } else if (charCount <= 586) {
    version = 16;
  } else if (charCount <= 644) {
    version = 17;
  } else if (charCount <= 718) {
    version = 18;
  } else if (charCount <= 792) {
    version = 19;
  } else if (charCount <= 858) {
    version = 20;
  } else if (charCount <= 929) {
    version = 21;
  } else if (charCount <= 1003) {
    version = 22;
  } else if (charCount <= 1091) {
    version = 23;
  } else if (charCount <= 1171) {
    version = 24;
  } else if (charCount <= 1273) {
    version = 25;
  } else if (charCount <= 1367) {
    version = 26;
  } else if (charCount <= 1465) {
    version = 27;
  } else if (charCount <= 1528) {
    version = 28;
  } else if (charCount <= 1628) {
    version = 29;
  } else if (charCount <= 1732) {
    version = 30;
  } else if (charCount <= 1840) {
    version = 31;
  } else if (charCount <= 1952) {
    version = 32;
  } else if (charCount <= 2068) {
    version = 33;
  } else if (charCount <= 2188) {
    version = 34;
  } else if (charCount <= 2303) {
    version = 35;
  } else if (charCount <= 2431) {
    version = 36;
  } else if (charCount <= 2563) {
    version = 37;
  } else if (charCount <= 2699) {
    version = 38;
  } else if (charCount <= 2809) {
    version = 39;
  } else if (charCount <= 2953) {
    version = 40;
  } else {
    alert('invalid number of characters');
  }

  return version;
}

// generate binary character count
function generateCharCount (V, charCount) {
  if (V > 9) {
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

// convert binary data to matrix to be used to fill pixels in QR
function dataToArray(data, V) {
  const size = (((V - 1) * 4) + 21); // Calculate matrix size based on the version
  const matrix = Array.from({ length: size }, () => Array(size).fill(null)); // Initialize empty matrix

  let bitIndex = 0; // Tracks current bit in `data`
  let col = size - 1; // Start at the rightmost column
  let row = size - 1; // Start at the bottom row
  let directionUp = true; // Tracks vertical direction (up or down)

  while (col > 0) {
    // Skip timing pattern column
    if (col === 6) {
      col -= 1;
    }

    // Place bits in the two adjacent columns
    for (let i = 0; i < size; i++) {
      // Fill right column
      if (matrix[row][col] === null) {
        matrix[row][col] = bitIndex < data.length ? parseInt(data[bitIndex], 10) : 0;
        bitIndex++;
      }

      // Move to left column
      if (matrix[row][col - 1] === null) {
        matrix[row][col - 1] = bitIndex < data.length ? parseInt(data[bitIndex], 10) : 0;
        bitIndex++;
      }

      // Move vertically
      row += directionUp ? -1 : 1;

      // Reverse direction at the top or bottom
      if (row < 0 || row >= size) {
        directionUp = !directionUp;
        row += directionUp ? 1 : -1; // Adjust row after reversing
        break; // Move to the next column
      }
    }

    // Move left to the next pair of columns
    col -= 2;
  }

  return matrix;
}

// convert input to binary
function encode (str) {
  let output = "";
  for (let i = 0; i < str.length; i++) {
    const binaryChar = str[i].charCodeAt(0).toString(2);
    output += pad(binaryChar, 8) + " ";
  }
  return output.trim();
}

// resize QR code based on version
function resize(V, matrix) {
  const size = matrix.length;
  const container = document.getElementById("QRContainer");

  // Clear grid
  container.innerHTML = "";

  // Set grid dimensions
  container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  container.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  // Create grid cells
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      const pixel = document.createElement("div");
      pixel.classList.add("pixel");

      // Set pixel color based on matrix value
      pixel.style.backgroundColor = matrix[row][col] === 1 ? "black" : "white";

      container.appendChild(pixel);
    }
  }
}

// calls functions to add all function patterns
function functionPatterns (input, V) {
  finderPatterns(V);
  V >= 2 && alignmentPatterns(V);
  timingPatterns(V);
}

// add finder patterns, incl. seperators, dark module
function finderPatterns (V) {

}

// add alignment pattern(s)
function alignmentPatterns (V) {

}

// add timing patterns
function timingPatterns (V) {

}
