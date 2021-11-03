let prev = null;
let next = null;
let slideInterval;
class slideOptions {
    constructor(autoLoop, delay) {
        this.autoLoop = true;
        this.delay = 3000;
        this.autoLoop = autoLoop;
        this.delay = delay;
    }
}
let init = (container, option) => {
    let containerElement = document.querySelector(container);
    let slider = containerElement.querySelector('.slider');
    let slides = containerElement.querySelectorAll('.slide');
    let bullets = containerElement.querySelector('.bullets');
    let dots = Array.from(bullets.children);
    let slideWidth = slides[0].getBoundingClientRect().width;
    option = new slideOptions(option.autoLoop, option.delay);
    prev = containerElement.querySelector('#btn-prev');
    next = containerElement.querySelector('#btn-next');
    containerElement.setAttribute('style', 'position: relative; height: 400px; width: 800px; margin: 50px auto; overflow: hidden;');
    const setSlidePosition = (slide, index) => {
        slide.setAttribute('style', `left: ${slideWidth * index + 'px;'}`);
    };
    slides.forEach(setSlidePosition);
    prev.onclick = () => {
        prevSlide(containerElement);
        if (option.autoLoop) {
            resetTime();
            slideInterval = setInterval(nextSlide, option.delay);
        }
    };
    next.onclick = () => {
        nextSlide(containerElement);
        if (option.autoLoop) {
            resetTime();
            slideInterval = setInterval(nextSlide, option.delay);
        }
    };
    const prevSlide = (containerElement) => {
        const [activeSlide, activeDot] = getActive(containerElement);
        removeActive(activeSlide, activeDot);
        activeSlide.previousElementSibling ? activeSlide.previousElementSibling.classList.add('active') : slides[slides.length - 1].classList.add('active');
        activeDot.previousElementSibling ? activeDot.previousElementSibling.classList.add('activeDot') : bullets.children[bullets.children.length - 1].classList.add('activeDot');
        slideEffect(prevSlide.name, activeSlide);
    };
    const nextSlide = (containerElement) => {
        let [activeSlide, activeDot] = getActive(containerElement);
        removeActive(activeSlide, activeDot);
        activeSlide.nextElementSibling ? activeSlide.nextElementSibling.classList.add('active') : slider.children[0].classList.add('active');
        activeDot.nextElementSibling ? activeDot.nextElementSibling.classList.add('activeDot') : bullets.children[0].classList.add('activeDot');
        slideEffect(nextSlide.name, activeSlide);
    };
    // For bullets click
    for (let i = 0; i < dots.length; i++) {
        ((index) => {
            bullets.children[i].addEventListener('click', () => {
                let [activeSlide, activeDot] = getActive(containerElement);
                removeActive(activeSlide, activeDot);
                slides[index].classList.add('active');
                bullets.children[index].classList.add('activeDot');
                let position = slides[index].getAttribute('style').replace(';', '').split(' ').slice(1);
                slider.setAttribute('style', `transform: translateX(-${position})`);
                if (option.autoLoop) {
                    resetTime();
                    slideInterval = setInterval(nextSlide, option.delay);
                }
            });
        })(i);
    }
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
    if (option.autoLoop)
        slideInterval = setInterval(() => nextSlide(containerElement), option.delay);
};
const getActive = (containerElement) => {
    let activeSlide = containerElement.querySelector('.active');
    let activeDot = containerElement.querySelector('.activeDot');
    return [activeSlide, activeDot];
};
const removeActive = (activeSlide, activeDot) => {
    activeSlide.classList.remove('active');
    activeDot.classList.remove('activeDot');
    return [activeSlide, activeDot];
};
const resetTime = () => {
    clearInterval(slideInterval);
};
//# sourceMappingURL=main.js.map