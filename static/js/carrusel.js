document.addEventListener("DOMContentLoaded", function () {
    const contenedor = document.querySelector(".contenedor_productos");
    const btnPrev = document.querySelector(".prev");
    const btnNext = document.querySelector(".next");

    if (!contenedor || !btnPrev || !btnNext) return;

    let productos = Array.from(document.querySelectorAll(".producto"));
    const cantidadOriginal = productos.length;

    if (cantidadOriginal === 0) return;

    // Duplicar primeros y últimos para efecto infinito
    const clonesInicio = productos.slice(0, 4).map(item => item.cloneNode(true));
    const clonesFinal = productos.slice(-4).map(item => item.cloneNode(true));

    clonesFinal.forEach(clon => {
        contenedor.insertBefore(clon, contenedor.firstChild);
    });

    clonesInicio.forEach(clon => {
        contenedor.appendChild(clon);
    });

    productos = Array.from(document.querySelectorAll(".producto"));

    let index = 4;
    let autoplay;

    function anchoProducto() {
        const estiloContenedor = window.getComputedStyle(contenedor);
        const gap = parseInt(estiloContenedor.gap) || 30;
        return productos[0].offsetWidth + gap;
    }

    function moverCarrusel(animar = true) {
        if (animar) {
            contenedor.style.transition = "transform 1.2s cubic-bezier(0.22, 0.61, 0.36, 1)";
        } else {
            contenedor.style.transition = "none";
        }

        contenedor.style.transform = `translateX(-${index * anchoProducto()}px)`;
    }

    function siguiente() {
        index++;
        moverCarrusel(true);
    }

    function anterior() {
        index--;
        moverCarrusel(true);
    }

    contenedor.addEventListener("transitionend", function () {
        // Si llegó al final clonado, volver al inicio real sin salto visible
        if (index >= cantidadOriginal + 4) {
            index = 4;
            moverCarrusel(false);
        }

        // Si llegó al inicio clonado, volver al final real sin salto visible
        if (index <= 0) {
            index = cantidadOriginal;
            moverCarrusel(false);
        }
    });

    btnNext.addEventListener("click", function () {
        siguiente();
        reiniciarAutoplay();
    });

    btnPrev.addEventListener("click", function () {
        anterior();
        reiniciarAutoplay();
    });

    function iniciarAutoplay() {
        autoplay = setInterval(() => {
            siguiente();
        }, 3000);
    }

    function reiniciarAutoplay() {
        clearInterval(autoplay);
        iniciarAutoplay();
    }

    const carrusel = document.querySelector(".carousel-container");

    carrusel.addEventListener("mouseenter", function () {
        clearInterval(autoplay);
    });

    carrusel.addEventListener("mouseleave", function () {
        iniciarAutoplay();
    });

    window.addEventListener("resize", function () {
        moverCarrusel(false);
    });

    // Posición inicial
    moverCarrusel(false);
    iniciarAutoplay();
});