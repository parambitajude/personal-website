
document.addEventListener("DOMContentLoaded", () => {
    const galleryItems = Array.from(
        document.querySelectorAll(".gallery-item")
    );

    const filterButtons = document.querySelectorAll(".filter-btn");

    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightbox-image");
    const lightboxTitle = document.getElementById("lightbox-title");
    const lightboxDescription = document.getElementById(
        "lightbox-description"
    );

    const closeButton = document.getElementById("lightbox-close");
    const previousButton = document.getElementById("lightbox-prev");
    const nextButton = document.getElementById("lightbox-next");

    let currentFilter = "all";
    let visibleItems = [];
    let currentIndex = 0;
    let previousActiveElement = null;

    // Get all gallery items that match the selected category.
    function updateVisibleItems() {
        visibleItems = galleryItems.filter((item) => {
            return (
                currentFilter === "all" ||
                item.dataset.category === currentFilter
            );
        });
    }

    // Category filter buttons.
    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            currentFilter = button.dataset.filter;

            filterButtons.forEach((filterButton) => {
                const isActive = filterButton === button;

                filterButton.classList.toggle("active", isActive);
                filterButton.setAttribute(
                    "aria-pressed",
                    String(isActive)
                );
            });

            galleryItems.forEach((item) => {
                const shouldShow =
                    currentFilter === "all" ||
                    item.dataset.category === currentFilter;

                item.classList.toggle("hidden", !shouldShow);
            });

            updateVisibleItems();
        });
    });

    // Display the selected image in the lightbox.
    function showImage(index) {
        if (visibleItems.length === 0) return;

        currentIndex =
            (index + visibleItems.length) % visibleItems.length;

        const item = visibleItems[currentIndex];

        const image = item.querySelector(".gallery-image-wrapper img");
        const title = item.querySelector(".gallery-overlay h3");
        const description = item.querySelector(".gallery-overlay p");

        if (!image) return;

        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt || "Gallery image";

        lightboxTitle.textContent = title
            ? title.textContent
            : "Gallery Image";

        lightboxDescription.textContent = description
            ? description.textContent
            : "";

        previousButton.disabled = visibleItems.length <= 1;
        nextButton.disabled = visibleItems.length <= 1;
    }

    // Open the lightbox.
    function openLightbox(item) {
        updateVisibleItems();

        currentIndex = visibleItems.indexOf(item);

        if (currentIndex === -1) return;

        previousActiveElement = document.activeElement;

        showImage(currentIndex);

        lightbox.classList.add("active");
        lightbox.setAttribute("aria-hidden", "false");

        document.body.style.overflow = "hidden";

        closeButton.focus();
    }

    // Close the lightbox.
    function closeLightbox() {
        lightbox.classList.remove("active");
        lightbox.setAttribute("aria-hidden", "true");

        document.body.style.overflow = "";

        lightboxImage.removeAttribute("src");

        if (previousActiveElement) {
            previousActiveElement.focus();
            previousActiveElement = null;
        }
    }

    // Open lightbox when clicking an image or view button.
    galleryItems.forEach((item) => {
        const imageWrapper = item.querySelector(
            ".gallery-image-wrapper"
        );

        if (imageWrapper) {
            imageWrapper.addEventListener("click", (event) => {
                event.preventDefault();
                openLightbox(item);
            });
        }
    });

    // Close button.
    closeButton.addEventListener("click", closeLightbox);

    // Previous image.
    previousButton.addEventListener("click", () => {
        showImage(currentIndex - 1);
    });

    // Next image.
    nextButton.addEventListener("click", () => {
        showImage(currentIndex + 1);
    });

    // Close when clicking the dark background.
    lightbox.addEventListener("click", (event) => {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard controls.
    document.addEventListener("keydown", (event) => {
        if (!lightbox.classList.contains("active")) return;

        if (event.key === "Escape") {
            closeLightbox();
        }

        if (event.key === "ArrowRight") {
            showImage(currentIndex + 1);
        }

        if (event.key === "ArrowLeft") {
            showImage(currentIndex - 1);
        }
    });

    // Initialize gallery.
    updateVisibleItems();

    filterButtons.forEach((button) => {
        button.setAttribute(
            "aria-pressed",
            String(button.classList.contains("active"))
        );
    });

    console.log("Gallery functionality loaded successfully.");
});
