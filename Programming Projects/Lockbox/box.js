function lock () {
  const key = document.getElementById("key").value;
  const passwords = document.getElementById("passwords").value.replace(/\r\n/g,"\n").split("\n");
  const output = [];

  for (const e of passwords) {
    output.push(encrypt(toAscii(e), toAscii(key)));
  }

  console.log(output);
}

function encrypt (password, key) {
  return rotatingCesar(pAscii, kAscii, true);
}

function unlock () {
  const key = document.getElementById("key").value;
  const passwords = document.getElementById("passwords").value.replace(/\r\n/g,"\n").split("\n");
  const output = [];

  for (const e of passwords) {
    output.push(decrypt(toAscii(e), toAscii(key)));
  }

  console.log(output);
}

function decrypt (password, key) {
  return rotatingCesar(pAscii, kAscii, false);
}

function toAscii (input) {
  const ascii = [];
  for (const c of input) {
    ascii.push(c.charCodeAt(0));
  }

  return ascii;
}

function rotatingCesar (password, key, direction) {
  const cipher = [];
  
  let j = 0;
  for (let i = 0; i < pAscii.length; i++) {
    if (j == kAscii.length) {
      j = 0;
    }

    if (direction == true) {
      cipher.push(String.fromCharCode(pAscii[i] + kAscii[j]));
    } else {
      cipher.push(String.fromCharCode(pAscii[i] - kAscii[j]));
    }
    
    j++;
  }

  return cipher;
}
