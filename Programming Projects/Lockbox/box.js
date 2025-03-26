function turnKey (direction) {
  const key = document.getElementById("key").value;
  const passwords = document.getElementById("passwords").value.replace(/\r\n/g,"\n").split("\n");
  const output = [];

  for (const e of passwords) {
    output.push(rotatingCesar(toAscii(e), toAscii(key), direction));
  }

  console.log(output);
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
  for (let i = 0; i < password.length; i++) {
    if (j == key.length) {
      j = 0;
    }

    if (direction == true) {
      cipher.push(String.fromCharCode(password[i] + key[j]));
    } else {
      cipher.push(String.fromCharCode(password[i] - key[j]));
    }
    
    j++;
  }

  return cipher;
}
