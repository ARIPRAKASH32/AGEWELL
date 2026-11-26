// AGEWELL Senior Independence Portal - Main Client Script

document.addEventListener('DOMContentLoaded', () => {
  init3DTilt();
  initVoiceAssistant();
  initAccessibilityControls();
  initNotificationPolling();
});

// 1. 3D Tilt Effect on cards
function init3DTilt() {
  const cards = document.querySelectorAll('.card-3d, .medicine-card-3d, .service-num-card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -7;
      const rotateY = ((x - centerX) / centerX) * 7;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });
}

// 2. Web Audio Synthesizer for alerts
function playTone(type) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    if (type === 'success') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc.frequency.exponentialRampToValueAtTime(659.25, ctx.currentTime + 0.15); // E5
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } else if (type === 'sos') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.setValueAtTime(440, ctx.currentTime + 0.25);
      gain.gain.setValueAtTime(0.5, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
      osc.start();
      osc.stop(ctx.currentTime + 0.5);
    }
  } catch(e) {
    console.log("AudioContext unavailable:", e);
  }
}

// 3. Senior Voice Assistant (Text to Speech)
function initVoiceAssistant() {
  const voiceBtn = document.getElementById('voice-assist-toggle');
  if (!voiceBtn) return;

  voiceBtn.addEventListener('click', () => {
    if (!('speechSynthesis' in window)) {
      alert("Speech synthesis is not supported in this browser.");
      return;
    }

    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      voiceBtn.innerHTML = '<i class="bi bi-volume-up-fill"></i> Read Reminders Aloud';
      return;
    }

    // Gather reminders text from page
    const reminderElements = document.querySelectorAll('[data-speakable]');
    let textToSpeak = "Hello! Here are your daily updates: ";
    
    if (reminderElements.length > 0) {
      reminderElements.forEach(el => {
        textToSpeak += el.innerText + ". ";
      });
    } else {
      textToSpeak += "You have no pending urgent alerts today. You are doing great!";
    }

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = 0.9; // Slower, clearer cadence for seniors
    utterance.pitch = 1.0;
    
    voiceBtn.innerHTML = '<i class="bi bi-stop-circle-fill text-danger"></i> Stop Speaking';
    
    utterance.onend = () => {
      voiceBtn.innerHTML = '<i class="bi bi-volume-up-fill"></i> Read Reminders Aloud';
    };

    window.speechSynthesis.speak(utterance);
  });
}

// 4. Accessibility Mode Switches
function initAccessibilityControls() {
  const toggleSeniorMode = document.getElementById('toggle-senior-size');
  if (toggleSeniorMode) {
    toggleSeniorMode.addEventListener('click', () => {
      document.body.classList.toggle('senior-mode');
      const isBig = document.body.classList.contains('senior-mode');
      localStorage.setItem('agewell_senior_size', isBig ? '1' : '0');
    });
    if (localStorage.getItem('agewell_senior_size') === '1') {
      document.body.classList.add('senior-mode');
    }
  }
}

// 5. Notification polling
function initNotificationPolling() {
  const badge = document.getElementById('unread-notif-count');
  if (!badge) return;

  setInterval(() => {
    fetch('/api/notifications/unread-count')
      .then(res => res.json())
      .then(data => {
        if (data.count > 0) {
          badge.innerText = data.count;
          badge.classList.remove('d-none');
        } else {
          badge.classList.add('d-none');
        }
      })
      .catch(err => console.log('Notif poll err', err));
  }, 12000);
}

// 6. SOS Countdown & Escalation Simulator
function initSOSCountdown(secondsRemaining, escalationStep, totalSteps) {
  const timerDisplay = document.getElementById('sos-countdown');
  const stepBadge = document.getElementById('escalation-step-badge');
  if (!timerDisplay) return;

  let left = secondsRemaining;
  const interval = setInterval(() => {
    if (left <= 0) {
      clearInterval(interval);
      timerDisplay.innerText = "Escalating to next priority contact...";
      playTone('sos');
      setTimeout(() => {
        window.location.reload();
      }, 1500);
      return;
    }
    const mins = Math.floor(left / 60);
    const secs = left % 60;
    timerDisplay.innerText = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    left--;
  }, 1000);
}

// 7. Demo Account Fast Login Switcher
function fillDemoLogin(role, autoSubmit = false) {
  const emailInput = document.getElementById('login-email');
  const passInput = document.getElementById('login-password');
  if (!emailInput || !passInput) return;

  const credentials = {
    'senior': { email: 'senior@agewell.com', pass: 'password123' },
    'family': { email: 'family@agewell.com', pass: 'password123' },
    'doctor': { email: 'doctor@agewell.com', pass: 'password123' },
    'admin':  { email: 'admin@agewell.com',  pass: 'password123' }
  };

  const creds = credentials[role];
  if (!creds) return;

  emailInput.value = creds.email;
  passInput.value = creds.pass;

  if (typeof playTone === 'function') playTone('success');

  if (autoSubmit) {
    const form = emailInput.closest('form');
    if (form) form.submit();
  }
}

// 8. Dynamic Theme Switcher System
function initTheme() {
  const savedTheme = localStorage.getItem('agewell_theme') || 'forest';
  setAppTheme(savedTheme, false);
}

window.setAppTheme = function(themeName, save = true) {
  if (themeName === 'oceanic') {
    document.documentElement.removeAttribute('data-theme');
  } else {
    document.documentElement.setAttribute('data-theme', themeName);
  }
  if (save) {
    localStorage.setItem('agewell_theme', themeName);
    playTone('success');
  }
};

// 9. Global Interactive 3D Container Spotlight & Touch Physics
function initInteractive3DCards() {
  const cards = document.querySelectorAll('.card-3d, .service-num-card');
  cards.forEach((card) => {
    card.addEventListener('pointermove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

// 10. Scroll-Triggered 3D Reveals (GPU-Accelerated)
function initScrollReveals() {
  const targets = document.querySelectorAll('.card-3d, .service-num-card');
  if (!targets.length || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
  );

  targets.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      el.classList.add('is-visible');
    } else {
      el.classList.add('reveal-3d');
      observer.observe(el);
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initInteractive3DCards();
  initScrollReveals();
});
