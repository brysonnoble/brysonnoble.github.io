// Create global variables for the current day index and the parking data
let currentDayIndex;
let cars = [];
let rows = [];
let unblockedSpaces = 0;

// Initialize the visualization container and buttons
function initVisualization() {
  const visualizationContainer = document.getElementById('visualization');
  const prevButton = document.createElement('button');
  const nextButton = document.createElement('button');

  prevButton.id = 'prevButton';
  nextButton.id = 'nextButton';

  prevButton.textContent = 'Previous Day';
  nextButton.textContent = 'Next Day';

  prevButton.onclick = () => navigateDay(-1);
  nextButton.onclick = () => navigateDay(1);

  visualizationContainer.appendChild(prevButton);
  visualizationContainer.appendChild(nextButton);
}

// Navigate to a different day
function navigateDay(direction) {
  currentDayIndex = (currentDayIndex + direction + daysOfWeek.length) % daysOfWeek.length;
  displayParkingVisualization(currentDayIndex, cars, rows, unblockedSpaces);
}

// Display parking layout for the current day and adjacent days
function displayParkingVisualization(currentDayIndex, cars, rows, unblockedSpaces) {
  const visualization = document.getElementById('visualization');

  // Remove all previous parking layouts
  const existingLayouts = visualization.querySelectorAll('.day-section');
  existingLayouts.forEach(layout => layout.remove());

  // Get previous, current, and next day indices
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

  // Add previous, current, and next day sections
  visualization.appendChild(createDaySection(prevDayIndex, 'small'));
  visualization.appendChild(createDaySection(currentDayIndex, 'main'));
  visualization.appendChild(createDaySection(nextDayIndex, 'small'));
}

// On form submission, initialize visualization for the current day
function processForm(event) {
  event.preventDefault();

  // Hide the form and show the visualization container
  document.getElementById('form').style.display = 'none';
  document.getElementById('visualization').style.display = 'flex';

  // Get user inputs
  const numRows = parseInt(document.getElementById('numRows').value) || 0;
  const numCars = parseInt(document.getElementById('numCars').value) || 0;
  const unblockedAllowed = document.querySelector('input[name="unblocked"]:checked')?.value === 'yes';
  unblockedSpaces = unblockedAllowed ? parseInt(document.querySelector('[name="unblockedSpaces"]').value) || 0 : 0;

  rows = [];
  for (let i = 1; i <= numRows; i++) {
    rows.push({ rowNum: i, spaces: parseInt(document.querySelector(`[name="spacesInRow${i}"]`)?.value) || 0 });
  }

  cars = [];
  for (let i = 1; i <= numCars; i++) {
    const nickname = document.querySelector(`[name="nicknameCar${i}"]`)?.value || `Car ${i}`;
    const leaveTimes = daysOfWeek.map(day =>
      document.querySelector(`[name="car${i}_${day.toLowerCase()}"]`)?.value
    ).map(convertTimeToMinutes);
    cars.push({ nickname, leaveTimes, index: i });
  }

  // Initialize current day and display
  currentDayIndex = getCurrentDayIndex();
  displayParkingVisualization(currentDayIndex, cars, rows, unblockedSpaces);
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

// Initialize buttons when the script loads
document.addEventListener('DOMContentLoaded', initVisualization);
