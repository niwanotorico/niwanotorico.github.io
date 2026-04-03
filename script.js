// ちきとぴよ — script.js

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

// ==========================================
// YouTube Background Video (Hero)
// ==========================================
const YT_VIDEO_ID = 'sLvXMDp2dSc';

// Load YouTube IFrame API
const tag = document.createElement('script');
tag.src = 'https://www.youtube.com/iframe_api';
document.head.appendChild(tag);

let ytPlayer;

window.onYouTubeIframeAPIReady = function () {
  ytPlayer = new YT.Player('ytplayer', {
    videoId: YT_VIDEO_ID,
    playerVars: {
      autoplay: 1,
      mute: 1,
      controls: 0,
      showinfo: 0,
      rel: 0,
      loop: 1,
      playlist: YT_VIDEO_ID,   // loop requires playlist
      modestbranding: 1,
      iv_load_policy: 3,        // hide annotations
      disablekb: 1,
      fs: 0,
      playsinline: 1
    },
    events: {
      onReady: function (e) {
        e.target.mute();
        e.target.playVideo();
      },
      onStateChange: function (e) {
        // When video ends, restart (backup for loop)
        if (e.data === YT.PlayerState.ENDED) {
          e.target.playVideo();
        }
      }
    }
  });
};

// ==========================================
// Scroll fade-in animations
// ==========================================
const fadeTargets = document.querySelectorAll(
  '.character-card, .gallery-item, .world-text, .world-keywords, .world-motifs, .link-btn'
);

fadeTargets.forEach(el => el.classList.add('fade-in'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
});

fadeTargets.forEach(el => observer.observe(el));

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    navbar.style.boxShadow = '0 2px 20px rgba(139, 111, 71, 0.1)';
  } else {
    navbar.style.boxShadow = 'none';
  }
});
