import { useState, useEffect } from 'react'
function PedidosAdmin() {

  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null)

  useEffect(() => {

  const cerrarConEsc = (e) => {

    if (e.key === "Escape") {

      setPedidoSeleccionado(null)

    }

  }

  window.addEventListener("keydown", cerrarConEsc)

  return () => {

    window.removeEventListener("keydown", cerrarConEsc)

  }

}, [])

  const pedidos = JSON.parse(

    localStorage.getItem("pedidos")

  ) || []

  const actualizarEstado = (id) => {

  const pedidosActualizados = pedidos.map((pedido) => {

    if (pedido.id !== id) return pedido

    let nuevoEstado = pedido.estado

    if (pedido.estado === "Pendiente") {

      nuevoEstado = "Preparando"

    }

    else if (pedido.estado === "Preparando") {

      nuevoEstado = "En camino"

    }

   else if (pedido.estado === "En camino") {

  const confirmar = window.confirm(

    "¿Desea marcar este pedido como ENTREGADO?\n\nEsta acción actualizará automáticamente el inventario."

  )

  if (!confirmar) {

    return pedido

  }

  nuevoEstado = "Entregado"

  descontarInventario(pedido)

}

    return {

      ...pedido,

      estado: nuevoEstado

    }

  })

  localStorage.setItem(
    "pedidos",
    JSON.stringify(pedidosActualizados)
  )

  setPedidoSeleccionado(
    pedidosActualizados.find(
      pedido => pedido.id === id
    )
  )

}

const obtenerClaseEstado = (estado) => {

  switch (estado) {

    case "Pendiente":
      return "estado-pendiente"

    case "Preparando":
      return "estado-preparando"

    case "En camino":
      return "estado-camino"

    case "Entregado":
      return "estado-entregado"

    default:
      return ""

  }

}

const descontarInventario = (pedido) => {

  const productos = JSON.parse(

    localStorage.getItem("productos")

  ) || []

  const inventarioActualizado = productos.map((producto) => {

    const productoPedido = pedido.productos.find(

      p => p.nombre === producto.nombre

    )

    if (!productoPedido) {

      return producto

    }

    const nuevoStock = Math.max(

      0,

      producto.stock - productoPedido.cantidad

    )

    return {

      ...producto,

      stock: nuevoStock,

      estado: nuevoStock > 0

        ? "Disponible"

        : "Agotado"

    }

  })

  localStorage.setItem(

    "productos",

    JSON.stringify(inventarioActualizado)

  )

}

  return (

    <div>

      <h2>🛒 Gestión de Pedidos</h2>

      {
        pedidos.length === 0 ? (

          <p>No existen pedidos registrados.</p>

        ) : (

            pedidos.map((pedido, index) => (
            <div
              key={pedido.id}
              className="pedido-card"
            >

             <div className="pedido-header">

  <div>

    <h3>

      📦 Pedido #{String(index + 1).padStart(3, '0')}

    </h3>

    <p className="pedido-id">

      ID: {pedido.id}

    </p>

  </div>

</div>

              <p>

                👤 <strong>{pedido.cliente}</strong>

              </p>

              <p>

                📅 {pedido.fecha}

              </p>

              <p>

                🚚 {pedido.tipoEntrega}

              </p>

              <p>

                💳 {pedido.metodoPago}

              </p>

              <p>

                💰 S/ {pedido.total.toFixed(2)}

              </p>

              <p>

              <strong>Estado:</strong>

              <span className={`estado-badge ${obtenerClaseEstado(pedido.estado)}`}>

                {pedido.estado}

              </span>

              </p>

              <button
                className="detalle-btn"
                onClick={() => setPedidoSeleccionado(pedido)}
            >

                👁 Ver detalle

              </button>

            </div>

          ))

        )

      }

      {
pedidoSeleccionado && (

<div className="modal-overlay">

<div className="pedido-modal">

<div className="modal-header">

  <h2>🛒 Detalle del Pedido</h2>

  <button
    className="close-modal"
    onClick={() => setPedidoSeleccionado(null)}
  >
    ✕
  </button>

</div>

<div className="detalle-pedido">

<p>

<strong>👤 Cliente:</strong>

{pedidoSeleccionado.cliente}

</p>

<p>

<strong>🆔 DNI:</strong>

{pedidoSeleccionado.dni}

</p>

<p>

<strong>📱 Celular:</strong>

{pedidoSeleccionado.telefono}

</p>

<p>

<strong>📍 Dirección:</strong>

{pedidoSeleccionado.direccion}

</p>

<p>

<strong>📌 Referencia:</strong>

{pedidoSeleccionado.referencia}

</p>

<hr />

<h3>🛒 Productos</h3>

<table className="productos-table">

  <thead>

    <tr>

      <th>Producto</th>

      <th>Cantidad</th>

    </tr>

  </thead>

  <tbody>

    {

      pedidoSeleccionado.productos.map((producto,index)=>(

        <tr key={index}>

          <td>{producto.nombre}</td>

          <td>{producto.cantidad}</td>

        </tr>

      ))

    }

  </tbody>

</table>

<hr />

<p>

<strong>Subtotal:</strong>

S/ {pedidoSeleccionado.subtotal.toFixed(2)}

</p>

<p>

<strong>IGV:</strong>

S/ {pedidoSeleccionado.igv.toFixed(2)}

</p>

<p>

<strong>Delivery:</strong>

S/ {pedidoSeleccionado.delivery.toFixed(2)}

</p>

<p>

<strong>Total:</strong>

S/ {pedidoSeleccionado.total.toFixed(2)}

</p>

<hr />

<p>

<strong>💳 Método de pago:</strong>

{pedidoSeleccionado.metodoPago}

</p>

<p>

<strong>🚚 Entrega:</strong>

{pedidoSeleccionado.tipoEntrega}

</p>

<p>

<strong>📅 Fecha:</strong>

{pedidoSeleccionado.fecha}

</p>

<p>

<strong>Estado:</strong>

<span
  className={`estado-badge ${obtenerClaseEstado(pedidoSeleccionado.estado)}`}
>

  {pedidoSeleccionado.estado}

</span>

</p>

{
pedidoSeleccionado.estado !== "Entregado" && (

<button
  className="estado-btn"
  onClick={() =>
    actualizarEstado(pedidoSeleccionado.id)
  }
>

{
pedidoSeleccionado.estado === "Pendiente"

? "📦 Preparar Pedido"

: pedidoSeleccionado.estado === "Preparando"

? "🚚 Enviar Pedido"

: "✅ Marcar como Entregado"

}

</button>

)
}

</div>

</div>

</div>

)
}

    </div>

  )

}

export default PedidosAdmin