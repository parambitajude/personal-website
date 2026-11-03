
document.addEventListener("DOMContentLoaded", () => {

    // Smooth scrolling for the Explore My Dream button.
    const exploreButton = document.querySelector(
        '.dream-hero a[href="#about-career"]'
    );

    if (exploreButton) {
        exploreButton.addEventListener("click", (event) => {
            event.preventDefault();

            const targetSection = document.getElementById("about-career");

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    }

    // Handle the dream career image.
    const careerImage = document.querySelector(
        ".dream-hero-image img"
    );

    if (careerImage) {
        careerImage.addEventListener("error", () => {
            careerImage.style.display = "none";
            console.warn("Dream career image could not be loaded.");
        });
    }

    // Check the Back to Homepage button.
    const backButton = document.querySelector(".dream-home-button");

    if (backButton) {
        console.log("Back to Homepage button found.");
    } else {
        console.warn("Back to Homepage button was not found.");
    }

    // Confirm navigation exists.
    const navigation = document.querySelector(".navbar");

    if (navigation) {
        console.log("Navigation bar found.");
    } else {
        console.warn("Navigation bar was not found.");
    }

    console.log("Dream Job page functionality loaded successfully.");

});
