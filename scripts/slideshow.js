"use strict";

document.addEventListener("DOMContentLoaded", () => {
    let slideIndex = 1;
    const slides = Array.from(document.getElementsByClassName("slide"));
    const dotsContainer = document.querySelector(".dots");
    let dots = [];
    let timer;

    function createDots() {
        slides.forEach((_, index) => {
            const dot = document.createElement("span");
            dot.classList.add("dot");
            dot.addEventListener("click", () => currentSlide(index));
            dotsContainer.appendChild(dot);
            dots.push(dot);
        });
    }

    function showSlides() {
        slides.forEach(slide => (slide.style.display = "none"));
        dots.forEach(dot => dot.classList.remove("active"));
    
        if (slideIndex > slides.length) {
            slideIndex = 1;
        }
    
        if (slideIndex < 1) {
            slideIndex = slides.length;
        }
    
        slides[slideIndex - 1].style.display = "block";
        dots[slideIndex - 1].classList.add("active");
    
        timer = setTimeout(() => {
            slideIndex++;
            showSlides();
        }, 4000);
    }
    

    function currentSlide(n) {
        slideIndex = n + 1; // Adjust because showSlides expects 1-based index
        clearTimeout(timer);
        showSlides();
    }

    function plusSlides(n) {
        slideIndex += n;
    
        if (slideIndex > slides.length) {
            slideIndex = 1; // Loop back to first slide
        }
    
        if (slideIndex < 1) {
            slideIndex = slides.length; // Loop to the last slide
        }
    
        clearTimeout(timer); // Stop the auto-slide during manual navigation
        showSlides();
    }
    

    // Pause on hover and resume on mouseout
    const slideshowContainer = document.querySelector(".slideshow-container");
    slideshowContainer.addEventListener("mouseover", () => clearTimeout(timer));
    slideshowContainer.addEventListener("mouseout", (event) => {
        if (!slideshowContainer.contains(event.relatedTarget)) {
            showSlides();
        };
    });

    document.querySelector(".prev").addEventListener("click", () => plusSlides(-1));
    document.querySelector(".next").addEventListener("click", () => plusSlides(1));

    createDots();
    showSlides();
});
