const events = [
  {
    title: "Meet the Greeks",
    date: "2025-01-13",
    time: "10:00 AM - 2:00 PM",
    location: "Crawford Green",
    description: "Connect with all fraternities and learn more about Greek life on campus."
  },
  {
    title: "Lawn Games",
    date: "2025-01-13",
    time: "4:00 PM - 5:30 PM",
    location: "Crawford Green",
    description: "Enjoy lawn games with the Chi Phi brothers."
  },
  {
    title: "Games at the Ratskeller",
    date: "2025-01-13",
    time: "6:00 PM - 7:30 PM",
    location: "The Ratskeller",
    description: "Wrap up Monday with exciting games and free grub at the Ratskeller."
  },
  {
    title: "Casino Night",
    date: "2025-01-14",
    time: "6:00 PM - 8:30 PM",
    location: "Chi Phi Manor",
    description: "Test your luck at our Casino Night, hosted at the Chi Phi Manor."
  },
  {
    title: "Basketball in Harris Courts",
    date: "2025-01-15",
    time: "4:30 PM - 5:30 PM",
    location: "Harris Courts",
    description: "Join us for a friendly game of basketball with the brothers."
  },
  {
    title: "Glizzys with the Boys",
    date: "2025-01-15",
    time: "6:00 PM - 7:30 PM",
    location: "Chi Phi Manor",
    description: "Relax and grab some glizzys with the Chi Phi brothers."
  },
  {
    title: "House Tours + BBQ + Highlander Games",
    date: "2025-01-16",
    time: "5:00 PM - 7:00 PM",
    location: "Chi Phi Manor",
    description: "Take a tour of our 3.5 beautiful acres and enjoy BBQ while participating in fun Highlander games."
  },
  {
    title: "Invite-Only Event",
    date: "2025-01-17",
    time: "4:00 PM - 6:00 PM",
    location: "Spessard Holland South Beach Park",
    description: "INVITE ONLY at Spessard Holland South Beach Park."
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
