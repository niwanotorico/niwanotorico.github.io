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
const TRIM_START = 2;   // 最初の2秒をカット
const TRIM_END = 2;     // 最後の2秒をカット

// Load YouTube IFrame API
const tag = document.createElement('script');
tag.src = 'https://www.youtube.com/iframe_api';
document.head.appendChild(tag);

let ytPlayer;
let videoDuration = 0;
let trimTimer = null;

window.onYouTubeIframeAPIReady = function () {
  ytPlayer = new YT.Player('ytplayer', {
    videoId: YT_VIDEO_ID,
    playerVars: {
      autoplay: 1,
      mute: 1,
      controls: 0,
      showinfo: 0,
      rel: 0,
      loop: 0,              // 手動ループで前後カット
      modestbranding: 1,
      iv_load_policy: 3,
      disablekb: 1,
      fs: 0,
      playsinline: 1,
      start: TRIM_START
    },
    events: {
      onReady: function (e) {
        e.target.mute();
        videoDuration = e.target.getDuration();
        e.target.seekTo(TRIM_START, true);
        e.target.playVideo();
        startTrimLoop();
      },
      onStateChange: function (e) {
        if (e.data === YT.PlayerState.PLAYING) {
          startTrimLoop();
        }
        if (e.data === YT.PlayerState.ENDED) {
          // 動画終了 → 先頭（+2秒）に戻してループ
          e.target.seekTo(TRIM_START, true);
          e.target.playVideo();
        }
      }
    }
  });
};

function startTrimLoop() {
  if (trimTimer) clearInterval(trimTimer);
  trimTimer = setInterval(function () {
    if (!ytPlayer || !ytPlayer.getCurrentTime) return;
    const current = ytPlayer.getCurrentTime();
    const endPoint = videoDuration - TRIM_END;
    // 終了2秒前に達したら先頭+2秒に戻す
    if (endPoint > 0 && current >= endPoint) {
      ytPlayer.seekTo(TRIM_START, true);
    }
  }, 300);
}

// ==========================================
// Book Viewer (絵本ビューアー)
// ==========================================
const BOOK_PAGES = 26;
let currentPage = 0;

function openBook() {
  currentPage = 0;
  updateBookPage();
  document.getElementById('bookViewer').classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function closeBook() {
  document.getElementById('bookViewer').classList.remove('is-open');
  document.body.style.overflow = '';
}

function bookPrev() {
  if (currentPage > 0) {
    currentPage--;
    updateBookPage();
  }
}

function bookNext() {
  if (currentPage < BOOK_PAGES - 1) {
    currentPage++;
    updateBookPage();
  }
}

function updateBookPage() {
  const pageNum = String(currentPage).padStart(2, '0');
  document.getElementById('bookPage').src = 'images/book/' + pageNum + '.jpg';
  document.getElementById('bookCounter').textContent = (currentPage + 1) + ' / ' + BOOK_PAGES;
  document.getElementById('bookPrev').disabled = currentPage === 0;
  document.getElementById('bookNext').disabled = currentPage === BOOK_PAGES - 1;
}

// キーボード操作
document.addEventListener('keydown', function (e) {
  const viewer = document.getElementById('bookViewer');
  if (!viewer.classList.contains('is-open')) return;
  if (e.key === 'ArrowLeft') bookPrev();
  if (e.key === 'ArrowRight') bookNext();
  if (e.key === 'Escape') closeBook();
});

// ==========================================
// Scroll fade-in animations
// ==========================================
const fadeTargets = document.querySelectorAll(
  '.character-card, .gallery-item, .book-card, .world-text, .world-keywords, .world-motifs, .link-btn'
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
