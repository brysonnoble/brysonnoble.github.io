/*
Byte Mode: 0100
Character Count: Versions 1-9: 8 bits, Versions 10-40: 16 bits
Encoded Data: convert to ISO 8859-1, then to binary
Required Bits: version max * 8
Size: (((V-1)*4)+21)
Finder Patterns: (0, 0) ([(((V-1)*4)+21) - 7], 0) (0,[(((V-1)*4)+21) - 7])
Dark Module: ([(4 * V) + 9], 8)
*/

// calls all functions to update qr
function dynamic () {
  const byteMode = "0100";
  const input = document.getElementById("QRString").value;
  const version = versionCheck(input.length);
  const charCount = generateCharCount(version, input.length);
  const encodedInput = encode(input);

  console.log(version);
  
  document.getElementById("QRCharCount").innerHTML = charCount;
  document.getElementById("QRData").innerHTML = encodedInput;
  paint(version, dataToArr(byteMode, charCount, encodedInput, version));
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

// convert input to binary
function encode (str) {
  let output = "";
  for (let i = 0; i < str.length; i++) {
    const binaryChar = str[i].charCodeAt(0).toString(2);
    output += pad(binaryChar, 8);
  }
  return output.trim();
}

// generate QR code with data
function paint (V, matrix) {
  const size = (((V - 1) * 4) + 21);
  const container = document.getElementById("QRContainer");

  // clear grid
  container.innerHTML = "";

  // set dimensions
  container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  container.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  // instantiate pixels
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      const pixel = document.createElement("div");
      pixel.classList.add("pixel");

      if (matrix[row][col] == 0) {
        pixel.style.backgroundColor = "white";
        pixel.style.color = "black";
      } else if (matrix[row][col] == 1) {
        pixel.style.backgroundColor = "black";
        pixel.style.color = "white";
      } else if (matrix[row][col] == 2) {
        pixel.style.backgroundColor = "blue";
        pixel.style.color = "white";
      } else {
        pixel.style.backgroundColor = "lightgrey";
      }

      pixel.innerHTML = `${row}, ${col}`;

      container.appendChild(pixel);
    }
  }
}

// turns input into array to apply to qr
function dataToArr (byteMode, charCount, QRData, V) {
  const size = (((V - 1) * 4) + 21);
  const data = byteMode + charCount + QRData;
  let matrix = generateArr(size);

  // apply function patterns to get rid of blank space
  matrix = functionPatterns(matrix, V);
  
  return matrix;
}

function generateArr (size) {
  const rows = size;
  const cols = size;
  const matrix = [];
  
  for (let i = 0; i < rows; i++) {
    matrix[i] = [];
    for (let j = 0; j < cols; j++) {
      matrix[i][j] = -1; // blank cells will be denoted by -1
    }
  }

  return matrix;
}

// calls functions to add all function patterns
function functionPatterns (matrix, V) {
  matrix = finderPatterns(matrix, V);
  matrix = reservedAreas(matrix, V);
  matrix = timingPatterns(matrix, V);
  if (V >= 2) {matrix = alignmentPatterns(matrix, V);}
  matrix = darkModule(matrix, V);

  return matrix;
}

// add finder patterns, seperators (0, 0) ([(((V-1)*4)+21) - 7], 0) (0,[(((V-1)*4)+21) - 7])
function finderPatterns (matrix, V) {
  const pattern = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 1, 1, 1, 0, 1, 0],
    [0, 1, 0, 1, 1, 1, 0, 1, 0],
    [0, 1, 0, 1, 1, 1, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];
  let y = null;
  let x = null;
  let yp = null;
  let xp = null;
  
  for (let i = 0; i < 3; i++) {
    switch (i) {
      case 0:
        y = 0;
        x = 0;
        yp = 1;
        xp = 1;
        break;
      case 1:
        y = (((V-1)*4)+21) - 8; // changed to -8 to offset for seperators
        x = 0;
        yp = 0;
        xp = 1;
        break;
      case 2:
        y = 0;
        x = (((V-1)*4)+21) - 8; // changed to -8 to offset for seperators
        yp = 1;
        xp = 0;
        break;
      default:
        break;
    }
    
    for (let j = 0; j < 8; j++) {
      for (let k = 0; k < 8; k++) {
        matrix[j + y][k + x] = pattern[j + yp][k + xp];
      }
    }
  }
  
  return matrix;
}

// add alignment pattern(s)
function alignmentPatterns (matrix, V) {
  const locations = [
    [],
    [6, 18], // version 2
    [6, 22],
    [6, 26],
    [6, 30],
    [6, 34],
    [6, 22, 38],
    [6, 24, 42],
    [6, 26, 46],
    [6, 28, 50],
    [6, 30, 54],
    [6, 32, 58],
    [6, 34, 62],
    [6, 26, 46, 66],
    [6, 26, 48, 70],
    [6, 26, 50, 74],
    [6, 30, 54, 78],
    [6, 30, 56, 82],
    [6, 30, 58, 86],
    [6, 34, 62, 90],
    [6, 28, 50, 72, 94],
    [6, 26, 50, 74, 98],
    [6, 30, 54, 78, 102],
    [6, 28, 54, 80, 106],
    [6, 32, 58, 84, 110],
    [6, 30, 58, 86, 114],
    [6, 34, 62, 90, 118],
    [6, 26, 50, 74, 98, 122],
    [6, 30, 54, 78, 102, 126],
    [6, 26, 52, 78, 104, 130],
    [6, 30, 56, 82, 108, 134],
    [6, 34, 60, 86, 112, 138],
    [6, 30, 58, 86, 114, 142],
    [6, 34, 62, 90, 118, 146],
    [6, 30, 54, 78, 102, 126, 150],
    [6, 24, 50, 76, 102, 128, 154],
    [6, 28, 54, 80, 106, 132, 158],
    [6, 32, 58, 84, 110, 136, 162],
    [6, 26, 54, 82, 110, 138, 166],
    [6, 30, 58, 86, 114, 142, 170], // version 40
  ]
  const pattern = [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
  ]

  for (let i = 0; i < locations[V].length; i++) {
    for (let j = 0; j < locations[V].length; j++) {
      //if (!isOccupied(matrix[locations[V][i]][locations[V][j]])) continue;

      for (let k = 0; k < 5; k++) {
        for (let l = 0; l < 5; l++) {
          matrix[k + locations[V][i] - 7][l + locations[V][j] - 7] = pattern[k][l];
        }
      }
    }
  }
  
  return matrix;
}

// add timing patterns
function timingPatterns (matrix, V) {
  const size = (((V - 1) * 4) + 21);

  for (let i = 0; i < size - 16; i++) {
    if (i % 2 == 0) {
      matrix[i + 8][6] = 1;
      matrix[6][i + 8] = 1;
    } else {
      matrix[i + 8][6] = 0;
      matrix[6][i + 8] = 0;
    }
  }
  
  return matrix;
}

// add dark module
function darkModule (matrix, V) {
  matrix[(4 * V) + 9][8] = 1;
  
  return matrix;
}

// add reserved areas
function reservedAreas (matrix, V) {
  if (V >= 7) {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 6; j++) {
        matrix[i + (((V-1)*4)+21) - 11][j] = 2;
      }
    }
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 3; j++) {
        matrix[i][j + (((V-1)*4)+21) - 11] = 2;
      }
    }
  } else {
    matrix[8][8] = 2;
    for (let i = 0; i < 8; i++) {
      matrix[i][8] = 2;
      matrix[8][i] = 2;
      matrix[i + (((V-1)*4)+21) - 8][8] = 2;
      matrix[8][i + (((V-1)*4)+21) - 8] = 2;
    }
  }
  
  return matrix;
}

// checks if cell is occupied
function isOccupied (cell) {
  if (cell != -1) {return false;}
  return true;
}
