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

// Image paths for the gallery
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

// Parse an ISO "YYYY-MM-DD" string as a local date (avoids UTC off-by-one)
function parseLocalDate(isoDate) {
  const [year, month, day] = isoDate.split('-').map(Number);
  return new Date(year, month - 1, day);
}

document.addEventListener('DOMContentLoaded', () => {
  renderEvents();
  renderNextEvent();
  renderGallery();
  setupLightbox();
});

// -----------------------------------------------------------------
// Events
// -----------------------------------------------------------------
function renderEvents() {
  const eventList = document.getElementById('event-list');
  if (!eventList) return;

  events.forEach(event => {
    const eventDate = parseLocalDate(event.date);
    const month = eventDate.toLocaleDateString('en-US', { month: 'short' });
    const day = eventDate.getDate();

    const eventDiv = document.createElement('div');
    eventDiv.classList.add('event-card');
    eventDiv.setAttribute('tabindex', '0');
    eventDiv.setAttribute('role', 'button');
    eventDiv.setAttribute('aria-pressed', 'false');

    eventDiv.innerHTML = `
      <div class="event-date">
        <span class="month">${month}</span>
        <span class="day">${day}</span>
      </div>
      <div class="event-body">
        <h3>${event.title}</h3>
        <div class="event-meta">
          <span>${event.time}</span>
          <span>${event.location}</span>
        </div>
        <p class="event-desc">${event.description}</p>
      </div>
    `;

    const toggle = () => {
      const isActive = eventDiv.classList.toggle('active');
      eventDiv.setAttribute('aria-pressed', String(isActive));
    };

    eventDiv.addEventListener('click', toggle);
    eventDiv.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle();
      }
    });

    eventList.appendChild(eventDiv);
  });
}

function renderNextEvent() {
  const banner = document.getElementById('next-event');
  if (!banner) return;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcoming = events.find(event => parseLocalDate(event.date) >= today);
  if (!upcoming) return;

  const eventDate = parseLocalDate(upcoming.date);
  const formatted = eventDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

  banner.textContent = `Next up: ${upcoming.title} — ${formatted}, ${upcoming.time}`;
  banner.hidden = false;
}

// -----------------------------------------------------------------
// Gallery
// -----------------------------------------------------------------
function renderGallery() {
  const gallery = document.getElementById('gallery-grid');
  if (!gallery) return;

  imagePaths.forEach((path, index) => {
    const img = document.createElement('img');
    img.src = path;
    img.alt = `Chi Phi Xi Delta gallery photo ${index + 1}`;
    img.loading = 'lazy';
    img.setAttribute('tabindex', '0');
    img.addEventListener('click', () => openLightbox(index));
    img.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(index);
      }
    });
    gallery.appendChild(img);
  });
}

// -----------------------------------------------------------------
// Lightbox
// -----------------------------------------------------------------
let currentImageIndex = 0;
let lastFocusedElement = null;

function setupLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const prevBtn = lightbox.querySelector('.lightbox-prev');
  const nextBtn = lightbox.querySelector('.lightbox-next');

  closeBtn.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', () => showImage(currentImageIndex - 1));
  nextBtn.addEventListener('click', () => showImage(currentImageIndex + 1));

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (lightbox.hidden) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showImage(currentImageIndex - 1);
    if (e.key === 'ArrowRight') showImage(currentImageIndex + 1);
  });

  function showImage(index) {
    currentImageIndex = (index + imagePaths.length) % imagePaths.length;
    lightboxImg.src = imagePaths[currentImageIndex];
    lightboxImg.alt = `Chi Phi Xi Delta gallery photo ${currentImageIndex + 1}`;
  }

  window.showLightboxImage = showImage;
}

function openLightbox(index) {
  const lightbox = document.getElementById('lightbox');
  lastFocusedElement = document.activeElement;
  currentImageIndex = index;
  window.showLightboxImage(index);
  lightbox.hidden = false;
  lightbox.querySelector('.lightbox-close').focus();
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  lightbox.hidden = true;
  if (lastFocusedElement) lastFocusedElement.focus();
}
