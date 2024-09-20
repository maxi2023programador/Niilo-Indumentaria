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
    <div class="d-flex justify-content-center mb-3">
    <div class="card text-bg-dark" style="width: 100%; max-width: 600px;" data-bs-toggle="tooltip" title="Click para ir a la Card 2">
        <div class="card-body text-center">
            <img src="${producto.imagen}" alt="${producto.nombre}" class="img-fluid mb-2" style="width: 100%;">
            <div class="card-name"><p>${producto.nombre}</p></div>
            <div class="card-price"><p>$${producto.precio}</p></div>
            
        </div>
    </div>
</div>`;
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