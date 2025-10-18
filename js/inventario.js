$(document).ready(function() {
  if (!localStorage.getItem("usuarioLogeado")) {
    window.location.href = "index.html";
  }

  function obtenerProductos() {
    return JSON.parse(localStorage.getItem("productos")) || [];
  }

  function consolidarProductos(lista) {
    const consolidados = {};

    lista.forEach(p => {
      if (!p || !p.sku) return;

      const sku = String(p.sku).trim().toUpperCase();

      if (!consolidados[sku]) {
        consolidados[sku] = { ...p };
      } else {
        consolidados[sku].cantidad += parseInt(p.cantidad);
      }
    });

    return Object.values(consolidados);
  }

  function renderProductos() {
    const productos = obtenerProductos();
    const consolidados = consolidarProductos(productos);
    const tbody = $("#tablaProductos");

    tbody.empty();

    if (consolidados.length === 0) {
      tbody.append(`
        <tr>
          <td colspan="7" class="text-center text-muted py-3">
            No hay productos registrados aún
          </td>
        </tr>
      `);
    } else {
      consolidados.forEach((p, i) => {
        tbody.append(`
          <tr>
            <td>${i + 1}</td>
            <td>${p.sku}</td>
            <td>${p.nombre}</td>
            <td>${p.categoria}</td>
            <td>${p.cantidad}</td>
            <td>${p.fecha_vencimiento}</td>
            <td>${p.lote}</td>
          </tr>
        `);
      });
    }

    $("#totalProductos").text(consolidados.length);
    $("#stockTotal").text(consolidados.reduce((acc, p) => acc + p.cantidad, 0));
    $("#totalItems").text(consolidados.length);

    localStorage.setItem("productos", JSON.stringify(consolidados));
  }

  $("#formProducto").on("submit", function(e) {
    e.preventDefault();

    const nuevo = {
      sku: $("#sku").val(),
      nombre: $("#nombre").val(),
      categoria: $("#categoria").val(),
      cantidad: parseInt($("#cantidad").val()),
      fecha_vencimiento: $("#fecha_vencimiento").val(),
      lote: $("#lote").val()
    };

    const productos = obtenerProductos();
    productos.push(nuevo);

    localStorage.setItem("productos", JSON.stringify(productos));
    renderProductos();

    this.reset();
    Swal.fire({
      icon: 'success',
      title: '¡Producto agregado!',
      text: 'El producto se ha registrado correctamente',
      confirmButtonColor: '#198754'
    });
  });

  renderProductos();
});
