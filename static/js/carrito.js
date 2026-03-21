function formatoPrecio(precio) {
    return "$" + precio.toLocaleString("es-CO");
}

function obtenerCarrito() {
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

function guardarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function calcularTotal(carrito) {
    return carrito.reduce((total, producto) => {
        return total + (producto.precio * producto.cantidad);
    }, 0);
}

function renderizarCarrito() {
    const contenedor = document.getElementById("carrito-productos");
    const totalElemento = document.getElementById("total");
    const carrito = obtenerCarrito();

    contenedor.innerHTML = "";

    if (carrito.length === 0) {
        contenedor.innerHTML = `
            <div class="carrito-vacio">
                <h3>Tu carrito está vacío</h3>
                <p>Agrega productos desde la tienda.</p>
            </div>
        `;
        totalElemento.textContent = formatoPrecio(0);
        return;
    }

    carrito.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");

        div.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" />

            <div class="info">
                <h3>${producto.nombre}</h3>
                <p>${formatoPrecio(producto.precio)}</p>

                <div class="cantidad">
                    <button class="btn-restar" data-id="${producto.id}">-</button>
                    <span>${producto.cantidad}</span>
                    <button class="btn-sumar" data-id="${producto.id}">+</button>
                </div>
            </div>

            <button class="eliminar" data-id="${producto.id}">Eliminar</button>
        `;

        contenedor.appendChild(div);
    });

    totalElemento.textContent = formatoPrecio(calcularTotal(carrito));

    asignarEventosCarrito();
}

function asignarEventosCarrito() {
    const botonesSumar = document.querySelectorAll(".btn-sumar");
    const botonesRestar = document.querySelectorAll(".btn-restar");
    const botonesEliminar = document.querySelectorAll(".eliminar");

    botonesSumar.forEach(boton => {
        boton.addEventListener("click", () => {
            const id = Number(boton.dataset.id);
            let carrito = obtenerCarrito();

            carrito = carrito.map(producto => {
                if (producto.id === id) {
                    producto.cantidad += 1;
                }
                return producto;
            });

            guardarCarrito(carrito);
            renderizarCarrito();
        });
    });

    botonesRestar.forEach(boton => {
        boton.addEventListener("click", () => {
            const id = Number(boton.dataset.id);
            let carrito = obtenerCarrito();

            carrito = carrito.map(producto => {
                if (producto.id === id && producto.cantidad > 1) {
                    producto.cantidad -= 1;
                }
                return producto;
            });

            guardarCarrito(carrito);
            renderizarCarrito();
        });
    });

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", () => {
            const id = Number(boton.dataset.id);
            let carrito = obtenerCarrito();

            carrito = carrito.filter(producto => producto.id !== id);

            guardarCarrito(carrito);
            renderizarCarrito();
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    renderizarCarrito();

    const botonPagar = document.querySelector(".pagar");

    if (botonPagar) {
        botonPagar.addEventListener("click", () => {
            const carrito = obtenerCarrito();

            if (carrito.length === 0) {
                alert("Tu carrito está vacío");
            } else {
                alert("Próximamente te redirigiremos al pago");
            }
        });
    }
});