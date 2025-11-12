document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery figure');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.getAttribute('data-filter');
      
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      galleryItems.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 10);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.8)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });
  
  galleryItems.forEach(item => {
    const img = item.querySelector('img');
    img.addEventListener('click', () => {
      const lightbox = createLightbox(img.src, img.alt);
      document.body.appendChild(lightbox);
    });
  });
  
  function createLightbox(src, alt) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
      <div class="lightbox-content">
        <span class="lightbox-close">&times;</span>
        <img src="${src}" alt="${alt}" />
      </div>
    `;
    
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
        lightbox.remove();
      }
    });
    
    return lightbox;
  }
  
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('contact-name').value;
      const email = document.getElementById('contact-email').value;
      const message = document.getElementById('contact-message').value;
      
      alert(`Thank you, ${name}! Your message has been received. We'll respond to ${email} soon.`);
      
      contactForm.reset();
    });
  }
  
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});

const facts = [
  "If you could travel at the speed of light, it would still take over 2 million years to reach the Andromeda Galaxy.",
  "There are more stars in the universe than grains of sand on all of Earth’s beaches.",
  "Neutron stars can spin at up to 600 rotations per second.",
  "The footprints on the Moon will likely last for millions of years — there’s no wind or water to erode them.",
  "Some stars are so dense that a teaspoon of their material would weigh billions of tons.",
  "A day on Venus is longer than a year on Venus.",
  "There’s a giant cloud of alcohol in space — enough for 400 trillion pints of beer!",
  "Time moves slower in strong gravity — so technically, astronauts age slightly slower than people on Earth.",
  "Saturn could float in water because it’s mostly made of gas and has very low density.",
  "The observable universe is about 93 billion light-years across — and it's still expanding."
];

let currentFact = 0;
const factElement = document.getElementById("space-fact");

function showNextFact() {
  factElement.classList.add("fade-out");
  setTimeout(() => {
    currentFact = (currentFact + 1) % facts.length;
    factElement.textContent = facts[currentFact];
    factElement.classList.remove("fade-out");
  }, 1000);
}

// Initial fact
factElement.textContent = facts[0];
setInterval(showNextFact, 8000); // Change fact every 8 seconds
