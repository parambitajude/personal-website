
document.addEventListener("DOMContentLoaded", () => {

    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");
    const navigationLinks = document.querySelectorAll(".nav-links a");

    // Stop if navigation elements do not exist.
    if (!menuToggle || !navLinks) {
        console.warn("Navigation elements were not found.");
        return;
    }

    // 1. Open and close the mobile menu.
    menuToggle.addEventListener("click", () => {

        const isOpen = navLinks.classList.toggle("active");

        menuToggle.setAttribute("aria-expanded", isOpen);

        menuToggle.textContent = isOpen ? "✕" : "☰";

    });

    // 2. Close the menu after clicking a navigation link.
    navigationLinks.forEach((link) => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");

            menuToggle.textContent = "☰";

        });

    });

    // 3. Close the menu when clicking outside.
    document.addEventListener("click", (event) => {

        const clickedInsideMenu = navLinks.contains(event.target);

        const clickedToggle = menuToggle.contains(event.target);

        if (!clickedInsideMenu && !clickedToggle) {

            navLinks.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");

            menuToggle.textContent = "☰";

        }

    });

    // 4. Close the mobile menu when resizing to desktop.
    window.addEventListener("resize", () => {

        if (window.innerWidth > 768) {

            navLinks.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");

            menuToggle.textContent = "☰";

        }

    });

    // 5. Update the active navigation link.
    function updateActiveLink() {

        const currentHash = window.location.hash || "#home";

        navigationLinks.forEach((link) => {

            const href = link.getAttribute("href");

            if (href && href.startsWith("#")) {
                link.classList.toggle("active", href === currentHash);
            }

        });

    }

    updateActiveLink();

    window.addEventListener("hashchange", updateActiveLink);

    console.log("Navigation functionality loaded successfully.");

});
