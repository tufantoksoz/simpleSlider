const slides = document.querySelectorAll(".slide");
const bullets = document.querySelector(".bullets");
const prev = document.getElementById("btn-prev");
const next = document.getElementById("btn-next");
let slideInterval;
class slideOptions {
    constructor() {
        this.autoLoop = true;
        this.intervalTime = 3000;
    }
}
let option = new slideOptions();
const loadBullets = () => {
    for (let i = 0; i < slides.length; i++) {
        const span = document.createElement("span");
        bullets.appendChild(span);
        span.setAttribute("onclick", `dotClick(${i})`);
    }
    bullets.children[0].classList.add("activeDot");
};
loadBullets();
const prevSlide = () => {
    const [activeSlide, activeDot] = getActive();
    removeActive(activeSlide, activeDot);
    if (activeSlide.previousElementSibling) {
        activeSlide.previousElementSibling.classList.add("active");
        activeDot.previousElementSibling.classList.add("activeDot");
    }
    else {
        slides[slides.length - 1].classList.add("active");
        bullets.children[bullets.children.length - 1].classList.add("activeDot");
    }
};
const nextSlide = () => {
    const [activeSlide, activeDot] = getActive();
    removeActive(activeSlide, activeDot);
    if (activeSlide.nextElementSibling) {
        activeSlide.nextElementSibling.classList.add("active");
        activeDot.nextElementSibling.classList.add("activeDot");
    }
    else {
        slides[0].classList.add("active");
        bullets.children[0].classList.add("activeDot");
    }
};
prev.onclick = () => {
    prevSlide();
    if (option.autoLoop)
        resetTime();
};
next.onclick = () => {
    nextSlide();
    if (option.autoLoop)
        resetTime();
};
const dotClick = i => {
    const [activeSlide, activeDot] = getActive();
    removeActive(activeSlide, activeDot);
    slides[i].classList.add("active");
    bullets.children[i].classList.add("activeDot");
    if (option.autoLoop)
        resetTime();
};
const getActive = () => {
    const activeSlide = document.querySelector(".active");
    const activeDot = document.querySelector(".activeDot");
    return [activeSlide, activeDot];
};
const removeActive = (activeSlide, activeDot) => {
    activeSlide.classList.remove("active");
    activeDot.classList.remove("activeDot");
};
if (option.autoLoop)
    slideInterval = setInterval(nextSlide, option.intervalTime);
const resetTime = () => {
    clearInterval(slideInterval);
};
//# sourceMappingURL=main.js.map