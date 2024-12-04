const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// Generate rows based on user input
function generateRows() {
  const rowContainer = document.getElementById('rowContainer');
  rowContainer.innerHTML = '';
  const numRows = parseInt(document.getElementById('numRows').value) || 0;

  for (let i = 1; i <= numRows; i++) {
    const rowDiv = document.createElement('div');
    rowDiv.innerHTML = `
      <label>How many spaces in row ${i}?</label>
      <input type="number" name="spacesInRow${i}" min="0"><br>
    `;
    rowContainer.appendChild(rowDiv);
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
  const times = Array.from({ length: 48 }, (_, i) => {
    const hour = Math.floor(i / 2);
    const minute = i % 2 === 0 ? '00' : '30';
    const period = hour < 12 ? 'AM' : 'PM';
    return `${hour % 12 === 0 ? 12 : hour % 12}:${minute} ${period}`;
  });

  for (let i = 1; i <= numCars; i++) {
    const carDiv = document.createElement('div');
    carDiv.innerHTML = `
      <h4>Car ${i}</h4>
      <label>Create a nickname for car ${i}:</label>
      <input type="text" name="nicknameCar${i}"><br>
      ${daysOfWeek.map(day => `
        <label>What time does car ${i} have to leave on ${day}?</label>
        <select name="car${i}_${day.toLowerCase()}">
          ${times.map(time => `<option value="${time}">${time}</option>`).join('')}
        </select><br>
      `).join('')}
    `;
    carContainer.appendChild(carDiv);
  }
}

// Handle form submission and visualize parking
function processForm(event) {
  document.getElementById("form").style.display = "none";
  document.getElementById("visualization").style.display = "block";
  event.preventDefault();

  const numRows = parseInt(document.getElementById('numRows').value) || 0;
  const numCars = parseInt(document.getElementById('numCars').value) || 0;
  const unblockedAllowed = document.querySelector('input[name="unblocked"]:checked')?.value === 'yes';
  const unblockedSpaces = unblockedAllowed ? parseInt(document.querySelector('[name="unblockedSpaces"]').value) || 0 : 0;

  const rows = [];
  for (let i = 1; i <= numRows; i++) {
    rows.push({ rowNum: i, spaces: parseInt(document.querySelector(`[name="spacesInRow${i}"]`)?.value) || 0 });
  }

  const cars = [];
  for (let i = 1; i <= numCars; i++) {
    const nickname = document.querySelector(`[name="nicknameCar${i}"]`)?.value || `Car ${i}`;
    const leaveTimes = daysOfWeek.map(day =>
      document.querySelector(`[name="car${i}_${day.toLowerCase()}"]`)?.value
    ).map(convertTimeToMinutes);
    cars.push({ nickname, leaveTimes, index: i });
  }

  // Visualize parking for each day
  const visualizationContainer = document.getElementById('visualization');
  visualizationContainer.innerHTML = '';

  daysOfWeek.forEach((day, dayIndex) => {
    const dayDiv = document.createElement('div');
    dayDiv.className = 'parking-day';
    dayDiv.innerHTML = `<h2>${day}</h2>`;
    const layout = [];
    const unblockedParking = [];
    cars.sort((a, b) => b.leaveTimes[dayIndex] - a.leaveTimes[dayIndex] || a.index - b.index);

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

    // Render rows
    rows.forEach(row => {
      const rowDiv = document.createElement('div');
      rowDiv.className = 'parking-row';
      for (let i = 0; i < row.spaces; i++) {
        const spaceDiv = document.createElement('div');
        spaceDiv.className = 'parking-space';
        const car = (layout[row.rowNum - 1] || [])[i];
        if (car) spaceDiv.innerHTML = `<span class="car-label">${car.nickname}</span>`;
        rowDiv.appendChild(spaceDiv);
      }
      dayDiv.appendChild(rowDiv);
    });

    // Render unblocked parking
    if (unblockedParking.length > 0) {
      const unblockedDiv = document.createElement('div');
      unblockedDiv.innerHTML = 'Unblocked Parking:';
      unblockedParking.forEach(car => {
        const carDiv = document.createElement('div');
        carDiv.className = 'parking-space unblocked';
        carDiv.innerHTML = `<span class="car-label">${car.nickname}</span>`;
        unblockedDiv.appendChild(carDiv);
      });
      dayDiv.appendChild(unblockedDiv);
    }

    visualizationContainer.appendChild(dayDiv);
  });
}

function convertTimeToMinutes(time) {
  const [hour, rest] = time.split(':');
  const [minutes, period] = rest.split(' ');
  let totalMinutes = parseInt(hour) * 60 + parseInt(minutes);
  if (period === 'PM' && hour !== '12') totalMinutes += 720;
  if (period === 'AM' && hour === '12') totalMinutes -= 720;
  return totalMinutes;
}
