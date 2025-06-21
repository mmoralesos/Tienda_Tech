// Lee el carrito desde localStorage
function obtenerCarrito() {
  return JSON.parse(localStorage.getItem('carrito')) || [];
}

// Guarda el carrito actualizado en localStorage
function guardarCarrito(carrito) {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Agrega un producto y aumenta su cantidad si ya existe
function agregarAlCarrito(nombre, precio) {
  let carrito = obtenerCarrito();
  const index = carrito.findIndex(p => p.nombre === nombre);

  if (index !== -1) {
    carrito[index].cantidad += 1;
  } else {
    carrito.push({ nombre, precio, cantidad: 1 });
  
  }

  guardarCarrito(carrito);
  actualizarContadorCarrito();
  actualizarCarrito(); 
}


function actualizarContadorCarrito() {
  const carrito = obtenerCarrito();
  const contador = document.getElementById('contador-carrito');

  if (contador) {
    const total = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    contador.textContent = total;
  }
}


function actualizarCarrito() {
  const carrito = obtenerCarrito();
  const detalle = document.getElementById('detalle-carrito');
  const totalSpan = document.getElementById('total');

  if (!detalle || !totalSpan) return;

  detalle.innerHTML = '';
  let total = 0;

  carrito.forEach(item => {
    const div = document.createElement('div');
    div.textContent = `${item.nombre} - S/ ${item.precio} x ${item.cantidad}`;
    detalle.appendChild(div);
    total += item.precio * item.cantidad;
  });

  totalSpan.textContent = total.toFixed(2);
}

// Elimina un producto (carrito.html)
function quitarProducto(index) {
  let carrito = obtenerCarrito();
  carrito.splice(index, 1);
  guardarCarrito(carrito);
  renderizarCarrito();
  actualizarContadorCarrito();
}


function renderizarCarrito() {
  const resumen = document.getElementById('resumen-carrito');
  const totalSpan = document.getElementById('total');
  let carrito = obtenerCarrito();

  if (!resumen || !totalSpan) return;

  resumen.innerHTML = '';
  let total = 0;

  carrito.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'producto-item';

    const info = document.createElement('div');
    info.className = 'producto-info';
    info.textContent = `${item.nombre} - S/ ${item.precio}`;

    const controles = document.createElement('div');
    controles.className = 'producto-controles';

    const input = document.createElement('input');
    input.type = 'number';
    input.min = 1;
    input.value = item.cantidad;
    input.onchange = () => {
      carrito[index].cantidad = parseInt(input.value);
      guardarCarrito(carrito);
      renderizarCarrito();
      actualizarContadorCarrito();
    };

    const btn = document.createElement('button');
    btn.textContent = 'Quitar';
    btn.className = 'btn-quitar';
    btn.onclick = () => quitarProducto(index);

    controles.appendChild(input);
    controles.appendChild(btn);

    div.appendChild(info);
    div.appendChild(controles);
    resumen.appendChild(div);

    total += item.precio * item.cantidad;
  });

  totalSpan.textContent = total.toFixed(2);
}
mostrarMensajeAgregado(`${nombre} fue agregado al carrito`);  
// Procesar pago (carrito.html)
function procesarPago(event) {
  event.preventDefault();
  alert("Compra realizada exitosamente. ¡Gracias por elegir TecnoShop!");
  localStorage.removeItem('carrito');
  window.location.href = 'index.html';
}
function mostrarMensajeAgregado(texto) {
  const mensaje = document.getElementById('mensaje-agregado');
  mensaje.textContent = texto;
  mensaje.classList.add('visible');

  setTimeout(() => {
    mensaje.classList.remove('visible');
  }, 2500);
}
