const slider = document.querySelector('.slider');
const slides = Array.from(slider.children);
const bullets = document.querySelector('.bullets');
const prev = document.getElementById('btn-prev');
const next = document.getElementById('btn-next');
const slideWidth = slides[0].getBoundingClientRect().width;
let slideInterval;
class slideOptions {
    constructor() {
        this.autoLoop = false;
        this.intervalTime = 3000;
    }
}
let option = new slideOptions();
const setSlidePosition = (slide, index) => {
    slide.setAttribute('style', `left: ${slideWidth * index + 'px;'}`);
};
slides.forEach(setSlidePosition);
const loadBullets = () => {
    for (let i = 0; i < slides.length; i++) {
        const span = document.createElement('span');
        bullets.appendChild(span);
        span.setAttribute('onclick', `dotClick(${i})`);
    }
    bullets.children[0].classList.add('activeDot');
};
loadBullets();
const prevSlide = () => {
    const [activeSlide, activeDot] = getActive();
    removeActive(activeSlide, activeDot);
    activeSlide.previousElementSibling ? activeSlide.previousElementSibling.classList.add('active') : slides[slides.length - 1].classList.add('active');
    activeDot.previousElementSibling ? activeDot.previousElementSibling.classList.add('activeDot') : bullets.children[bullets.children.length - 1].classList.add('activeDot');
    slideEffect(prevSlide.name, activeSlide);
};
const nextSlide = () => {
    const [activeSlide, activeDot] = getActive();
    removeActive(activeSlide, activeDot);
    activeSlide.nextElementSibling ? activeSlide.nextElementSibling.classList.add('active') : slides[0].classList.add('active');
    activeDot.nextElementSibling ? activeDot.nextElementSibling.classList.add('activeDot') : bullets.children[0].classList.add('activeDot');
    slideEffect(nextSlide.name, activeSlide);
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
const dotClick = (i) => {
    const [activeSlide, activeDot] = getActive();
    removeActive(activeSlide, activeDot);
    slides[i].classList.add('active');
    bullets.children[i].classList.add('activeDot');
    const position = slides[i].getAttribute('style').replace(';', '').split(' ').slice(1);
    slider.setAttribute('style', `transform: translateX(-${position})`);
    if (option.autoLoop)
        resetTime();
};
const slideEffect = (name, activeSlide) => {
    switch (name) {
        case 'prevSlide':
            {
                const position = activeSlide.previousElementSibling ? activeSlide.previousElementSibling.getAttribute('style').replace(';', '').split(' ').slice(1) : slides[slides.length - 1].getAttribute('style').replace(';', '').split(' ').slice(1);
                slider.setAttribute('style', `transform: translateX(-${position})`);
            }
            break;
        case 'nextSlide':
            {
                const position = activeSlide.nextElementSibling ? activeSlide.nextElementSibling.getAttribute('style').replace(';', '').split(' ').slice(1) : slides[0].getAttribute('style').replace(';', '').split(' ').slice(1);
                slider.setAttribute('style', `transform: translateX(-${position})`);
            }
            break;
    }
};
const getActive = () => {
    const activeSlide = document.querySelector('.active');
    const activeDot = document.querySelector('.activeDot');
    return [activeSlide, activeDot];
};
const removeActive = (activeSlide, activeDot) => {
    activeSlide.classList.remove('active');
    activeDot.classList.remove('activeDot');
};
const resetTime = () => {
    clearInterval(slideInterval);
};
if (option.autoLoop)
    slideInterval = setInterval(nextSlide, option.intervalTime);
//# sourceMappingURL=main.js.map