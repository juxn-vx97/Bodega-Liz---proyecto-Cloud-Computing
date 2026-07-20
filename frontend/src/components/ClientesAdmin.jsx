function ClientesAdmin({ pedidos }) {

  const clientes = []

  pedidos.forEach((pedido) => {

  if (!pedido.cliente) return;

    const identificador =
      pedido.dni ||
      pedido.telefono ||
      pedido.cliente

    const clienteExistente = clientes.find(
      (cliente) => cliente.identificador === identificador
    )

    if (!clienteExistente) {

      clientes.push({

        identificador,

        nombre: pedido.cliente || "Sin nombre",

        dni: pedido.dni || "No registrado",

        telefono: pedido.telefono || "No registrado",

        operaciones: 1,

        ultimaOperacion:
          pedido.fecha || "Sin fecha"

      })

    } else {

      clienteExistente.operaciones += 1

      clienteExistente.ultimaOperacion =
        pedido.fecha || clienteExistente.ultimaOperacion

    }

  })

  return (

    <div>

      <h2 className="inventory-title">
        👥 Gestión de Clientes
      </h2>

      <p>
        Clientes registrados a partir de las operaciones realizadas en Bodega Liz.
      </p>

      {
        clientes.length === 0 ? (

          <p>
            No existen clientes registrados todavía.
          </p>

        ) : (

          <table className="inventory-table">

            <thead>

              <tr>

                <th>Cliente</th>

                <th>DNI</th>

                <th>Celular</th>

                <th>Operaciones</th>

                <th>Última operación</th>

              </tr>

            </thead>

            <tbody>

              {
                clientes.map((cliente, index) => (

                  <tr key={index}>

                    <td>{cliente.nombre}</td>

                    <td>{cliente.dni}</td>

                    <td>{cliente.telefono}</td>

                    <td>{cliente.operaciones}</td>

                    <td>{cliente.ultimaOperacion}</td>

                  </tr>

                ))
              }

            </tbody>

          </table>

        )
      }

    </div>

  )

}

export default ClientesAdmin