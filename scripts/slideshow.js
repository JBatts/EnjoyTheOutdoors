"use strict";

document.addEventListener("DOMContentLoaded", () => {
    let slideIndex = 0;
    const slides = Array.from(document.getElementsByClassName("slide")); // Convert HTMLCollection to array
    const dotsContainer = document.querySelector(".dots");
    let dots = [];

    // Create dots based on the number of slides
    function createDots() {
        slides.forEach((_, index) => {
            const dot = document.createElement("span");
            dot.classList.add("dot");
            dot.addEventListener("click", () => currentSlide(index));
            dotsContainer.appendChild(dot);
            dots.push(dot);
        });
    }

    // Show slides function
    function showSlides() {
        // Hide all slides
        slides.forEach(slide => {
            slide.style.display = "none";
        });

        // Reset slide index if it exceeds the number of slides
        slideIndex++;
        if (slideIndex > slides.length) {
            slideIndex = 1;
        }

        // Remove active class from all dots
        dots.forEach(dot => dot.classList.remove("active"));

        // Display the current slide and highlight the corresponding dot
        slides[slideIndex - 1].style.display = "block";
        dots[slideIndex - 1].classList.add("active");

        // Set timer for the next slide
        setTimeout(showSlides, 4000);
    }

    // Manually set the current slide
    function currentSlide(n) {
        slideIndex = n;
        showSlides();
    }

    // Initialize dots and start the slideshow
    createDots();
    showSlides();
});
