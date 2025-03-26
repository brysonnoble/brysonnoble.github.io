document.addEventListener("DOMContentLoaded", () => {
  addRow();
  document.getElementById("add-row").addEventListener("click", addRow);
});

function addRow () {
  const container = document.getElementById("password-container");
  const row = document.createElement("div");
  row.className = "password-row";

  const appInput = document.createElement("input");
  appInput.type = "text";
  appInput.className = "app-name";
  appInput.placeholder = "App/Website";

  const passwordInput = document.createElement("input");
  passwordInput.type = "text";
  passwordInput.className = "password";
  passwordInput.placeholder = "Password";

  const removeButton = document.createElement("button");
  removeButton.className = "remove-row";
  removeButton.textContent = "X";
  removeButton.onclick = () => container.removeChild(row);

  row.appendChild(appInput);
  row.appendChild(passwordInput);
  row.appendChild(removeButton);
  container.appendChild(row);
}

function turnKey (direction) {
  const key = document.getElementById("key").value;
  const passwords = document.getElementById("passwords").value.replace(/\r\n/g,"\n").split("\n");
  const output = [];

  for (const e of passwords) {
    output.push(rotatingCesar(toAscii(e), toAscii(key), direction).join(""));
  }

  document.getElementById("passwords").value = output.join("\n");
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
