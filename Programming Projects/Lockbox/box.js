document.addEventListener("DOMContentLoaded", () => {
  addRow();
  document.getElementById("add").addEventListener("click", addRow);
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

  const lockButton = document.createElement("button");
  lockButton.className = "lock-row";
  lockButton.textContent = "🔒";
  lockButton.onclick = () => turnKey(true, passwordInput);
  
  const unlockButton = document.createElement("button");
  unlockButton.className = "unlock-row";
  unlockButton.textContent = "🗝️";
  unlockButton.onclick = () => turnKey(false, passwordInput);
  
  const removeButton = document.createElement("button");
  removeButton.className = "remove-row";
  removeButton.textContent = "🗑️";
  removeButton.onclick = () => container.removeChild(row);

  row.appendChild(appInput);
  row.appendChild(passwordInput);
  row.appendChild(lockButton);
  row.appendChild(unlockButton);
  row.appendChild(removeButton);
  container.appendChild(row);
}

function turnKey (direction, element) {
  const key = document.getElementById("key").value;
  const output = [];

  if (element != null) { // individual
    output.push(rotatingCesar(toAscii(element.value), toAscii(key), direction).join(""));
    element.value = output.join("\n");
    return;
  } else { // all
    const passwords = document.getElementsByClassName('password');
    Array.from(passwords).forEach(e => {
      output.push(rotatingCesar(toAscii(e.value), toAscii(key), direction).join(""));
      e.value = output.join("\n");
    });
  }  
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
