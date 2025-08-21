// Grandmacoin Interactive Script
document.addEventListener('DOMContentLoaded', function () {
  // === MOBILE MENU ===
  const mobileMenuButton = document.querySelector('.mobile-menu');
  const navLinks = document.querySelector('.nav-links');

  if (mobileMenuButton && navLinks) {
    mobileMenuButton.addEventListener('click', (e) => {
      e.stopPropagation();
      navLinks.classList.toggle('show');
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
      if (navLinks.classList.contains('show') &&
          !e.target.closest('.nav-links') &&
          !e.target.closest('.mobile-menu')) {
        navLinks.classList.remove('show');
      }
    });

    // Prevent closing when clicking inside menu
    navLinks.addEventListener('click', (e) => e.stopPropagation());
  }

  // === SMOOTH SCROLLING ===
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const headerOffset = 80;
        window.scrollTo({
          top: target.offsetTop - headerOffset,
          behavior: 'smooth'
        });
        if (window.innerWidth <= 768) {
          navLinks?.classList.remove('show');
        }
      }
    });
  });

  // === COUNTDOWN TIMER ===
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');
  const messageEl = document.getElementById('countdown-message');

  // Only initialize countdown if elements exist on the page
  if (daysEl || hoursEl || minutesEl || secondsEl) {
    let targetDate;

    // Use localStorage to keep the same airdrop time across visits
    if (localStorage.getItem('grandmacoinAirdrop')) {
      targetDate = new Date(localStorage.getItem('grandmacoinAirdrop'));
    } else {
      // First time: set next airdrop to 7 days from now at 3 PM
      targetDate = new Date();
      targetDate.setDate(targetDate.getDate() + 7);
      targetDate.setHours(15, 0, 0, 0); // 3:00 PM
      localStorage.setItem('grandmacoinAirdrop', targetDate.toISOString());
    }

    // Update countdown every second
    function updateCountdown() {
      const now = new Date();
      const diff = targetDate - now;

      if (diff <= 0) {
        // Timer ended
        if (daysEl) daysEl.textContent = '00';
        if (hoursEl) hoursEl.textContent = '00';
        if (minutesEl) minutesEl.textContent = '00';
        if (secondsEl) secondsEl.textContent = '00';
        
        if (messageEl) {
          messageEl.innerHTML = '<strong>🍪 Grandma just dropped 10M GMC!</strong><br>Thanks for being part of the family!';
        }
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
      if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
      if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
      if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
    }

    // Initial update
    updateCountdown();

    // Update every second
    setInterval(updateCountdown, 1000);
  }

  // === ANIMATIONS ON SCROLL ===
  const animateOnScroll = () => {
    document.querySelectorAll('.token-item, .about-image').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100 && rect.bottom > 0) {
        el.style.opacity = '1';
        el.style.transform = el.classList.contains('about-image') ? 'rotate(0deg)' : 'translateY(0)';
      }
    });
  };

  // Set initial state for animation
  document.querySelectorAll('.token-item, .about-image').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = el.classList.contains('about-image') ? 'rotate(-3deg)' : 'translateY(20px)';
    el.style.transition = 'all 0.7s ease';
  });

  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll(); // Initial check

  // === TWITCH EMBED (only if .twitch-embed exists and is empty) ===
  const twitchEmbed = document.querySelector('.twitch-embed');
  if (twitchEmbed && !twitchEmbed.querySelector('iframe')) {
    const iframe = document.createElement('iframe');
    iframe.src = 'https://player.twitch.tv/?channel=grandmacoinlive&parent=localhost&muted=false';
    iframe.frameBorder = '0';
    iframe.allow = 'autoplay; fullscreen';
    iframe.style.width = '100%';
    iframe.style.height = '500px';
    iframe.style.borderRadius = '15px';
    iframe.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
    twitchEmbed.appendChild(iframe);
  }

  // === UPDATE YEAR ===
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});