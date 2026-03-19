function mostrarProductos(idContenedor) {
    const contenedor = document.getElementById(idContenedor);

    if (!contenedor) return;

    productos.forEach(producto => {
        contenedor.innerHTML += `
            <div class="producto">
                <h3>${producto.nombre}</h3>
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <p class="precio">${producto.precio}</p>
                <button>Agregar al Carrito</button>
            </div>
        `;
    });
}