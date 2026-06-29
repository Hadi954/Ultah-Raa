        const petalEmojis = ['🌸', '🌷', '✿', '❀', '🌺', '✦', '·'];
        const container = document.getElementById('petals');
        for (let i = 0; i < 22; i++) {
            const p = document.createElement('div');
            p.className = 'petal';
            p.textContent = petalEmojis[Math.floor(Math.random() * petalEmojis.length)];
            p.style.left = Math.random() * 100 + '%';
            p.style.fontSize = (12 + Math.random() * 14) + 'px';
            p.style.animationDuration = (8 + Math.random() * 12) + 's';
            p.style.animationDelay = (Math.random() * 10) + 's';
            container.appendChild(p);
        }

        const music = document.getElementById('bg-music');
        const musicBtn = document.getElementById('music-toggle');
        const musicMenu = document.getElementById('music-menu');
        let isPlaying = false;

        function toggleMusicMenu() {
            if (isPlaying) {
                pauseMusic();
            } else {
                musicMenu.classList.toggle('active');
            }
        }

        function playSong(filename, element) {
            document.querySelectorAll('.song-item').forEach(item => item.classList.remove('active-song'));
            if (element) element.classList.add('active-song');

            const currentSrc = music.getAttribute('src');
            // Decode URI component to compare properly just in case
            if (decodeURIComponent(currentSrc) !== decodeURIComponent(filename)) {
                music.src = filename;
            }

            music.play();
            musicBtn.classList.add('playing');
            isPlaying = true;
            musicMenu.classList.remove('active');
        }

        function pauseMusic() {
            music.pause();
            musicBtn.classList.remove('playing');
            isPlaying = false;
            musicMenu.classList.remove('active');
        }

        document.addEventListener('click', function (e) {
            if (!e.target.closest('.music-player-container')) {
                musicMenu.classList.remove('active');
            }
        });

        // Theme Toggle Logic
        const themeToggleBtn = document.getElementById('theme-toggle');
        
        let currentTheme = 'light';
        try {
            currentTheme = localStorage.getItem('theme') || 'light';
        } catch (e) {
            console.log("Local storage tidak bisa diakses");
        }

        if (currentTheme === 'dark') {
            document.body.classList.add('dark-theme');
            if (themeToggleBtn) themeToggleBtn.textContent = '☀️';
        }

        if (themeToggleBtn) {
            themeToggleBtn.addEventListener('click', () => {
                document.body.classList.toggle('dark-theme');
                let theme = 'light';
                if (document.body.classList.contains('dark-theme')) {
                    theme = 'dark';
                    themeToggleBtn.textContent = '☀️';
                } else {
                    themeToggleBtn.textContent = '🌙';
                }
                
                try {
                    localStorage.setItem('theme', theme);
                } catch (e) {}
            });
        }

        // Cake Logic
        const cakeContainer = document.getElementById('cake-container');
        const flame = document.getElementById('flame');
        const confettiContainer = document.getElementById('confetti-container');
        const reopenLetterBtn = document.getElementById('reopen-letter-btn');
        let blownOut = false;

        if (cakeContainer && flame) {
            cakeContainer.addEventListener('click', () => {
                if (!blownOut) {
                    flame.classList.add('blown-out');
                    blownOut = true;
                    createConfetti();
                    
                    // Change text
                    const title = document.querySelector('#cake-section .section-title');
                    const desc = document.querySelector('#cake-section p');
                    if (title) title.textContent = "Yeay! Happy Birthday! 🎉";
                    if (desc) desc.textContent = "Semoga semua doa dan harapan dede terkabul yaa 🤍";
                    
                    if (reopenLetterBtn) {
                        reopenLetterBtn.style.display = 'inline-flex';
                    }

                    // Show Letter Modal after delay
                    setTimeout(() => {
                        const letterModal = document.getElementById('birthday-letter-modal');
                        if (letterModal) {
                            letterModal.classList.add('active');
                        }
                    }, 1200);
                }
            });
        }
        
        // Letter Modal Close Logic
        const closeLetterBtn = document.getElementById('close-letter');
        const letterModal = document.getElementById('birthday-letter-modal');
        if (closeLetterBtn && letterModal) {
            closeLetterBtn.addEventListener('click', () => {
                letterModal.classList.remove('active');
            });
            letterModal.addEventListener('click', (e) => {
                if (e.target === letterModal) {
                    letterModal.classList.remove('active');
                }
            });
        }

        if (reopenLetterBtn && letterModal) {
            reopenLetterBtn.addEventListener('click', () => {
                letterModal.classList.add('active');
            });
        }

        function createConfetti() {
            const colors = ['#e8899a', '#f5c6cf', '#c4748a', '#ffb6b9', '#fae3d9'];
            for (let i = 0; i < 60; i++) {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
                
                // Random properties
                const tx = (Math.random() - 0.5) * 400 + 'px';
                const ty = (Math.random() - 1) * 350 + 'px';
                const rot = Math.random() * 360 + 'deg';
                
                confetti.style.setProperty('--tx', tx);
                confetti.style.setProperty('--ty', ty);
                confetti.style.setProperty('--rot', rot);
                
                // Random shapes (circle or square)
                if (Math.random() > 0.5) {
                    confetti.style.borderRadius = '50%';
                }
                
                confetti.style.animation = `popConfetti ${0.6 + Math.random() * 0.5}s ease-out forwards`;
                
                if (confettiContainer) {
                    confettiContainer.appendChild(confetti);
                }
            }
        }

        // Hamburger Menu Toggle (Mobile)
        const hamburgerBtn = document.getElementById('nav-hamburger');
        const navLinks = document.getElementById('nav-links');

        if (hamburgerBtn && navLinks) {
            hamburgerBtn.addEventListener('click', () => {
                navLinks.classList.toggle('open');
                hamburgerBtn.textContent = navLinks.classList.contains('open') ? '✕' : '☰';
            });

            // Tutup menu saat link diklik
            navLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('open');
                    hamburgerBtn.textContent = '☰';
                });
            });
        }
