function lock () {
  const key = document.getElementById("key").value;
  const passwords = document.getElementById("passwords").value.replace(/\r\n/g,"\n").split("\n");
  const output = [];

  console.log(key);
  console.log(passwords);

  for (const e of passwords) {
    output.push(encrypt(e, key));
  }

  console.log(output);
  
  // document.getElementById("passwords").value = whatever
}

function encrypt (password, key) {
  pAscii = toAscii(password);
  kAscii = toAscii(key);

  return rotatingCesar(pAscii, kAscii, true);;
}

function unlock () {

}

function toAscii (input) {
  const ascii = [];
  for (const c of input) {
    ascii.push(c.charCodeAt(0));
  }

  return ascii;
}

function rotatingCesar (password, key, direction) {
  let cipher = [];
  
  let j = 0;
  for (let i = 0; i < pAscii.length; i++) {
    if (j == kAscii.length) {
      j = 0;
    }

    if (direction == True) {
      cipher.push(String.fromCharCode(pAscii[i] + kAscii[j]));
    } else {
      cipher.push(String.fromCharCode(pAscii[i] - kAscii[j]));
    }
    
    j++;
  }

  return cipher;
}
