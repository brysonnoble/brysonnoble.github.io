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
  pAscii = []
  for (const c of password) {
    pAscii.push(c.charCodeAt(0));
  }
  
  kAscii = []
  for (const c of key) {
    kAscii.push(c.charCodeAt(0));
  }

  let encrypted = [];
  
  let j = 0;
  for (let i = 0; i < pAscii.length; i++) {
    if (j == kAscii.length) {
      j = 0;
    }

    encrypted.push(pAscii[i] + kAscii[j]);
    
    j++;
  }

  return encrypted;
}

function unlock () {

}
