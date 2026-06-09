import { useState } from 'react'

function Admin() {

  const [productos, setProductos] = useState([

    { nombre: 'Coca Cola', precio: 4.50, stock: 20, estado: 'Disponible' },

    { nombre: 'Papas Lays', precio: 3.00, stock: 15, estado: 'Disponible' },

    { nombre: 'Galletas Oreo', precio: 2.50, stock: 10, estado: 'Disponible' },

    { nombre: 'Agua Cielo', precio: 2.00, stock: 25, estado: 'Disponible' },

    { nombre: 'Arroz Costeño', precio: 6.50, stock: 12, estado: 'Disponible' },

    { nombre: 'Azúcar Rubia', precio: 4.20, stock: 8, estado: 'Disponible' },

    { nombre: 'Casino', precio: 2.00, stock: 20, estado: 'Disponible' },

    { nombre: 'Chizitos', precio: 3.50, stock: 18, estado: 'Disponible' },

    { nombre: 'Doritos', precio: 5.00, stock: 0, estado: 'Agotado' },

    { nombre: 'Leche Gloria', precio: 5.50, stock: 14, estado: 'Disponible' },

    { nombre: 'Pringles', precio: 9.00, stock: 5, estado: 'Disponible' },

    { nombre: 'Red Bull', precio: 8.50, stock: 0, estado: 'Agotado' },

    { nombre: 'Ritz', precio: 3.50, stock: 9, estado: 'Disponible' },

    { nombre: 'Snickers', precio: 4.00, stock: 16, estado: 'Disponible' },

    { nombre: 'Sprite', precio: 4.50, stock: 11, estado: 'Disponible' },

    { nombre: 'Sublime', precio: 2.50, stock: 22, estado: 'Disponible' },

    { nombre: 'Tentación', precio: 3.00, stock: 13, estado: 'Disponible' },

    { nombre: 'Trident', precio: 2.00, stock: 30, estado: 'Disponible' }

  ])

  const [nuevoNombre, setNuevoNombre] = useState('')

  const [nuevoPrecio, setNuevoPrecio] = useState('')

  const [nuevoStock, setNuevoStock] = useState('')

  const [nuevoEstado, setNuevoEstado] = useState('Disponible')

  const eliminarProducto = (index) => {

    const nuevosProductos = productos.filter(
      (_, i) => i !== index
    )

    setProductos(nuevosProductos)

  }

  const agregarProducto = () => {

    if (
      nuevoNombre === '' ||
      nuevoPrecio === '' ||
      nuevoStock === ''
    ) {

      alert('Complete todos los campos')

      return

    }

    const productoNuevo = {

      nombre: nuevoNombre,

      precio: Number(nuevoPrecio),

      stock: Number(nuevoStock),

      estado: nuevoEstado

    }

    setProductos([
      productoNuevo,
      ...productos
    ])

    setNuevoNombre('')

    setNuevoPrecio('')

    setNuevoStock('')

    setNuevoEstado('Disponible')

  }

  return (

        <div className="admin-container">

      <aside className="admin-sidebar">

        <h2>Bodega Liz</h2>

        <ul>

          <li>📊 Dashboard</li>

          <li>📦 Productos</li>

          <li>🛒 Pedidos</li>

          <li>👥 Clientes</li>

          <li>⚙️ Configuración</li>

        </ul>

      </aside>

      <main className="admin-content">

        <h1>Panel de Administración</h1>

        <p>
          Gestión general de la tienda.
        </p>

        <div className="admin-cards">

          <div className="admin-card">

            <h2>📦 Productos</h2>

            <h3>{productos.length}</h3>

          </div>

          <div className="admin-card">

            <h2>🛒 Pedidos</h2>

            <h3>0</h3>

          </div>

          <div className="admin-card">

            <h2>💰 Ventas</h2>

            <h3>S/ 0</h3>

          </div>

          <div className="admin-card">

            <h2>👥 Clientes</h2>

            <h3>0</h3>

          </div>

        </div>

        <h2 className="inventory-title">

          Gestión de Inventario

        </h2>

        <div className="product-form">

          <input
            type="text"
            placeholder="Nombre del producto"
            value={nuevoNombre}
            onChange={(e) =>
              setNuevoNombre(e.target.value)
            }
          />

          <input
            type="number"
            placeholder="Precio"
            value={nuevoPrecio}
            onChange={(e) =>
              setNuevoPrecio(e.target.value)
            }
          />

          <input
            type="number"
            placeholder="Stock"
            value={nuevoStock}
            onChange={(e) =>
              setNuevoStock(e.target.value)
            }
          />

          <select
            value={nuevoEstado}
            onChange={(e) =>
              setNuevoEstado(e.target.value)
            }
          >

            <option>
              Disponible
            </option>

            <option>
              Agotado
            </option>

          </select>

          <button
            className="add-btn"
            onClick={agregarProducto}
          >

            Guardar Producto

          </button>

        </div>

        <table className="inventory-table">

          <thead>

            <tr>

              <th>Producto</th>

              <th>Precio</th>

              <th>Stock</th>

              <th>Estado</th>

              <th>Acciones</th>

            </tr>

          </thead>

          <tbody>

            {
              productos.map((producto, index) => (

                <tr key={index}>

                  <td>{producto.nombre}</td>

                  <td>S/ {producto.precio}</td>

                  <td>{producto.stock}</td>

                  <td>{producto.estado}</td>

                  <td>

                    <button className="edit-btn">

                      Editar

                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => eliminarProducto(index)}
                    >

                      Eliminar

                    </button>

                  </td>

                </tr>

              ))
            }

          </tbody>

        </table>

      </main>

    </div>

  );

}

export default Admin;