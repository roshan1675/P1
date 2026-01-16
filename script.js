// Global variables
let isPlaying = false;
let audio = null;
let musicNotesInterval = null;

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
});

// Initialize page-specific functionality
function initializePage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Create floating hearts on all pages
    createFloatingHearts();
    
    // Create sparkle effects
    createSparkleEffects();
    
    // Initialize page-specific features
    if (currentPage === 'index.html' || currentPage === '') {
        initializeGiftPage();
    } else if (currentPage === 'page2.html') {
        initializeMessagePage();
    } else if (currentPage === 'page3.html') {
        initializeMusicPage();
    } else if (currentPage === 'page4.html') {
        initializeThankYouPage();
    }
}

// Create floating hearts periodically
function createFloatingHearts() {
    setInterval(() => {
        createHeart();
    }, 500);
}

// Create a single floating heart
function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.textContent = '💕';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = (Math.random() * 2 + 2) + 's';
    document.body.appendChild(heart);
    
    setTimeout(() => heart.remove(), 3000);
}

// Create sparkle effects
function createSparkleEffects() {
    setInterval(() => {
        const sparkles = ['✨', '💫', '⭐', '🌟'];
        const sparkle = document.createElement('div');
        sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
        sparkle.style.position = 'fixed';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.fontSize = '1.5rem';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '100';
        sparkle.style.animation = 'float 2s ease-out forwards';
        document.body.appendChild(sparkle);
        
        setTimeout(() => sparkle.remove(), 2000);
    }, 2000);
}

// Initialize Gift Page (Page 1)
function initializeGiftPage() {
    // Gift boxes are initialized via onclick handlers
    console.log('Gift page initialized');
}

// Open gift function
function openGift(element) {
    if (element.classList.contains('opened')) return;
    
    element.classList.add('opened');
    const wrapper = element.querySelector('.gift-wrapper');
    wrapper.classList.add('opened');
    
    // Create confetti effect
    for (let i = 0; i < 10; i++) {
        setTimeout(() => createHeart(), i * 100);
    }
    
    // Add sound effect (optional)
    playGiftSound();
}

// Play gift opening sound
function playGiftSound() {
    // You can add a sound effect here if desired
    // const sound = new Audio('gift-open.mp3');
    // sound.play().catch(e => console.log('Sound play failed'));
}

// Reveal special message - navigate to page 2
function revealSpecial(event) {
    if (event) {
        event.preventDefault();
    }
    
    const button = document.querySelector('.special-button');
    if (button) {
        button.classList.add('clicked');
        
        setTimeout(() => {
            window.location.href = 'page2.html';
        }, 500);
    } else {
        // If button not found, navigate directly
        setTimeout(() => {
            window.location.href = 'page2.html';
        }, 500);
    }
}

// Initialize Message Page (Page 2)
function initializeMessagePage() {
    // Manual navigation only - no auto-advance
    // Add typing effect to message (optional enhancement)
    addTypingEffect();
}

// Add typing effect to message
function addTypingEffect() {
    const messageText = document.querySelector('.message-text');
    if (messageText) {
        const originalText = messageText.innerHTML;
        messageText.innerHTML = '';
        messageText.style.opacity = '1';
        
        // Simple fade-in instead of typing for better UX
        setTimeout(() => {
            messageText.innerHTML = originalText;
        }, 500);
    }
}

// Initialize Music Page (Page 3)
function initializeMusicPage() {
    // Music player is initialized via onclick handlers
    console.log('Music page initialized');
    
    // Auto-play option (commented out - uncomment if desired)
    // setTimeout(() => {
    //     toggleMusic();
    // }, 1000);
}

// Toggle music play/pause
function toggleMusic() {
    const btn = document.getElementById('playPauseBtn');
    const vinyl = document.getElementById('vinylRecord');
    const visualizerBars = document.querySelectorAll('.visualizer-bar');
    const musicInfo = document.getElementById('musicInfo');

    if (!isPlaying) {
        // Create audio element
        // Using Ed Sheeran - Perfect
        audio = new Audio('Edd_Sheeran_-_Perfect_(mp3.pm).mp3');
        
        // Handle audio events
        audio.addEventListener('ended', () => {
            stopMusic();
        });
        
        audio.addEventListener('error', (e) => {
            console.log('Audio error:', e);
            // If audio fails, just show animations
            startMusicAnimations();
        });
        
        audio.play().catch(e => {
            console.log('Audio play failed:', e);
            // If audio fails, just show animations
            startMusicAnimations();
        });
        
        if (btn) btn.textContent = '⏸️';
        if (vinyl) vinyl.classList.add('playing');
        visualizerBars.forEach(bar => bar.classList.remove('paused'));
        if (musicInfo) musicInfo.textContent = '🎵 Now Playing: Perfect - Ed Sheeran 🎵';
        isPlaying = true;
        
        // Create floating music notes
        startMusicNotes();
    } else {
        stopMusic();
    }
}

// Stop music
function stopMusic() {
    if (audio) {
        audio.pause();
        audio.currentTime = 0;
    }
    
    const btn = document.getElementById('playPauseBtn');
    const vinyl = document.getElementById('vinylRecord');
    const visualizerBars = document.querySelectorAll('.visualizer-bar');
    const musicInfo = document.getElementById('musicInfo');
    
    if (btn) btn.textContent = '▶️';
    if (vinyl) vinyl.classList.remove('playing');
    visualizerBars.forEach(bar => bar.classList.add('paused'));
    if (musicInfo) musicInfo.textContent = 'Music paused. Click play to continue! 🎶';
    isPlaying = false;
    
    // Stop music notes
    if (musicNotesInterval) {
        clearInterval(musicNotesInterval);
        musicNotesInterval = null;
    }
}

// Start music animations (when audio fails)
function startMusicAnimations() {
    const vinyl = document.getElementById('vinylRecord');
    const visualizerBars = document.querySelectorAll('.visualizer-bar');
    if (vinyl) vinyl.classList.add('playing');
    visualizerBars.forEach(bar => bar.classList.remove('paused'));
}

// Start floating music notes
function startMusicNotes() {
    if (musicNotesInterval) {
        clearInterval(musicNotesInterval);
    }
    
    musicNotesInterval = setInterval(() => {
        if (!isPlaying) {
            clearInterval(musicNotesInterval);
            return;
        }
        
        const notes = ['🎵', '🎶', '🎼', '🎹', '🎤'];
        const note = document.createElement('div');
        note.className = 'music-notes';
        note.textContent = notes[Math.floor(Math.random() * notes.length)];
        note.style.left = Math.random() * 100 + '%';
        note.style.top = '50%';
        
        const musicContainer = document.querySelector('.music-player-card');
        if (musicContainer) {
            musicContainer.appendChild(note);
            
            setTimeout(() => note.remove(), 3000);
        }
    }, 800);
}

// Navigate to next page
function navigateToNextPage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    if (currentPage === 'index.html' || currentPage === '') {
        window.location.href = 'page2.html';
    } else if (currentPage === 'page2.html') {
        window.location.href = 'page3.html';
    } else if (currentPage === 'page3.html') {
        window.location.href = 'page4.html';
    }
}

// Initialize Thank You Page (Page 4)
function initializeThankYouPage() {
    // Add extra animations or effects
    console.log('Thank you page initialized');
    
    // Create extra hearts on thank you page
    setInterval(() => {
        createHeart();
    }, 300);
}

// Utility function to add page transition effects
function addPageTransition() {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s';
        document.body.style.opacity = '1';
    }, 100);
}

// Handle page visibility changes (pause music when tab is hidden)
document.addEventListener('visibilitychange', function() {
    if (document.hidden && isPlaying && audio) {
        // Optionally pause music when tab is hidden
        // toggleMusic();
    }
});
