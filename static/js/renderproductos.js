function formatoPrecio(precio) {
    return "$" + precio.toLocaleString("es-CO");
}

/* 🔹 PARA INDEX (carrusel simple) */
function mostrarProductos(idContenedor) {
    const contenedor = document.getElementById(idContenedor);
    if (!contenedor) return;

    contenedor.innerHTML = "";

    productos.forEach(producto => {
        contenedor.innerHTML += `
            <div class="producto">
                <h3>${producto.nombre}</h3>
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <p class="precio">${formatoPrecio(producto.precio)}</p>
                <button>Agregar al Carrito</button>
            </div>
        `;
    });
}

/* 🔹 PARA PRODUCTOS.HTML (categorías) */
document.addEventListener("DOMContentLoaded", function () {
    const contenedor = document.getElementById("productos-dinamicos");

    if (!contenedor) return;

    const categorias = [...new Set(productos.map(p => p.categoria))];

    categorias.forEach(categoria => {
        const productosFiltrados = productos.filter(p => p.categoria === categoria);

        let html = `
            <h2 class="titulo_productos">${categoria}</h2>
            <div class="carousel-container">
                <button class="btn prev">&#10094;</button>
                <div class="contenedor_productos">
        `;

        productosFiltrados.forEach(producto => {
            html += `
                <div class="producto">
                    <h3>${producto.nombre}</h3>
                    <img src="${producto.imagen}" alt="${producto.nombre}">
                    <p class="precio">${formatoPrecio(producto.precio)}</p>
                    <button>Agregar al Carrito</button>
                </div>
            `;
        });

        html += `
                </div>
                <button class="btn next">&#10095;</button>
            </div>
        `;

        contenedor.innerHTML += html;
    });
});