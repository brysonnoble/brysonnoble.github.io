const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
let currentDayIndex = 0; // Start at Monday
let rows = [];
let cars = [];
let unblockedSpaces = 0;

// Generate rows based on user input
function generateRows() {
  const rowContainer = document.getElementById('rowContainer');
  rowContainer.innerHTML = '';
  const numRows = parseInt(document.getElementById('numRows').value) || 0;

  rows = [];
  for (let i = 1; i <= numRows; i++) {
    rows.push({ rowNum: i, spaces: 0 }); // Reset spaces for rows
    const rowDiv = document.createElement('div');
    rowDiv.innerHTML = `
      <label>How many spaces in row ${i}?</label>
      <input type="number" name="spacesInRow${i}" min="0" onchange="updateRowSpaces(${i}, this.value)"><br>
    `;
    rowContainer.appendChild(rowDiv);
  }
}

// Update the spaces for a specific row
function updateRowSpaces(rowNum, value) {
  const index = rows.findIndex(row => row.rowNum === rowNum);
  if (index >= 0) {
    rows[index].spaces = parseInt(value) || 0;
  }
}

// Toggle unblocked parking question
function toggleUnblockedParking() {
  const isUnblocked = document.querySelector('input[name="unblocked"]:checked')?.value === 'yes';
  const unblockedContainer = document.getElementById('unblockedContainer');
  unblockedContainer.style.display = isUnblocked ? 'block' : 'none';
}

// Generate car fields dynamically
function generateCars() {
  const carContainer = document.getElementById('carContainer');
  carContainer.innerHTML = '';
  const numCars = parseInt(document.getElementById('numCars').value) || 0;

  cars = [];
  for (let i = 1; i <= numCars; i++) {
    cars.push({ index: i, nickname: `Car ${i}`, leaveTimes: Array(7).fill(0) }); // Reset cars
    const carDiv = document.createElement('div');
    carDiv.innerHTML = `
      <h4>Car ${i}</h4>
      <label>Create a nickname for car ${i}:</label>
      <input type="text" name="nicknameCar${i}" oninput="updateCarNickname(${i}, this.value)"><br>
      ${daysOfWeek.map(day => `
        <label>What time does car ${i} have to leave on ${day}?</label>
        <input type="time" name="car${i}_${day.toLowerCase()}" onchange="updateCarLeaveTime(${i}, '${day}', this.value)"><br>
      `).join('')}
    `;
    carContainer.appendChild(carDiv);
  }
}

// Update car nickname
function updateCarNickname(carIndex, value) {
  const car = cars.find(car => car.index === carIndex);
  if (car) {
    car.nickname = value || `Car ${carIndex}`;
  }
}

// Update car leave time
function updateCarLeaveTime(carIndex, day, time) {
  const car = cars.find(car => car.index === carIndex);
  if (car) {
    const dayIndex = daysOfWeek.indexOf(day);
    car.leaveTimes[dayIndex] = convertTimeToMinutes(time);
  }
}

// Handle form submission and initialize visualization
function processForm(event) {
  event.preventDefault();

  // Retrieve unblocked parking spaces
  const unblockedAllowed = document.querySelector('input[name="unblocked"]:checked')?.value === 'yes';
  unblockedSpaces = unblockedAllowed ? parseInt(document.querySelector('[name="unblockedSpaces"]').value) || 0 : 0;

  // Hide form and display visualization
  document.getElementById("form").style.display = "none";
  document.getElementById("visualization").style.display = "block";

  // Initialize day visualization
  updateDayView();
}

// Navigate between days
function navigateDay(offset) {
  currentDayIndex = (currentDayIndex + offset + daysOfWeek.length) % daysOfWeek.length;
  updateDayView();
}

function updateDayView() {
  const previousIndex = (currentDayIndex - 1 + daysOfWeek.length) % daysOfWeek.length;
  const nextIndex = (currentDayIndex + 1) % daysOfWeek.length;

  document.getElementById('previous-day').innerHTML = `
    <h3>${daysOfWeek[previousIndex]}</h3>
    <div class="small-parking">${generateParkingHTML(previousIndex, true)}</div>
  `;
  document.getElementById('current-day').innerHTML = `
    <h2>${daysOfWeek[currentDayIndex]}</h2>
    ${generateParkingHTML(currentDayIndex)}
  `;
  document.getElementById('next-day').innerHTML = `
    <h3>${daysOfWeek[nextIndex]}</h3>
    <div class="small-parking">${generateParkingHTML(nextIndex, true)}</div>
  `;
}

// Modified generateParkingHTML to handle both full-size and small versions
function generateParkingHTML(dayIndex, isSmall = false) {
  const layout = [];
  const unblockedParking = [];

  // Sort cars by leave time
  cars.sort((a, b) => b.leaveTimes[dayIndex] - a.leaveTimes[dayIndex] || a.index - b.index);

  // Place cars into rows and unblocked parking
  cars.forEach(car => {
    let parked = false;
    for (let row of rows) {
      if (!layout[row.rowNum - 1]) layout[row.rowNum - 1] = [];
      const rowCars = layout[row.rowNum - 1];
      if (
        rowCars.length < row.spaces &&
        rowCars.every(existingCar => existingCar.leaveTimes[dayIndex] >= car.leaveTimes[dayIndex])
      ) {
        rowCars.push(car);
        parked = true;
        break;
      }
    }
    if (!parked && unblockedParking.length < unblockedSpaces) {
      unblockedParking.push(car);
    }
  });

  // Generate HTML
  let html = '<div>';
  rows.forEach((row, index) => {
    html += `<div class="${isSmall ? 'small-parking-row' : 'parking-row'}">`;
    for (let i = 0; i < row.spaces; i++) {
      const car = (layout[index] || [])[i];
      html += `<div class="${isSmall ? 'small-parking-space' : 'parking-space'}">${car ? car.nickname : ''}</div>`;
    }
    html += '</div>';
  });

  if (unblockedParking.length > 0) {
    html += '<div><strong>Unblocked:</strong>';
    unblockedParking.forEach(car => {
      html += `<div class="${isSmall ? 'small-parking-space unblocked' : 'parking-space unblocked'}">${car.nickname}</div>`;
    });
    html += '</div>';
  }

  html += '</div>';
  return html;
}

// Convert time string to minutes
function convertTimeToMinutes(time) {
  const [hour, minute] = time.split(':').map(Number);
  return hour * 60 + minute;
}
