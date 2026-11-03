
document.addEventListener("DOMContentLoaded", () => {

    // =========================================
    // 1. CHECK REDUCED MOTION PREFERENCE
    // =========================================

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    const animatedElements = document.querySelectorAll(".reveal");

    // Show everything immediately if reduced motion is enabled.
    if (reduceMotion || !("IntersectionObserver" in window)) {

        animatedElements.forEach((element) => {
            element.classList.add("show");
        });

        return;
    }


    // =========================================
    // 2. ADD STAGGERED ANIMATION TO CARD GROUPS
    // =========================================

    const cardGroups = document.querySelectorAll(
        ".education-grid, " +
        ".skills-grid, " +
        ".reasons-grid, " +
        ".gallery-grid, " +
        ".dream-skills-grid"
    );

    cardGroups.forEach((group) => {

        const cards = group.querySelectorAll(
            ".education-card, " +
            ".skills-card, " +
            ".reason-card, " +
            ".gallery-item, " +
            ".dream-skill-card"
        );

        cards.forEach((card, index) => {

            card.classList.add("reveal");

            // Delay each card slightly.
            card.style.setProperty(
                "--reveal-delay",
                `${Math.min(index * 100, 500)}ms`
            );

        });

    });


    // =========================================
    // 3. INTERSECTION OBSERVER
    // =========================================

    const observer = new IntersectionObserver(
        (entries, observerInstance) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    // Animate only once.
                    observerInstance.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -50px 0px"
        }
    );


    // =========================================
    // 4. OBSERVE ALL REVEAL ELEMENTS
    // =========================================

    animatedElements.forEach((element) => {
        observer.observe(element);
    });

    // Also observe cards that received reveal dynamically.
    cardGroups.forEach((group) => {

        const cards = group.querySelectorAll(".reveal");

        cards.forEach((card) => {
            observer.observe(card);
        });

    });


    // =========================================
    // 5. PAGE LOAD ANIMATION
    // =========================================

    document.body.classList.add("page-loaded");


    console.log("Enhanced website animations loaded successfully.");

});
