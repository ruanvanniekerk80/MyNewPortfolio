document.addEventListener('DOMContentLoaded', () => {

    // -----------------------------------------------------------------
    // 1. MODAL COMPONENT CONTROLS (PROJECTS)
    // -----------------------------------------------------------------
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const modal = document.getElementById('projectModal');
    const closeModalBtn = document.getElementById('closeModal');

    const modalTitle = document.getElementById('modalTitle');
    const modalIcon = document.getElementById('modalIcon');
    const modalVisualBlock = document.getElementById('modalVisualBlock');
    const modalInnerIcon = document.getElementById('modalInnerIcon');
    const modalDescription = document.getElementById('modalDescription');
    
    // Targeted link components
    const modalProjectLink = document.getElementById('modalProjectLink'); // Clickable picture wrapper
    const modalLinkBtn = document.getElementById('modalLinkBtn');         // Targeted view button
    const modalGithubBtn = document.getElementById('modalGithubBtn');     // Round GitHub button

    portfolioItems.forEach(item => {
        item.addEventListener('click', () => {
            const title = item.getAttribute('data-title');
            const desc = item.getAttribute('data-desc');
            const iconClass = item.getAttribute('data-icon');
            const projectLink = item.getAttribute('data-link'); // Extract deployment link
            const repoLink = item.getAttribute('data-repo');   // Extract source repository link
            const colorClass = Array.from(item.classList).find(cls => cls.startsWith('item-'));

            if (modalTitle) modalTitle.textContent = title;
            if (modalDescription) modalDescription.textContent = desc;
            if (modalIcon) modalIcon.className = `fa-solid ${iconClass}`;
            if (modalInnerIcon) modalInnerIcon.className = `fa-solid ${iconClass}`;

            // Map extracted data link onto the clickable visual picture block link
            if (modalProjectLink) {
                modalProjectLink.href = projectLink || '#';
            }

            // Map extracted data link onto button element target destination
            if (modalLinkBtn) {
                if (projectLink) {
                    modalLinkBtn.href = projectLink;
                    modalLinkBtn.style.display = 'inline-block'; // Show if link exists
                } else {
                    modalLinkBtn.style.display = 'none'; // Hide cleanly if empty
                }
            }

            // Map extracted data repository link onto the round GitHub link button
            if (modalGithubBtn) {
                if (repoLink) {
                    modalGithubBtn.href = repoLink;
                    modalGithubBtn.style.display = 'inline-flex'; // Show round circle
                } else {
                    modalGithubBtn.style.display = 'none'; // Hide cleanly if no repository exists
                }
            }

            if (modalVisualBlock) {
                modalVisualBlock.className = 'modal-preview-card';
                if (colorClass) {
                    modalVisualBlock.classList.add(colorClass);
                }
            }

            if (modal) {
                modal.classList.add('open');
            }
            document.body.style.overflow = 'hidden';
        });
    });

    const closeModal = () => {
        if (modal) modal.classList.remove('open');
        document.body.style.overflow = '';
    };

    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    // -----------------------------------------------------------------
    // 2. SCROLL SPY EFFECT LOGIC (HOMEPAGE ONLY)
    // -----------------------------------------------------------------
    const sections = document.querySelectorAll('.homepage-section');
    const navLinks = document.querySelectorAll('.nav-item-link');

    if (sections.length > 0 && navLinks.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '-30% 0px -60% 0px',
            threshold: 0
        };

        const observerCallback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const activeId = entry.target.getAttribute('id');

                    navLinks.forEach(link => link.classList.remove('highlight-active'));

                    const matchingLink = document.getElementById(`nav-${activeId}`);
                    if (matchingLink) {
                        matchingLink.classList.add('highlight-active');
                    }
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        sections.forEach(section => observer.observe(section));
    }

    // -----------------------------------------------------------------
    // 3. TOP OF SCREEN SCROLL RESET
    // -----------------------------------------------------------------
    window.addEventListener('scroll', () => {
        if (window.scrollY < 200) {
            navLinks.forEach(link => {
                link.classList.remove('highlight-active');
            });
        }
    });

    // -----------------------------------------------------------------
    // 4. CERTIFICATION MODAL CONTROLLER
    // -----------------------------------------------------------------
    const certModal = document.getElementById('certModal');
    const certModalTitle = document.getElementById('certModalTitle');
    const certModalImg = document.getElementById('certModalImg');
    const closeCertModalBtn = document.getElementById('closeCertModal');
    const certCards = document.querySelectorAll('.cert-card');

    certCards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.getAttribute('data-cert-title');
            const imgSrc = card.getAttribute('data-cert-img');

            if (certModalTitle) certModalTitle.textContent = title;
            if (certModalImg) certModalImg.src = imgSrc;

            if (certModal) {
                certModal.classList.add('open');
            }
            document.body.style.overflow = 'hidden';
        });
    });

    const closeCertModal = () => {
        if (certModal) certModal.classList.remove('open');
        document.body.style.overflow = '';
    };

    if (closeCertModalBtn) closeCertModalBtn.addEventListener('click', closeCertModal);

    if (certModal) {
        certModal.addEventListener('click', (e) => {
            if (e.target === certModal) closeCertModal();
        });
    }

    // Shared Escape Key Listener for both Modals
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (modal && modal.classList.contains('open')) {
                closeModal();
            }
            if (certModal && certModal.classList.contains('open')) {
                closeCertModal();
            }
        }
    });

});