document.addEventListener("DOMContentLoaded", function () {
    const carruseles = document.querySelectorAll(".carousel-container");

    if (!carruseles.length) return;

    carruseles.forEach((carrusel) => {
        const contenedor = carrusel.querySelector(".contenedor_productos");
        const btnPrev = carrusel.querySelector(".prev");
        const btnNext = carrusel.querySelector(".next");

        if (!contenedor || !btnPrev || !btnNext) return;

        let productos = Array.from(contenedor.querySelectorAll(".producto"));
        const cantidadOriginal = productos.length;

        if (cantidadOriginal === 0) return;

        // Cantidad de clones según cuántos productos haya
        const clonesPorLado = Math.min(4, cantidadOriginal);

        const clonesInicio = productos
            .slice(0, clonesPorLado)
            .map(item => item.cloneNode(true));

        const clonesFinal = productos
            .slice(-clonesPorLado)
            .map(item => item.cloneNode(true));

        clonesFinal.forEach(clon => {
            contenedor.insertBefore(clon, contenedor.firstChild);
        });

        clonesInicio.forEach(clon => {
            contenedor.appendChild(clon);
        });

        productos = Array.from(contenedor.querySelectorAll(".producto"));

        let index = clonesPorLado;
        let autoplay;

        function anchoProducto() {
            const estiloContenedor = window.getComputedStyle(contenedor);
            const gap = parseInt(estiloContenedor.gap) || 20;
            return productos[0].offsetWidth + gap;
        }

        function moverCarrusel(animar = true) {
            if (animar) {
                contenedor.style.transition = "transform 0.6s ease";
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
            if (index >= cantidadOriginal + clonesPorLado) {
                index = clonesPorLado;
                moverCarrusel(false);
            }

            if (index < clonesPorLado) {
                index = cantidadOriginal + clonesPorLado - 1;
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
            }, 1800); // más rápido
        }

        function reiniciarAutoplay() {
            clearInterval(autoplay);
            iniciarAutoplay();
        }

        carrusel.addEventListener("mouseenter", function () {
            clearInterval(autoplay);
        });

        carrusel.addEventListener("mouseleave", function () {
            iniciarAutoplay();
        });

        window.addEventListener("resize", function () {
            moverCarrusel(false);
        });

        moverCarrusel(false);
        iniciarAutoplay();
    });
});