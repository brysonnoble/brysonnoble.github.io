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
  console.log(pAscii);
  
  kAscii = []
  for (const c of key) {
    kAscii.push(key.charCodeAt(0));
  }
  console.log(kAscii);

  return "hi";
}

function unlock () {

}
