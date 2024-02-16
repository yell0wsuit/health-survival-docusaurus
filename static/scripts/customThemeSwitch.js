document.addEventListener("DOMContentLoaded", function () {
    const themeSwitcher = () => {
        const theme = document.documentElement.getAttribute("data-theme");
        // Set the same theme value for data-bs-theme
        document.documentElement.setAttribute("data-bs-theme", theme);
    };

    // Listen for theme changes
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === "data-theme") {
                themeSwitcher();
            }
        });
    });

    observer.observe(document.documentElement, {
        attributes: true, //configure it to listen to attribute changes
    });
});