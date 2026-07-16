import { useState, useEffect } from "react"

import {

  obtenerPedidos,

  obtenerOperaciones,

  actualizarPedidoFirebase,

  descontarStockFirebase

} from "../firebase/firebaseService"

function PedidosAdmin() {

  const [pedidoSeleccionado, setPedidoSeleccionado] =
    useState(null)

 const [pedidos, setPedidos] = useState([])

 const [operaciones, setOperaciones] = useState([])

  useEffect(() => {

const cargarPedidos = async () => {

  try {

    const datosPedidos =

      await obtenerPedidos()

    const datosOperaciones =

      await obtenerOperaciones()

    setPedidos(datosPedidos)

    setOperaciones(datosOperaciones)

    console.log(

      "Pedidos:",

      datosPedidos.length

    )

    console.log(

      "Operaciones:",

      datosOperaciones.length

    )

  } catch (error) {

    console.error(

      "Error cargando datos:",

      error

    )

  }

}

  cargarPedidos()

}, [])

  useEffect(() => {

    const cerrarConEsc = (e) => {

      if (e.key === "Escape") {

        setPedidoSeleccionado(null)

      }

    }

    window.addEventListener(
      "keydown",
      cerrarConEsc
    )

    return () => {

      window.removeEventListener(
        "keydown",
        cerrarConEsc
      )

    }

  }, [])


  const esServicioDigital = (pedido) => {

    return Boolean(pedido.tipoOperacion)

  }


  const actualizarEstado = async (id) => {

    const pedidosActualizados =
      pedidos.map((pedido) => {

        if (pedido.id !== id) {

          return pedido

        }


        // =========================
        // SERVICIOS DIGITALES
        // =========================

        if (esServicioDigital(pedido)) {

          let nuevoEstado = pedido.estado

          if (pedido.estado === "Pendiente") {

            nuevoEstado = "Procesando"

          }

          else if (
            pedido.estado === "Procesando"
          ) {

            const confirmar =
              window.confirm(

                "¿Desea marcar esta operación como COMPLETADA?"

              )

            if (!confirmar) {

              return pedido

            }

            nuevoEstado = "Completado"

          }

          return {

            ...pedido,

            estado: nuevoEstado

          }

        }


        // =========================
        // PEDIDOS DE PRODUCTOS
        // =========================

        let nuevoEstado = pedido.estado

        if (pedido.estado === "Pendiente") {

          nuevoEstado = "Preparando"

        }

        else if (
          pedido.estado === "Preparando"
        ) {

          nuevoEstado = "En camino"

        }

        else if (
          pedido.estado === "En camino"
        ) {

          const confirmar =
            window.confirm(

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


   const pedidoActualizado = pedidosActualizados.find(

  (pedido) => pedido.id === id

)

try {

  await actualizarPedidoFirebase(

    pedidoActualizado.firebaseId,

    {

      estado: pedidoActualizado.estado

    }

  )

  if (

    pedidoActualizado.estado === "Entregado" &&

    !esServicioDigital(pedidoActualizado)

  ) {

    await descontarStockFirebase(

      pedidoActualizado.productos

    )

  }

  const nuevosPedidos =

    await obtenerPedidos()

  setPedidos(nuevosPedidos)

  setPedidoSeleccionado(

    nuevosPedidos.find(

      (pedido) => pedido.id === id

    ) || null

  )

  if (onDatosActualizados) {

    onDatosActualizados()

  }

} catch (error) {

  console.error(

    "Error al actualizar el pedido:",

    error

  )

}

  }


  const obtenerClaseEstado = (estado) => {

    switch (estado) {

      case "Pendiente":

        return "estado-pendiente"


      case "Preparando":

      case "Procesando":

        return "estado-preparando"


      case "En camino":

        return "estado-camino"


      case "Entregado":

      case "Completado":

        return "estado-entregado"


      default:

        return ""

    }

  }


  const descontarInventario = (pedido) => {

    // Seguridad:
    // los servicios digitales no tienen productos

    if (
      !Array.isArray(pedido.productos)
    ) {

      return

    }


    const productos =

      JSON.parse(

        localStorage.getItem("productos")

      ) || []


    const inventarioActualizado =

      productos.map((producto) => {

        const productoPedido =

          pedido.productos.find(

            (p) =>
              p.nombre === producto.nombre

          )


        if (!productoPedido) {

          return producto

        }


        const nuevoStock = Math.max(

          0,

          producto.stock -
            productoPedido.cantidad

        )


        return {

          ...producto,

          stock: nuevoStock,

          estado:
            nuevoStock > 0

              ? "Disponible"

              : "Agotado"

        }

      })


    localStorage.setItem(

      "productos",

      JSON.stringify(
        inventarioActualizado
      )

    )

  }


  return (

    <div>

      <h2>
        🛒 Gestión de Pedidos y Operaciones
      </h2>

      <h3>
        📦 Pedidos de Productos
      </h3>

      {
        pedidos.length === 0 ? (

          <p>
            No existen pedidos u operaciones registradas.
          </p>

        ) : (

          pedidos.map(
            (pedido, index) => {

              const servicioDigital =
                esServicioDigital(pedido)

              return (

                <div
                  key={pedido.id}
                  className="pedido-card"
                >

                  <div className="pedido-header">

                    <div>

                      <h3>

                        {
                          servicioDigital

                            ? `⚡ ${pedido.tipoOperacion}`

                            : `📦 Pedido #${String(
                                index + 1
                              ).padStart(
                                3,
                                "0"
                              )}`
                        }

                      </h3>


                      <p className="pedido-id">

                        ID: {pedido.id}

                      </p>

                    </div>

                  </div>


                  {
                    servicioDigital ? (

                      <>

                        <p>

                          🔹 <strong>
                            Servicio:
                          </strong>{" "}

                          {pedido.servicio}

                        </p>


                        <p>

                          📝 {pedido.detalle}

                        </p>

                      </>

                    ) : (

                      <>

                        <p>

                          👤 <strong>

                            {
                              pedido.cliente ||
                              "Cliente no registrado"
                            }

                          </strong>

                        </p>


                        <p>

                          🚚 {
                            pedido.tipoEntrega ||
                            "No especificado"
                          }

                        </p>


                        <p>

                          💳 {
                            pedido.metodoPago ||
                            "No especificado"
                          }

                        </p>

                      </>

                    )
                  }


                  <p>

                    📅 {
                      pedido.fecha ||
                      "Sin fecha"
                    }

                  </p>


                  <p>

                    💰 S/ {
                      Number(
                        pedido.total || 0
                      ).toFixed(2)
                    }

                  </p>


                  <p>

                    <strong>
                      Estado:
                    </strong>{" "}

                    <span
                      className={
                        `estado-badge ${
                          obtenerClaseEstado(
                            pedido.estado
                          )
                        }`
                      }
                    >

                      {pedido.estado}

                    </span>

                  </p>


                  <button

                    className="detalle-btn"

                    onClick={() =>
                      setPedidoSeleccionado(
                        pedido
                      )
                    }

                  >

                    👁 Ver detalle

                  </button>

                </div>

              )

            }
          )

        )
      }

  <hr style={{ margin: "40px 0" }} />

<h3>
  ⚡ Operaciones Digitales
</h3>

      {
        pedidoSeleccionado && (

          <div className="modal-overlay">

            <div className="pedido-modal">

              <div className="modal-header">

                <h2>

                  {
                    esServicioDigital(
                      pedidoSeleccionado
                    )

                      ? `⚡ ${pedidoSeleccionado.tipoOperacion}`

                      : "🛒 Detalle del Pedido"
                  }

                </h2>


                <button

                  className="close-modal"

                  onClick={() =>
                    setPedidoSeleccionado(
                      null
                    )
                  }

                >

                  ✕

                </button>

              </div>


              <div className="detalle-pedido">


                {
                  esServicioDigital(
                    pedidoSeleccionado
                  ) ? (

                    // =========================
                    // DETALLE SERVICIO DIGITAL
                    // =========================

                    <>

                      <p>

                        <strong>
                          ⚡ Tipo de operación:
                        </strong>{" "}

                        {
                          pedidoSeleccionado
                            .tipoOperacion
                        }

                      </p>


                      <p>

                        <strong>
                          🔹 Servicio:
                        </strong>{" "}

                        {
                          pedidoSeleccionado
                            .servicio
                        }

                      </p>


                      <p>

                        <strong>
                          📝 Detalle:
                        </strong>{" "}

                        {
                          pedidoSeleccionado
                            .detalle
                        }

                      </p>


                      <p>

                        <strong>
                          💰 Monto:
                        </strong>{" "}

                        S/ {
                          Number(
                            pedidoSeleccionado
                              .total || 0
                          ).toFixed(2)
                        }

                      </p>


                      <p>

                        <strong>
                          📅 Fecha:
                        </strong>{" "}

                        {
                          pedidoSeleccionado
                            .fecha
                        }

                      </p>

                    </>

                  ) : (

                    // =========================
                    // DETALLE PEDIDO NORMAL
                    // =========================

                    <>

                      <p>

                        <strong>
                          👤 Cliente:
                        </strong>{" "}

                        {
                          pedidoSeleccionado
                            .cliente
                        }

                      </p>


                      <p>

                        <strong>
                          🆔 DNI:
                        </strong>{" "}

                        {
                          pedidoSeleccionado
                            .dni
                        }

                      </p>


                      <p>

                        <strong>
                          📱 Celular:
                        </strong>{" "}

                        {
                          pedidoSeleccionado
                            .telefono
                        }

                      </p>


                      <p>

                        <strong>
                          📍 Dirección:
                        </strong>{" "}

                        {
                          pedidoSeleccionado
                            .direccion
                        }

                      </p>


                      <p>

                        <strong>
                          📌 Referencia:
                        </strong>{" "}

                        {
                          pedidoSeleccionado
                            .referencia
                        }

                      </p>


                      <hr />


                      <h3>
                        🛒 Productos
                      </h3>


                      <table className="productos-table">

                        <thead>

                          <tr>

                            <th>
                              Producto
                            </th>

                            <th>
                              Cantidad
                            </th>

                          </tr>

                        </thead>


                        <tbody>

                          {
                            (
                              pedidoSeleccionado
                                .productos || []
                            ).map(

                              (
                                producto,
                                index
                              ) => (

                                <tr
                                  key={index}
                                >

                                  <td>

                                    {
                                      producto.nombre
                                    }

                                  </td>

                                  <td>

                                    {
                                      producto.cantidad
                                    }

                                  </td>

                                </tr>

                              )

                            )
                          }

                        </tbody>

                      </table>


                      <hr />


                      <p>

                        <strong>
                          Subtotal:
                        </strong>{" "}

                        S/ {
                          Number(
                            pedidoSeleccionado
                              .subtotal || 0
                          ).toFixed(2)
                        }

                      </p>


                      <p>

                        <strong>
                          IGV:
                        </strong>{" "}

                        S/ {
                          Number(
                            pedidoSeleccionado
                              .igv || 0
                          ).toFixed(2)
                        }

                      </p>


                      <p>

                        <strong>
                          Delivery:
                        </strong>{" "}

                        S/ {
                          Number(
                            pedidoSeleccionado
                              .delivery || 0
                          ).toFixed(2)
                        }

                      </p>


                      <p>

                        <strong>
                          Total:
                        </strong>{" "}

                        S/ {
                          Number(
                            pedidoSeleccionado
                              .total || 0
                          ).toFixed(2)
                        }

                      </p>


                      <hr />


                      <p>

                        <strong>
                          💳 Método de pago:
                        </strong>{" "}

                        {
                          pedidoSeleccionado
                            .metodoPago
                        }

                      </p>


                      <p>

                        <strong>
                          🚚 Entrega:
                        </strong>{" "}

                        {
                          pedidoSeleccionado
                            .tipoEntrega
                        }

                      </p>


                      <p>

                        <strong>
                          📅 Fecha:
                        </strong>{" "}

                        {
                          pedidoSeleccionado
                            .fecha
                        }

                      </p>

                    </>

                  )
                }


                <p>

                  <strong>
                    Estado:
                  </strong>{" "}

                  <span
                    className={
                      `estado-badge ${
                        obtenerClaseEstado(
                          pedidoSeleccionado
                            .estado
                        )
                      }`
                    }
                  >

                    {
                      pedidoSeleccionado
                        .estado
                    }

                  </span>

                </p>


                {
                  pedidoSeleccionado.estado !==
                    "Entregado" &&

                  pedidoSeleccionado.estado !==
                    "Completado" && (

                    <button

                      className="estado-btn"

                      onClick={() =>
                        actualizarEstado(
                          pedidoSeleccionado.id
                        )
                      }

                    >

                      {
                        esServicioDigital(
                          pedidoSeleccionado
                        )

                          ? pedidoSeleccionado.estado ===
                            "Pendiente"

                            ? "⚙️ Procesar Operación"

                            : "✅ Marcar como Completada"

                          : pedidoSeleccionado.estado ===
                            "Pendiente"

                            ? "📦 Preparar Pedido"

                            : pedidoSeleccionado.estado ===
                              "Preparando"

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