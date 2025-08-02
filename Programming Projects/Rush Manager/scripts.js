const events = [
  {
    title: "Meet the Greeks",
    date: "2025-08-15",
    time: "2:30 PM - 4:00 PM",
    location: "Crawford Green",
    description: "Connect with all fraternities and learn more about Greek life on campus."
  },
  {
    title: "Lawn Games",
    date: "2025-08-17",
    time: "4:30 PM - 6:00 PM",
    location: "Crawford Green",
    description: "Spikeball, cornhole, and other lawn games on Crawford Green."
  },
  {
    title: "Glizzys With The Boys",
    date: "2025-08-18",
    time: "5:00 PM - 6:00 PM",
    location: "Mustard's Last Stand",
    description: "Chill and grab some glizzys with the Chi Phi brothers."
  },
  {
    title: "Volleyball",
    date: "2025-08-18",
    time: "6:30 PM - 8:30 PM",
    location: "Brownlie Sand Court",
    description: "Beach volleyball with the brothers."
  },
  {
    title: "Casino Night",
    date: "2025-08-19",
    time: "5:30 PM - 7:00 PM",
    location: "Chi Phi Manor",
    description: "Poker, blackjack, and other casino games hosted at the Chi Phi Manor."
  },
  {
    title: "Sports Day",
    date: "2025-08-20",
    time: "4:00 PM - 6:30 PM",
    location: "Ocean Ave. Beach",
    description: "Come out for a fun day of beach sports with the brothers."
  },
  {
    title: "Football / Rage Room",
    date: "2025-08-21",
    time: "5:00 PM - 7:30 PM",
    location: "Chi Phi Manor",
    description: "Watch football and smash pianos at the Chi Phi Manor."
  },
  {
    title: "Invite-Only Event",
    date: "2025-08-22",
    time: "6:00 PM - 8:00 PM",
    location: "INVITE ONLY",
    description: "Exclusive invite-only event with Chi Phi."
  },
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

  // Load gallery images dynamically
  const gallery = document.getElementById('gallery');

  // Image paths
  const imagePaths = [
    "https://brysonnoble.github.io/Programming Projects/Rush Manager/Images/IMG_1130.jpg",
    "https://brysonnoble.github.io/Programming Projects/Rush Manager/Images/IMG_1491.jpg",
    "https://brysonnoble.github.io/Programming Projects/Rush Manager/Images/IMG_1721.jpg",
    "https://brysonnoble.github.io/Programming Projects/Rush Manager/Images/IMG_2135.JPG",
    "https://brysonnoble.github.io/Programming Projects/Rush Manager/Images/IMG_2385.JPG",
    "https://brysonnoble.github.io/Programming Projects/Rush Manager/Images/IMG_2410.JPG",
    "https://brysonnoble.github.io/Programming Projects/Rush Manager/Images/IMG_2931.JPG",
    "https://brysonnoble.github.io/Programming Projects/Rush Manager/Images/IMG_3129.JPG",
    "https://brysonnoble.github.io/Programming Projects/Rush Manager/Images/IMG_3159.JPG",
    "https://brysonnoble.github.io/Programming Projects/Rush Manager/Images/IMG_3380.JPG",
    "https://brysonnoble.github.io/Programming Projects/Rush Manager/Images/IMG_3381.JPG",
    "https://brysonnoble.github.io/Programming Projects/Rush Manager/Images/IMG_3436.JPG",
    "https://brysonnoble.github.io/Programming Projects/Rush Manager/Images/IMG_3475.JPG",
    "https://brysonnoble.github.io/Programming Projects/Rush Manager/Images/IMG_3570.JPG",
    "https://brysonnoble.github.io/Programming Projects/Rush Manager/Images/IMG_3617.JPG",
    "https://brysonnoble.github.io/Programming Projects/Rush Manager/Images/IMG_5013.JPG",
    "https://brysonnoble.github.io/Programming Projects/Rush Manager/Images/IMG_5158.JPG",
    "https://brysonnoble.github.io/Programming Projects/Rush Manager/Images/IMG_5173.JPG",
    "https://brysonnoble.github.io/Programming Projects/Rush Manager/Images/IMG_7254.jpg"
  ];

  imagePaths.forEach(path => {
    const img = document.createElement('img');
    img.src = path;
    img.alt = 'Gallery Image';
    img.addEventListener('click', () => {
      img.classList.toggle('enlarged'); // Toggle enlargement on click
    });
    gallery.appendChild(img);
  });
});
