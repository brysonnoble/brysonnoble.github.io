const events = [
  {
    title: "Meet the Greeks",
    date: "2026-08-14",
    time: "10:00 AM - 2:00 PM",
    location: "Crawford Greens",
    description: "Connect with all fraternities and learn more about Greek life on campus."
  },
  {
    title: "Greek Life Beach Day",
    date: "2026-08-15",
    time: "10:00 AM - 1:00 PM",
    location: "Paradise Beach",
    description: "Join Greek Life for a day at the beach and meet the brothers of Chi Phi."
  },
  {
    title: "Lawn Games",
    date: "2026-08-17",
    time: "6:00 PM - 8:00 PM",
    location: "Crawford Greens",
    description: "Spikeball, cornhole, and other lawn games on Crawford Greens with the Chi Phi brothers."
  },
  {
    title: "Casino Night & House Tours",
    date: "2026-08-18",
    time: "6:00 PM - 8:00 PM",
    location: "Chi Phi Manor - 4060 Dairy Road",
    description: "Play poker, blackjack, and other casino games while getting a tour of the Chi Phi Manor."
  },
  {
    title: "Glizzys With The Boys",
    date: "2026-08-19",
    time: "6:00 PM - 7:00 PM",
    location: "Mustard's - 415 E New Haven Ave",
    description: "Chill and grab some glizzys with the boys at Mustard's."
  },
  {
    title: "Volleyball",
    date: "2026-08-19",
    time: "7:30 PM - 8:00 PM",
    location: "Brownlie Hall",
    description: "Play volleyball with the Chi Phi brothers at Brownlie Hall."
  },
  {
    title: "Highland Games & House Tours",
    date: "2026-08-20",
    time: "6:00 PM - 8:00 PM",
    location: "Chi Phi Manor - 4060 Dairy Road",
    description: "Take part in Highland Games and get a tour of the Chi Phi Manor."
  },
  {
    title: "Invite Only",
    date: "2026-08-21",
    time: "TBD",
    location: "Invite Only",
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
