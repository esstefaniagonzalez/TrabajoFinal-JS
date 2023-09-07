document.addEventListener("DOMContentLoaded", function() {
    const botonesAgregar = document.querySelectorAll(".agregar-carrito");
    const listaCarrito = document.querySelector(".lista-carrito");
    const totalCarrito = document.querySelector(".total-carrito");
    const botonFinalizarCompra = document.getElementById("finalizar-compra");
    const botonEliminarCarrito = document.getElementById("eliminar-carrito");
  
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  
    botonesAgregar.forEach(function(boton) {
      boton.addEventListener("click", function(e) {
        const nombre = e.target.getAttribute("data-nombre");
        const precio = parseFloat(e.target.getAttribute("data-precio"));
  
        const producto = {
          nombre: nombre,
          precio: precio
        };
  
        botonFinalizarCompra.addEventListener("click", function() {
          Swal.fire({
            title: 'Deseas finalizar la compra?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#D66BA0',
            cancelButtonColor: '#D66BA0',
            confirmButtonText: 'Si, confirmar'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Pasar al medio de pago',
              )
            }
          });
        });
  
        carrito.push(producto);
        guardarCarritoEnLocalStorage();
        actualizarCarrito();
      });
    });
  
    function guardarCarritoEnLocalStorage() {
      localStorage.setItem("carrito", JSON.stringify(carrito));
    }
  
    function actualizarCarrito() {
      listaCarrito.innerHTML = "";
      let total = 0;
  
      carrito.forEach(function(producto) {
        const itemCarrito = document.createElement("li");
        itemCarrito.innerHTML = `${producto.nombre} - $${producto.precio.toFixed(2)}`;
        listaCarrito.appendChild(itemCarrito);
  
        total += producto.precio;
      });
  
      totalCarrito.textContent = `$${total.toFixed(2)}`;
    }
  
    actualizarCarrito();
  });
  
  document.addEventListener("DOMContentLoaded", function() {
    const botonEliminarCarrito = document.getElementById("eliminar-carrito");
  
    botonEliminarCarrito.addEventListener("click", function() {
      localStorage.removeItem("carrito");
      location.reload();
    });
  });
  
  function obtenerImagenDeGato() {
    const url = 'https://api.thecatapi.com/v1/images/search?limit=1';
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const imageUrl = data[0].url;
        const imagenGato = document.getElementById('imagenGato');
        const img = document.createElement('img');
        img.src = imageUrl;
        imagenGato.innerHTML = ''; 
        imagenGato.appendChild(img);
      })
      .catch(error => {
        console.error('Error al obtener la imagen del gato:', error);
      });
  }
  
 
  document.getElementById('obtenerImagenBtn').addEventListener('click', obtenerImagenDeGato);
  
