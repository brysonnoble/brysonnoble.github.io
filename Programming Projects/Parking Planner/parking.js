const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// Get the current day index
function getCurrentDayIndex() {
  const today = new Date();
  return today.getDay() === 0 ? 6 : today.getDay() - 1; // Adjust so Monday = 0, Sunday = 6
}

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

// Display parking layout for the current day and adjacent days
function displayParkingVisualization(currentDayIndex, cars, rows, unblockedSpaces) {
  const visualization = document.getElementById('visualization');
  visualization.innerHTML = '';

  // Add Previous and Next buttons
  const controls = document.createElement('div');
  controls.className = 'controls';
  controls.innerHTML = `
    <button id="prevDayButton">Previous</button>
    <button id="nextDayButton">Next</button>
  `;
  visualization.appendChild(controls);

  // Event listeners for buttons
  document.getElementById('prevDayButton').addEventListener('click', () => {
    const prevDayIndex = (currentDayIndex - 1 + daysOfWeek.length) % daysOfWeek.length;
    displayParkingVisualization(prevDayIndex, cars, rows, unblockedSpaces);
  });

  document.getElementById('nextDayButton').addEventListener('click', () => {
    const nextDayIndex = (currentDayIndex + 1) % daysOfWeek.length;
    displayParkingVisualization(nextDayIndex, cars, rows, unblockedSpaces);
  });

  // Create sections for Previous, Current, and Next days
  const prevDayIndex = (currentDayIndex - 1 + daysOfWeek.length) % daysOfWeek.length;
  const nextDayIndex = (currentDayIndex + 1) % daysOfWeek.length;

  const createDaySection = (dayIndex, sizeClass) => {
    const dayDiv = document.createElement('div');
    dayDiv.className = `day-section ${sizeClass}`;
    dayDiv.innerHTML = `<h2>${daysOfWeek[dayIndex]}</h2>`;
    const layout = [];
    const unblockedParking = [];
    cars
      .sort((a, b) => b.leaveTimes[dayIndex] - a.leaveTimes[dayIndex] || a.index - b.index)
      .forEach(car => {
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
      rowDiv.className = sizeClass === 'main' ? 'parking-row' : 'small-parking-row';
      for (let i = 0; i < row.spaces; i++) {
        const spaceDiv = document.createElement('div');
        spaceDiv.className = sizeClass === 'main' ? 'parking-space' : 'small-parking-space';
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
        carDiv.className = sizeClass === 'main' ? 'parking-space unblocked' : 'small-parking-space unblocked';
        carDiv.innerHTML = `<span class="car-label">${car.nickname}</span>`;
        unblockedDiv.appendChild(carDiv);
      });
      dayDiv.appendChild(unblockedDiv);
    }

    return dayDiv;
  };

  // Add sections to visualization
  visualization.appendChild(createDaySection(prevDayIndex, 'small'));
  visualization.appendChild(createDaySection(currentDayIndex, 'main'));
  visualization.appendChild(createDaySection(nextDayIndex, 'small'));
}

// Convert time to minutes
function convertTimeToMinutes(time) {
  const [hour, rest] = time.split(':');
  const [minutes, period] = rest.split(' ');
  let totalMinutes = parseInt(hour) * 60 + parseInt(minutes);
  if (period === 'PM' && hour !== '12') totalMinutes += 720;
  if (period === 'AM' && hour === '12') totalMinutes -= 720;
  return totalMinutes;
}

// Handle form submission and show visualization
function processForm(event) {
  document.getElementById("form").style.display = "none";
  document.getElementById("visualization").style.display = "flex";
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

  // Get current day index
  const currentDayIndex = getCurrentDayIndex();
  displayParkingVisualization(currentDayIndex, cars, rows, unblockedSpaces);
}
