document.addEventListener('DOMContentLoaded', () => {
    const googleButton = document.getElementById('google-btn');
    const card = document.getElementById('signin-card');
    const confirmation = document.getElementById('signin-confirmation');
    const resetButton = document.getElementById('reset-btn');
    const focusLogin = document.querySelector('[data-focus-login]');
    const buttonCopy = googleButton?.querySelector('.button-copy');

    const returnToReadyState = () => {
        if (card) card.hidden = false;
        if (confirmation) confirmation.hidden = true;
        if (googleButton) {
            googleButton.disabled = false;
            googleButton.classList.remove('is-connecting');
            googleButton.focus();
        }
        if (buttonCopy) buttonCopy.textContent = 'Continue with Google';
    };

    googleButton?.addEventListener('click', () => {
        googleButton.disabled = true;
        googleButton.classList.add('is-connecting');
        if (buttonCopy) buttonCopy.textContent = 'Opening your edition…';

        window.setTimeout(() => {
            if (card) card.hidden = true;
            if (confirmation) {
                confirmation.hidden = false;
                confirmation.querySelector('.return-button')?.focus();
            }
        }, 1050);
    });

    resetButton?.addEventListener('click', returnToReadyState);

    focusLogin?.addEventListener('click', () => {
        const signinCard = document.getElementById('signin-card');
        if (signinCard) {
            signinCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        window.setTimeout(() => googleButton?.focus(), 450);
    });
});


document.addEventListener('DOMContentLoaded', () => {
    // --- SCROLL ANIMATIONS ---
    const revealEls = document.querySelectorAll('.reveal-on-scroll');
    if (!revealEls.length) return;

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    if ('IntersectionObserver' in window) {
        const scrollObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        revealEls.forEach(el => scrollObserver.observe(el));
    } else {
        revealEls.forEach(el => el.classList.add('is-visible'));
    }
});


document.addEventListener('DOMContentLoaded', () => {
    // --- LIVE DASHBOARD SIMULATION ---
    const scannedEl = document.querySelector('.metric-box:nth-child(2) strong');
    const dedupEl = document.querySelector('.metric-box:nth-child(3) strong');
    
    if (scannedEl && dedupEl) {
        let scanned = 612;
        let dedup = 89;
        
        setInterval(() => {
            if (Math.random() > 0.4) {
                scanned += Math.floor(Math.random() * 4) + 1;
                scannedEl.textContent = String(scanned);
                
                if (Math.random() > 0.7) {
                    dedup += 1;
                    dedupEl.textContent = String(dedup);
                }
                
                scannedEl.style.color = 'var(--red)';
                setTimeout(() => { if (scannedEl) scannedEl.style.color = ''; }, 300);
            }
        }, 1500);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // --- REFINED REALISTIC TYPEWRITER SIMULATION ---
    const phrases = [
        "The world shifted while you slept.",
        "Mr. News captured the signal.",
        "Pure intelligence. Zero noise."
    ];
    const typeEl = document.getElementById('typewriter-text');
    const cursorEl = document.querySelector('.type-cursor');
    
    if (typeEl && cursorEl) {
        cursorEl.textContent = '█'; // Vintage block cursor
        
        let pIndex = 0;
        let cIndex = 0;
        let deleting = false;
        
        function realisticTypeWriter() {
            if (!typeEl) return;
            const currentPhrase = phrases[pIndex];
            
            if (deleting) {
                typeEl.textContent = currentPhrase.substring(0, cIndex - 1);
                cIndex--;
            } else {
                typeEl.textContent = currentPhrase.substring(0, cIndex + 1);
                cIndex++;
                
                if (cIndex % 4 === 0 && typeEl.parentElement) {
                    typeEl.parentElement.style.transform = 'translateY(1px)';
                    setTimeout(() => {
                        if (typeEl.parentElement) typeEl.parentElement.style.transform = 'translateY(0)';
                    }, 30);
                }
            }
            
            let speed = deleting ? 25 : (Math.random() * 50 + 50);
            if (!deleting && Math.random() > 0.85) speed += 180; 
            
            if (!deleting && cIndex === currentPhrase.length) {
                speed = 4000;
                deleting = true;
            } else if (deleting && cIndex === 0) {
                deleting = false;
                pIndex = (pIndex + 1) % phrases.length;
                speed = 1000;
            }
            
            setTimeout(realisticTypeWriter, speed);
        }
        
        setTimeout(realisticTypeWriter, 1500);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // --- SUPPORT WIDGET TOGGLE ---
    const fabToggle = document.getElementById('fab-toggle');
    const fabClose = document.getElementById('fab-close');
    const supportMenu = document.getElementById('support-menu');
    
    if (fabToggle && supportMenu) {
        fabToggle.addEventListener('click', () => {
            supportMenu.classList.toggle('is-open');
        });
        
        if (fabClose) {
            fabClose.addEventListener('click', () => {
                supportMenu.classList.remove('is-open');
            });
        }
    }
});
// MR NEWS — Executive Morning Intelligence Platform
