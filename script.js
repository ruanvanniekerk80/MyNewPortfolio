document.addEventListener('DOMContentLoaded', () => {
    // -----------------------------------------------------------------
    // 1. MODAL COMPONENT CONTROLS
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
    const modalLinkBtn = document.getElementById('modalLinkBtn');         // Targeted view button (index.html only)

    portfolioItems.forEach(item => {
        item.addEventListener('click', () => {
            const title = item.getAttribute('data-title');
            const desc = item.getAttribute('data-desc');
            const iconClass = item.getAttribute('data-icon');
            const projectLink = item.getAttribute('data-link'); // Extract destination link
            const colorClass = Array.from(item.classList).find(cls => cls.startsWith('item-'));

            if (modalTitle) modalTitle.textContent = title;
            if (modalDescription) modalDescription.textContent = desc;
            if (modalIcon) modalIcon.className = `fa-solid ${iconClass}`;
            if (modalInnerIcon) modalInnerIcon.className = `fa-solid ${iconClass}`;

            // Map extracted data link onto the clickable visual picture block link
            if (modalProjectLink) {
                modalProjectLink.href = projectLink || '#';
            }

            // Map extracted data link onto button element target destination (if it exists on index.html)
            if (modalLinkBtn) {
                if (projectLink) {
                    modalLinkBtn.href = projectLink;
                    modalLinkBtn.style.display = 'inline-block'; // Show if link exists
                } else {
                    modalLinkBtn.style.display = 'none'; // Hide cleanly if empty
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

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
            closeModal();
        }
    });

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
});