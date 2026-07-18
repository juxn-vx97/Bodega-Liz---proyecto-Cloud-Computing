import { useState, useEffect } from "react";

import {
  obtenerPedidos,
  obtenerOperaciones,
  actualizarPedidoFirebase,
  actualizarOperacionFirebase,
  descontarStockFirebase,
} from "../firebase/firebaseService";

function PedidosAdmin() {

  // ===========================
  // ESTADOS
  // ===========================

  const [pedidos, setPedidos] = useState([]);
  const [operaciones, setOperaciones] = useState([]);
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);
  const [vista, setVista] = useState("pedidos");
  const [cargando, setCargando] = useState(true);

  // ===========================
  // CARGAR DATOS
  // ===========================

  const cargarDatos = async () => {

    try {

      setCargando(true);

      const [datosPedidos, datosOperaciones] =
        await Promise.all([
          obtenerPedidos(),
          obtenerOperaciones(),
        ]);

      setPedidos(datosPedidos);
      setOperaciones(datosOperaciones);

    } catch (error) {

      console.error(
        "Error cargando datos:",
        error
      );

    } finally {

      setCargando(false);

    }

  };

  useEffect(() => {

    cargarDatos();

  }, []);

  useEffect(() => {

    const cerrarConEsc = (e) => {

      if (e.key === "Escape") {

        setPedidoSeleccionado(null);

      }

    };

    window.addEventListener(
      "keydown",
      cerrarConEsc
    );

    return () => {

      window.removeEventListener(
        "keydown",
        cerrarConEsc
      );

    };

  }, []);

  // ===========================
  // FUNCIONES AUXILIARES
  // ===========================

  const esServicioDigital = (item) => {

    return Boolean(item?.tipoOperacion);

  };

  const obtenerClaseEstado = (estado) => {

    switch (estado) {

      case "Pendiente":
        return "estado-pendiente";

      case "Preparando":
      case "Procesando":
        return "estado-preparando";

      case "En camino":
        return "estado-camino";

      case "Entregado":
      case "Completado":
        return "estado-entregado";

      default:
        return "";

    }

  };

  // ======== CONTINÚA EN BLOQUE 2 ========

    // ===========================
  // MODAL
  // ===========================

  const abrirDetalle = (item) => {

    setPedidoSeleccionado(item);

  };

  const cerrarDetalle = () => {

    setPedidoSeleccionado(null);

  };

  // ===========================
  // ACTUALIZAR PEDIDOS
  // ===========================

  const actualizarPedido = async (pedido) => {

    let nuevoEstado = pedido.estado;

    if (pedido.estado === "Pendiente") {

      nuevoEstado = "Preparando";

    } else if (pedido.estado === "Preparando") {

      nuevoEstado = "En camino";

    } else if (pedido.estado === "En camino") {

      const confirmar = window.confirm(
        "¿Desea marcar este pedido como ENTREGADO?\n\nSe descontará automáticamente el stock."
      );

      if (!confirmar) return;

      nuevoEstado = "Entregado";

    } else {

      return;

    }

    try {

      await actualizarPedidoFirebase(
        pedido.firebaseId,
        {
          estado: nuevoEstado,
        }
      );

      if (nuevoEstado === "Entregado") {

        await descontarStockFirebase(
          pedido.productos
        );

      }

      await cargarDatos();

      const actualizado = (
        await obtenerPedidos()
      ).find(
        (p) => p.id === pedido.id
      );

      setPedidoSeleccionado(
        actualizado || null
      );

    } catch (error) {

      console.error(
        "Error actualizando pedido:",
        error
      );

    }

  };

  // ===========================
  // ACTUALIZAR OPERACIONES
  // ===========================

 const actualizarOperacion = async (operacion) => {

  let nuevoEstado = operacion.estado;

  if (operacion.estado === "Pendiente") {

    const confirmar = window.confirm(
      "¿Desea marcar esta operación como COMPLETADA?"
    );

    if (!confirmar) return;

    nuevoEstado = "Completado";

  } else {

    return;

  }

  try {

    await actualizarOperacionFirebase(
      operacion.firebaseId,
      {
        estado: nuevoEstado,
      }
    );

    await cargarDatos();

    const actualizada = (
      await obtenerOperaciones()
    ).find(
      (o) => o.id === operacion.id
    );

    setPedidoSeleccionado(
      actualizada || null
    );

  } catch (error) {

    console.error(
      "Error actualizando operación:",
      error
    );

  }

};

  // ===========================
  // CONTINÚA EN BLOQUE 3
  // ===========================

    return (
    <div className="pedidos-admin">

      <div className="tabs-admin">

        <button
          className={
            vista === "pedidos"
              ? "tab activo"
              : "tab"
          }
          onClick={() =>
            setVista("pedidos")
          }
        >
          Pedidos
        </button>

        <button
          className={
            vista === "operaciones"
              ? "tab activo"
              : "tab"
          }
          onClick={() =>
            setVista("operaciones")
          }
        >
          Operaciones
        </button>

      </div>

      {cargando ? (

        <p>Cargando datos...</p>

      ) : vista === "pedidos" ? (

        <div className="lista-pedidos">

          {pedidos.length === 0 ? (

            <p>No hay pedidos registrados.</p>

          ) : (

            pedidos.map((pedido) => (

              <div
                key={pedido.id}
                className="pedido-card"
              >

                <div className="pedido-header">

                  <h3>
                    Pedido #{pedido.id}
                  </h3>

                  <span
                    className={obtenerClaseEstado(
                      pedido.estado
                    )}
                  >
                    {pedido.estado}
                  </span>

                </div>

                <p>
  <strong>Cliente:</strong>{" "}
  {pedido.cliente}
</p>

                <p>
                  <strong>Total:</strong>{" "}
                  S/
                  {Number(
                    pedido.total || 0
                  ).toFixed(2)}
                </p>

                <div className="acciones-pedido">

                  <button
                    onClick={() =>
                      abrirDetalle(
                        pedido
                      )
                    }
                  >
                    Ver detalle
                  </button>

                  {pedido.estado !==
                    "Entregado" && (

                    <button
                      onClick={() =>
                        actualizarPedido(
                          pedido
                        )
                      }
                    >
                      Actualizar estado
                    </button>

                  )}

                </div>

              </div>

            ))

          )}

        </div>

      ) : (

        <div className="lista-pedidos">

          {operaciones.length === 0 ? (

            <p>
              No hay operaciones
              registradas.
            </p>

          ) : (

            operaciones.map(
              (operacion) => (
                              <div
                  key={operacion.id}
                  className="pedido-card"
                >

                  <div className="pedido-header">

                    <h3>
                      Operación #{operacion.id}
                    </h3>

                    <span
                      className={obtenerClaseEstado(
                        operacion.estado
                      )}
                    >
                      {operacion.estado}
                    </span>

                  </div>

 <p>
  <strong>
    {operacion.tipoOperacion === "Pago de Servicios"
      ? "Código:"
      : "Número:"}
  </strong>{" "}
  {operacion.tipoOperacion === "Pago de Servicios"
    ? (
        operacion.codigo ||
        operacion.detalle?.replace(
          "Código de suministro: ",
          ""
        )
      )
    : (
        operacion.numero ||
        operacion.detalle
          ?.replace("Número: ", "")
          ?.replace("Número de tarjeta: ", "")
      )}
</p>

<p>
  <strong>
    {operacion.tipoOperacion === "Recarga Móvil"
      ? "Operador:"
      : operacion.tipoOperacion === "Recarga de Tarjeta"
      ? "Tarjeta:"
      : "Servicio:"}
  </strong>{" "}
  {operacion.servicio}
</p>

<p>
  <strong>Monto:</strong>{" "}
  S/
  {Number(
    operacion.total || 0
  ).toFixed(2)}
</p>

                  <div className="acciones-pedido">

                    <button
                      onClick={() =>
                        abrirDetalle(
                          operacion
                        )
                      }
                    >
                      Ver detalle
                    </button>

                    {operacion.estado !==
                      "Completado" && (

                      <button
                        onClick={() =>
                          actualizarOperacion(
                            operacion
                          )
                        }
                      >
                        Actualizar estado
                      </button>

                    )}

                  </div>

                </div>

              )
            )

          )}

        </div>

      )}

      {pedidoSeleccionado && (
                <div
          className="modal-overlay"
          onClick={cerrarDetalle}
        >

          <div
            className="modal-pedido"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <h2>
              {esServicioDigital(
                pedidoSeleccionado
              )
                ? "Detalle de Operación"
                : "Detalle del Pedido"}
            </h2>

            <p>
              <strong>ID:</strong>{" "}
              {pedidoSeleccionado.id}
            </p>

            {!esServicioDigital(
  pedidoSeleccionado
) && (
  <>
    <p>
      <strong>Cliente:</strong>{" "}
      {pedidoSeleccionado.cliente}
    </p>

    <p>
      <strong>DNI:</strong>{" "}
      {pedidoSeleccionado.dni}
    </p>
  </>
)}

            <p>
              <strong>Estado:</strong>{" "}
              {pedidoSeleccionado.estado}
            </p>

            <p>
              <strong>Total:</strong> S/
              {Number(
                pedidoSeleccionado.total || 0
              ).toFixed(2)}
            </p>

            {esServicioDigital(
              pedidoSeleccionado
            ) ? (

              <>
  {pedidoSeleccionado.tipoOperacion === "Recarga Móvil" && (
    <>
      <p>
        <strong>Número:</strong>{" "}
        {pedidoSeleccionado.numero}
      </p>

      <p>
        <strong>Operador:</strong>{" "}
        {pedidoSeleccionado.servicio}
      </p>
    </>
  )}

  {pedidoSeleccionado.tipoOperacion === "Pago de Servicios" && (
    <>
      <p>
        <strong>Código:</strong>{" "}
        {pedidoSeleccionado.codigo}
      </p>

      <p>
        <strong>Servicio:</strong>{" "}
        {pedidoSeleccionado.servicio}
      </p>
    </>
  )}

  {pedidoSeleccionado.tipoOperacion === "Recarga de Tarjeta" && (
    <>
      <p>
        <strong>Número:</strong>{" "}
        {pedidoSeleccionado.numero}
      </p>

      <p>
        <strong>Tarjeta:</strong>{" "}
        {pedidoSeleccionado.servicio}
      </p>
    </>
  )}

  <p>
    <strong>Fecha:</strong>{" "}
    {pedidoSeleccionado.fecha}
  </p>
</>
            ) : (

              <>
                <h3>
                  Productos
                </h3>

                <ul>

                  {(
                    pedidoSeleccionado.productos ||
                    []
                  ).map(
                    (
                      producto,
                      index
                    ) => (

                      <li key={index}>

                        {producto.nombre}
                        {" - "}
                        Cantidad:
                        {" "}
                        {producto.cantidad}

                      </li>

                    )
                  )}

                </ul>

              </>

            )}

            <div className="acciones-pedido">

                {esServicioDigital(
                  pedidoSeleccionado
                ) ? (

                pedidoSeleccionado.estado !==
                  "Completado" && (

                  <button
                    onClick={() =>
                      actualizarOperacion(
                        pedidoSeleccionado
                      )
                    }
                  >
                    Actualizar estado
                  </button>

                )

              ) : (

                pedidoSeleccionado.estado !==
                  "Entregado" && (

                  <button
                    onClick={() =>
                      actualizarPedido(
                        pedidoSeleccionado
                      )
                    }
                  >
                    Actualizar estado
                  </button>

                )

              )}

              <button
                onClick={cerrarDetalle}
              >
                Cerrar
              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );

}

export default PedidosAdmin;  