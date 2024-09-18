// Definir productos y URL 
window.productos = [];  // Hacer productos global
const URL = '/productos.json';

// Función para obtener los productos
async function obtenerProductos() {
    try {
        const response = await fetch(URL);
        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
        }
        const data = await response.json();
        productos.push(...data);  // Asignar productos globalmente
        cargarProductos(productos);  // Cargar productos en el contenedor
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        document.querySelector('.card-error').classList.remove('ocultar');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    obtenerProductos();
});

// Función para retornar el HTML de una tarjeta de producto
function retornarCardHTML(producto) {
    return `
    <div class="card">
        <div class="card-image">
            <img src="${producto.imagen}" alt="${producto.nombre}" width="100">
        </div>
        <div class="card-name"><p>${producto.nombre}</p></div>
        <div class="card-price">$ ${producto.precio}</div>
        <div class="card-button">
            <button class="button button-outline button-add" id="${producto.id}" title="Clic para agregar al carrito">+</button>
        </div>
    </div>
    `;
}

// Función para activar el click en los botones de agregar al carrito
const activarClickEnBotones = () => {
    const botonesAgregar = document.querySelectorAll('.button.button-outline.button-add');
    
    if (botonesAgregar) {
        botonesAgregar.forEach(boton => {
            boton.addEventListener('click', (event) => {
                agregarAlCarrito(parseInt(event.target.id, 10));
            });
        });
    }
};

// Función para cargar los productos en el contenedor
function cargarProductos(array) {
    const container = document.querySelector('.product-container'); // Usar .product-container
    container.innerHTML = ''; // Limpia el contenedor antes de agregar productos

    array.forEach(producto => {
        const cardHTML = retornarCardHTML(producto);
        container.insertAdjacentHTML('beforeend', cardHTML);
    });
    
    activarClickEnBotones(); // Llamar a activarClickEnBotones después de cargar los productos
}

fetch('./whatsapp.html')
.then(response => response.text())
.then(data => {
  document.getElementById('whatsapp-placeholder').innerHTML = data;
})
.catch(error => console.error('Error cargando el botón:', error));