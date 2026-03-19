const productos = [
    {
        nombre: "Producto 1",
        imagen: "../static/imagenes/productos/producto_1.jpeg",
        precio: "$32.000"
    },
    {
        nombre: "Producto 2",
        imagen: "../static/imagenes/productos/producto_1.jpeg",
        precio: "$32.000"
    },
    {
        nombre: "Producto 3",
        imagen: "../static/imagenes/productos/producto_1.jpeg",
        precio: "$32.000"
    },
    {
        nombre: "Producto 4",
        imagen: "../static/imagenes/productos/producto_1.jpeg",
        precio: "$32.000"
    },
    {
        nombre: "Producto 5",
        imagen: "../static/imagenes/productos/producto_1.jpeg",
        precio: "$32.000"
    },
    {
        nombre: "Producto 6",
        imagen: "../static/imagenes/productos/producto_1.jpeg",
        precio: "$32.000"
    },
    {
        nombre: "Producto 7",
        imagen: "../static/imagenes/productos/producto_1.jpeg",
        precio: "$32.000"
    },
    {
        nombre: "Producto 8",
        imagen: "../static/imagenes/productos/producto_1.jpeg",
        precio: "$32.000"
    }
];

const contenedorProductos = document.getElementById("contenedor-productos");

productos.forEach(producto => {
    contenedorProductos.innerHTML += `
        <div class="producto">
            <h3>${producto.nombre}</h3>
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <p class="precio">${producto.precio}</p>
            <button>Agregar al Carrito</button>
        </div>
    `;
});