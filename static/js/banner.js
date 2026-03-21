const slides = document.querySelectorAll(".slide");
let index = 0;

function mostrarSlide() {
    slides.forEach(slide => slide.classList.remove("active"));
    slides[index].classList.add("active");

    index++;
    if (index >= slides.length) {
        index = 0;
    }
}

setInterval(mostrarSlide, 4000);