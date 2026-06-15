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

  const [productoEditando, setProductoEditando] = useState(null)

const [editarNombre, setEditarNombre] = useState('')

const [editarPrecio, setEditarPrecio] = useState('')

const [editarStock, setEditarStock] = useState('')

const [editarEstado, setEditarEstado] = useState('')

const [busqueda, setBusqueda] = useState('')

  const eliminarProducto = (index) => {

  const nuevosProductos = productos.filter(
    (_, i) => i !== index
  )

  setProductos(nuevosProductos)

}

const seleccionarProducto = (producto, index) => {

  setProductoEditando(index)

  setEditarNombre(producto.nombre)

  setEditarPrecio(producto.precio)

  setEditarStock(producto.stock)

  setEditarEstado(producto.estado)

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

  estado: Number(nuevoStock) > 0
    ? 'Disponible'
    : 'Agotado'

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

const guardarCambios = () => {

  const nuevosProductos = [...productos]

  nuevosProductos[productoEditando] = {

  nombre: editarNombre,

  precio: Number(editarPrecio),

  stock: Number(editarStock),

  estado: Number(editarStock) > 0
    ? 'Disponible'
    : 'Agotado'

}

  setProductos(nuevosProductos)

  setProductoEditando(null)

}

const productosFiltrados = productos.filter(
  (producto) =>
    producto.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase())
)

const productosDisponibles = productos.filter(
  producto => producto.stock > 0
).length

const productosAgotados = productos.filter(
  producto => producto.stock === 0
).length

const productosStockBajo = productos.filter(
  producto => producto.stock > 0 && producto.stock <= 5
).length

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

    <h2>🟢 Disponibles</h2>

    <h3>{productosDisponibles}</h3>

  </div>

  <div className="admin-card">

    <h2>🔴 Agotados</h2>

    <h3>{productosAgotados}</h3>

  </div>

  <div className="admin-card">

    <h2>🟡 Stock Bajo</h2>

    <h3>{productosStockBajo}</h3>

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

        <div className="search-container">

  <input
    type="text"
    placeholder="🔍 Buscar producto..."
    value={busqueda}
    onChange={(e) =>
      setBusqueda(e.target.value)
    }
    className="search-input"
  />

</div>
        
        {
  productoEditando !== null && (

    <div className="product-form">

      <h3>Editar Producto</h3>

      <input
        type="text"
        value={editarNombre}
        onChange={(e) =>
          setEditarNombre(e.target.value)
        }
      />

      <input
        type="number"
        value={editarPrecio}
        onChange={(e) =>
          setEditarPrecio(e.target.value)
        }
      />

      <input
        type="number"
        value={editarStock}
        onChange={(e) =>
          setEditarStock(e.target.value)
        }
      />

      <select
        value={editarEstado}
        onChange={(e) =>
          setEditarEstado(e.target.value)
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
        onClick={guardarCambios}
      >

        Guardar Cambios

      </button>

    </div>

  )
}   

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
              productosFiltrados.map((producto, index) => (
                <tr key={index}>

                  <td>{producto.nombre}</td>

                  <td>S/ {producto.precio}</td>

                  <td>{producto.stock}</td>

                  <td>

                    {producto.stock === 0
                       ? '🔴 Agotado'
                   : producto.stock <= 5
                       ? '🟡 Stock Bajo'
                       : '🟢 Disponible'}

                  </td>
                  <td>

                    <button
  className="edit-btn"
  onClick={() =>
    seleccionarProducto(producto, index)
  }
>

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