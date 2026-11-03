
/* =========================================
   MAIN WEBSITE JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    console.log("Personal Website Successfully Loaded!");


    /* =========================================
       1. AUTOMATIC FOOTER YEAR
    ========================================= */

    const footerYear = document.getElementById("footer-year");

    if (footerYear) {
        footerYear.textContent = new Date().getFullYear();
    }


    /* =========================================
       2. UPDATE PAGE TITLE
    ========================================= */

    const pageTitle = document.querySelector("title");

    if (pageTitle) {
        document.title = pageTitle.textContent.trim();
    }


    /* =========================================
       3. HANDLE BROKEN IMAGES
    ========================================= */

    const images = document.querySelectorAll("img");

    images.forEach((image) => {

        image.addEventListener("error", () => {

            console.warn(
                "Image could not be loaded:",
                image.getAttribute("src")
            );

            image.classList.add("image-error");

        });

    });


    /* =========================================
       4. UPDATE COPYRIGHT YEAR
    ========================================= */

    const currentYear = new Date().getFullYear();

    const copyright = document.querySelector(".footer p");

    if (copyright) {

        copyright.innerHTML =
            `&copy; ${currentYear} Jude M. Parambita. All Rights Reserved.`;

    }


    /* =========================================
       5. OPEN CONTACT MESSAGE IN EMAIL APP
    ========================================= */

    const contactForm = document.getElementById("contact-form");

    if (contactForm) {
        contactForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const formData = new FormData(contactForm);
            const name = formData.get("name");
            const senderEmail = formData.get("email");
            const message = formData.get("message");
            const subject = `Website message from ${name}`;
            const body =
                `Name: ${name}\r\n` +
                `Email: ${senderEmail}\r\n\r\n` +
                `${message}`;
            const mailtoUrl =
                `mailto:judemontejo0@gmail.com` +
                `?subject=${encodeURIComponent(subject)}` +
                `&body=${encodeURIComponent(body)}`;

            window.location.href = mailtoUrl;
        });
    }

});
