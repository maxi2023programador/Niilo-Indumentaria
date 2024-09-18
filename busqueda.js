document.getElementById('searchInput').addEventListener('input', function (e) {
    const searchTerm = e.target.value.toLowerCase(); // Convierte el término de búsqueda a minúsculas
    const productosFiltrados = productos.filter(producto => 
        producto.nombre.toLowerCase().includes(searchTerm) // Filtra productos cuyo nombre contiene el término
    );
    mostrarProductosFiltrados(productosFiltrados); // Muestra los productos filtrados
});

// Función para mostrar los productos filtrados
function mostrarProductosFiltrados(array) {
    const container = document.querySelector('.product-container');
    container.innerHTML = ''; // Limpia el contenedor de productos

    if (array.length > 0) {
        array.forEach(producto => {
            const cardHTML = retornarCardHTML(producto); // Genera la tarjeta HTML del producto
            container.insertAdjacentHTML('beforeend', cardHTML); // Inserta el HTML en el contenedor
        });
    } else {
        container.innerHTML = '<p>No se encontraron productos.</p>'; // Mensaje si no hay productos
    }

    activarClickEnBotones(); // Reactiva los eventos de los botones después de mostrar los productos filtrados
}
