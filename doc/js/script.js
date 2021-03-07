"use strict"

const slidesToShow = 3;
const slidesToScroll = 1;
const initialPositionStart = 0;

const slides = document.querySelectorAll(".slider__slide");
const sliderWrapper = document.querySelector(".slider__wrapper");
const sliderTrack = document.querySelector(".slider__track");

const arrowPrev = document.querySelector(".slider__arrow_p");
const arrowNext = document.querySelector(".slider__arrow_n");

slides.forEach(slide => {
    slide.style.width = `${(sliderWrapper.offsetWidth / slidesToShow)}px`;
});
let currentTranslateX = 0;

const scrollToPrev = () => {
    arrowPrev.removeEventListener("click", scrollToPrev);
    if(!currentTranslateX) {
        currentTranslateX = -(sliderTrack.offsetWidth - sliderWrapper.offsetWidth);
    } else {
        currentTranslateX += slides[0].offsetWidth * slidesToScroll;
        if(currentTranslateX > 0) {
            currentTranslateX = 0;
        }
    }
    sliderTrack.style.transform = `translateX(${currentTranslateX}px)`;
}

const scrollToNext = () => {
    arrowNext.removeEventListener("click", scrollToNext);
    if(currentTranslateX === -(sliderTrack.offsetWidth - sliderWrapper.offsetWidth)) {
        currentTranslateX = 0;
    } else {
        currentTranslateX -= slides[0].offsetWidth * slidesToScroll;
    }
    if(currentTranslateX < -(sliderTrack.offsetWidth - sliderWrapper.offsetWidth)) {
        currentTranslateX =  -(sliderTrack.offsetWidth - sliderWrapper.offsetWidth)
    }
    sliderTrack.style.transform = `translateX(${currentTranslateX}px)`;
}

arrowPrev.addEventListener("click", scrollToPrev);
arrowNext.addEventListener("click", scrollToNext);

sliderTrack.addEventListener("transitionend", () => {
    arrowPrev.addEventListener("click", scrollToPrev);
    arrowNext.addEventListener("click", scrollToNext);
})

window.onload = function() {
    sliderTrack.classList.add("slider__track_transitioned");
}