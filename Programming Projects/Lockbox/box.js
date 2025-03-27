document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("data") == null) {
    addRow();
  } else {
    fillData(localStorage.getItem("data"));
  }
  
  document.getElementById("add").addEventListener("click", addRow);
  
  const saveCheckbox = document.getElementById("save");
  saveCheckbox.addEventListener("change", (event) => {
    if (event.target.checked) {
      localStorage.setItem("data", save([]));
    } else {
      localStorage.removeItem("data");
    }
  });
  
  importData();
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

  if (element != null) { // individual
    element.value = rotatingCesar(toAscii(element.value), toAscii(key), direction).join("");
  } else { // all
    const passwords = document.getElementsByClassName('password');
    Array.from(passwords).forEach(e => {
      e.value = rotatingCesar(toAscii(e.value), toAscii(key), direction).join("");
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

function importData () {
  const fileInput = document.getElementById('fileInput');
  fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
  
      reader.onload = (e) => {
        const data = e.target.result.split(/\r?\n/);
        fillData(data);
      };
  
      reader.onerror = (e) => {
        console.error('Error reading file:', e);
      };
  
      reader.readAsText(file);
    }
  });
}

function exportData () {
  const data = [];
  download(save(data));
}

function download (data) {
  const file = new File([data], 'exported-data.L🔒CKBOX', {
    type: 'text/plain',
  });

  const link = document.createElement('a');
  const url = URL.createObjectURL(file);

  link.href = url;
  link.download = file.name;
  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}

function save (data) {
  const apps = document.getElementsByClassName('app-name');
  Array.from(apps).forEach(e => {
    data.push(e.value);
  });

  const passwords = document.getElementsByClassName('password');
  Array.from(passwords).forEach(e => {
    data.push(e.value);
  });
  
  return data.join('\n');
}

function fillData (data) {
  const container = document.getElementById("password-container");
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  for (let i = 0; i < data.length; i += 2) {
    addRow();
  }

  const apps = document.getElementsByClassName('app-name');
  let i = 0;
  Array.from(apps).forEach(e => {
    e.value = data[i];
    i++
  });

  const passwords = document.getElementsByClassName('password');
  Array.from(passwords).forEach(e => {
    e.value = data[i]
    i++
  });
}
