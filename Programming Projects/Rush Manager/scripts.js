// Event Data
const events = [
  { 
    title: "Welcome Back BBQ", 
    date: "2024-12-15", 
    time: "3:00 PM", 
    location: "Chi Phi House, Main Lawn",
    description: "Join us for a fun BBQ to kick off the semester! Meet the brothers and enjoy great food." 
  },
  { 
    title: "Charity Fun Run", 
    date: "2025-01-10", 
    time: "8:00 AM", 
    location: "Downtown Park",
    description: "Participate in our charity fun run to raise funds for local communities. Bring your friends!" 
  },
  { 
    title: "Alumni Networking Night", 
    date: "2025-02-05", 
    time: "6:00 PM", 
    location: "University Hall, Room 203",
    description: "A special night to connect with Chi Phi alumni and explore career opportunities." 
  }
];

// Dynamically Populate Events with Click-to-Expand Feature
document.addEventListener('DOMContentLoaded', () => {
  const eventList = document.getElementById('event-list');

  events.forEach(event => {
    const eventDiv = document.createElement('div');
    eventDiv.classList.add('event');
    eventDiv.innerHTML = `
      <h3>${event.title}</h3>
      <p><strong>Date:</strong> ${event.date}</p>
      <p><strong>Time:</strong> ${event.time}</p>
      <p><strong>Location:</strong> ${event.location}</p>
      <div class="description">${event.description}</div>
    `;

    // Add click event to toggle expansion
    eventDiv.addEventListener('click', () => {
      eventDiv.classList.toggle('expanded');
    });

    eventList.appendChild(eventDiv);
  });
});
