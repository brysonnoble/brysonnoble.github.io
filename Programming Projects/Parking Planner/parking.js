const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
let currentDayIndex = 0; // Start at the first day (Monday)

// Function to navigate between days
function navigateDay(offset) {
  currentDayIndex = (currentDayIndex + offset + daysOfWeek.length) % daysOfWeek.length; // Loop around
  updateDayView();
}

// Function to update the view with the current, previous, and next days
function updateDayView() {
  const previousIndex = (currentDayIndex - 1 + daysOfWeek.length) % daysOfWeek.length;
  const nextIndex = (currentDayIndex + 1) % daysOfWeek.length;

  const previousDayContainer = document.getElementById('previous-day');
  const currentDayContainer = document.getElementById('current-day');
  const nextDayContainer = document.getElementById('next-day');

  previousDayContainer.innerHTML = `<h3>${daysOfWeek[previousIndex]}</h3>`;
  currentDayContainer.innerHTML = `<h2>${daysOfWeek[currentDayIndex]}</h2>`;
  nextDayContainer.innerHTML = `<h3>${daysOfWeek[nextIndex]}</h3>`;

  // Clear existing visualization and render new one for the current day
  currentDayContainer.innerHTML += generateParkingHTML(currentDayIndex);
}

// Function to generate the parking layout for a specific day
function generateParkingHTML(dayIndex) {
  const layout = []; // Array for parking layout
  const unblockedParking = []; // Array for unblocked parking

  // Sort cars by leave time for the current day
  cars.sort((a, b) => b.leaveTimes[dayIndex] - a.leaveTimes[dayIndex] || a.index - b.index);

  // Organize cars into rows
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

  // Build HTML for rows and unblocked parking
  let html = '<div>';
  rows.forEach((row, index) => {
    html += `<div class="parking-row"><strong>Row ${index + 1}:</strong>`;
    for (let i = 0; i < row.spaces; i++) {
      const car = (layout[index] || [])[i];
      html += `<div class="parking-space">${car ? car.nickname : ''}</div>`;
    }
    html += '</div>';
  });

  // Add unblocked parking visualization
  if (unblockedParking.length > 0) {
    html += '<div><strong>Unblocked Parking:</strong>';
    unblockedParking.forEach(car => {
      html += `<div class="parking-space unblocked">${car.nickname}</div>`;
    });
    html += '</div>';
  }

  html += '</div>';
  return html;
}

// Helper function to convert a time string to minutes
function convertTimeToMinutes(time) {
  const [hour, rest] = time.split(':');
  const [minutes, period] = rest.split(' ');
  let totalMinutes = parseInt(hour) * 60 + parseInt(minutes);
  if (period === 'PM' && hour !== '12') totalMinutes += 720;
  if (period === 'AM' && hour === '12') totalMinutes -= 720;
  return totalMinutes;
}

// Initialize the day view on page load
updateDayView();
