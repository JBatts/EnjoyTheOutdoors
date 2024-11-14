"use strict"; // Enforces stricter parsing and error handling in JavaScript

// Wait for the DOM to fully load before executing the script
document.addEventListener("DOMContentLoaded", () => {
    let slideIndex = 1; // Initialize slide index to 1 (slides are 1-based for display)
    const slides = Array.from(document.getElementsByClassName("slide")); // Get all slides and convert to an array
    const dotsContainer = document.querySelector(".dots"); // Get the container for navigation dots
    let dots = []; // Store dot elements for navigation
    let timer; // Timer for automatic slide transitions

    // Creates navigation dots corresponding to the number of slides
    function createDots() {
        slides.forEach((_, index) => {
            const dot = document.createElement("span"); // Create a dot element
            dot.classList.add("dot"); // Add the dot class for styling

            // Attach click event to each dot to navigate to the corresponding slide
            dot.addEventListener("click", () => currentSlide(index));
            dotsContainer.appendChild(dot); // Add dot to the dots container
            dots.push(dot); // Store the dot in the dots array
        });
    }

    // Displays the current slide and updates dots' active status
    function showSlides() {
        slides.forEach(slide => (slide.style.display = "none")); // Hide all slides
        dots.forEach(dot => dot.classList.remove("active")); // Deactivate all dots

        // Wrap around if the slide index is out of bounds
        if (slideIndex > slides.length) {
            slideIndex = 1; // Loop back to the first slide
        }

        if (slideIndex < 1) {
            slideIndex = slides.length; // Loop to the last slide
        }

        slides[slideIndex - 1].style.display = "block"; // Show the current slide
        dots[slideIndex - 1].classList.add("active"); // Highlight the corresponding dot

        // Set a timer to automatically transition to the next slide after 4 seconds
        timer = setTimeout(() => {
            slideIndex++;
            showSlides(); // Recursively call showSlides for auto-play
        }, 4000);
    }

    // Updates the slide index based on dot clicks and shows the selected slide
    function currentSlide(n) {
        slideIndex = n + 1; // Adjust because slides are 1-based in showSlides
        clearTimeout(timer); // Stop auto-slide when manually navigating
        showSlides(); // Show the selected slide
    }

    // Updates the slide index by a given number for manual navigation (prev/next)
    function plusSlides(n) {
        slideIndex += n;

        // Wrap around if the slide index is out of bounds
        if (slideIndex > slides.length) {
            slideIndex = 1; // Loop back to the first slide
        }

        if (slideIndex < 1) {
            slideIndex = slides.length; // Loop to the last slide
        }

        clearTimeout(timer); // Stop auto-slide during manual navigation
        showSlides(); // Show the selected slide
    }

    // Pause automatic slide transition on mouse hover
    const slideshowContainer = document.querySelector(".slideshow-container");
    slideshowContainer.addEventListener("mouseover", () => clearTimeout(timer));

    // Resume automatic slide transition when the mouse leaves the slideshow
    slideshowContainer.addEventListener("mouseout", (event) => {
        if (!slideshowContainer.contains(event.relatedTarget)) { // Ensure mouse actually left
            showSlides(); // Restarting slideshow from current slide
        }
    });

    // Attach click events to prev/next buttons for manual slide navigation
    document.querySelector(".prev").addEventListener("click", () => plusSlides(-1));
    document.querySelector(".next").addEventListener("click", () => plusSlides(1));

    createDots(); // Generate navigation dots
    showSlides(); // Start the slideshow
});
