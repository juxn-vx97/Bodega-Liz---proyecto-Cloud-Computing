import { useState, useEffect } from 'react'

import db from '../firebase/firestore'

import DashboardAdmin from '../components/DashboardAdmin'

import PedidosAdmin from '../components/PedidosAdmin'

import InventarioAdmin from '../components/InventarioAdmin'

import ClientesAdmin from '../components/ClientesAdmin'

import ConfiguracionAdmin from '../components/ConfiguracionAdmin'

import {

  obtenerProductos,
  obtenerPedidos,
  agregarProductoFirebase,
  actualizarProductoFirebase,
  eliminarProductoFirebase

} from "../firebase/firebaseService"

import {
  collection,
  addDoc
} from 'firebase/firestore'


function Admin() {

const [productos, setProductos] = useState(() => {

  const productosGuardados =
    localStorage.getItem('productos')

  return productosGuardados
    ? JSON.parse(productosGuardados)
    : [

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
      
    ]
})

useEffect(() => {

  const cargarProductosFirebase = async () => {

    try {

      const productosFirebase =
        await obtenerProductos()

      if (productosFirebase.length > 0) {

        setProductos(productosFirebase)

        localStorage.setItem(
          "productos",
          JSON.stringify(productosFirebase)
        )

        console.log(
          "Productos cargados desde Firebase:",
          productosFirebase.length
        )

      }

    } catch (error) {

      console.error(
        "Error al cargar productos desde Firebase:",
        error
      )

      console.log(
        "Se mantienen los productos guardados en localStorage."
      )

    }

  }

  cargarProductosFirebase()

}, [])

        useEffect(() => {

            localStorage.setItem(
                'productos',
               JSON.stringify(productos)
           )

             }, [productos])


  const [adminLogueado, setAdminLogueado] = useState(
  sessionStorage.getItem('adminLogueado') === 'true'
)

  const [usuario, setUsuario] = useState('')

  const [password, setPassword] = useState('')

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

const [moduloActivo, setModuloActivo] = useState('dashboard')

  const eliminarProducto = async (index) => {

  const productoAEliminar =
    productos[index]

  if (!productoAEliminar) {

    alert(
      "No se encontró el producto que desea eliminar."
    )

    return

  }

  const confirmar =
    window.confirm(
      `¿Está seguro de eliminar "${productoAEliminar.nombre}"?\n\nEsta acción eliminará el producto de Firebase.`
    )

  if (!confirmar) {

    return

  }

  try {

    await eliminarProductoFirebase(
      productoAEliminar.id
    )

    setProductos(
      productosActuales =>
        productosActuales.filter(
          (_, i) => i !== index
        )
    )

    alert(
      "Producto eliminado correctamente de Firebase."
    )

  } catch (error) {

    console.error(
      "Error al eliminar producto:",
      error
    )

    alert(
      "No se pudo eliminar el producto."
    )

  }

}

const seleccionarProducto = (producto) => {

  setProductoEditando(producto.indexOriginal)

  setEditarNombre(producto.nombre)

  setEditarPrecio(producto.precio)

  setEditarStock(producto.stock)

  setEditarEstado(producto.estado)

}

const agregarProducto = async () => {

  if (
    nuevoNombre.trim() === '' ||
    nuevoPrecio === '' ||
    nuevoStock === ''
  ) {

    alert('Complete todos los campos')

    return

  }

  const productoNuevo = {

    nombre: nuevoNombre.trim(),

    precio: Number(nuevoPrecio),

    stock: Number(nuevoStock),

    estado:
      Number(nuevoStock) > 0
        ? 'Disponible'
        : 'Agotado'

  }

  try {

    // 1. Guardar primero en Firebase
    const idFirebase =
      await agregarProductoFirebase(
        productoNuevo
      )

    // 2. Agregar el ID generado por Firebase
    const productoGuardado = {

      id: idFirebase,

      ...productoNuevo

    }

    // 3. Actualizar inmediatamente la pantalla
    setProductos(
      productosActuales => [

        productoGuardado,

        ...productosActuales

      ]
    )

    // 4. Limpiar formulario
    setNuevoNombre('')

    setNuevoPrecio('')

    setNuevoStock('')

    setNuevoEstado('Disponible')

    alert(
      'Producto guardado correctamente en Firebase.'
    )

  } catch (error) {

    console.error(
      'Error al guardar producto en Firebase:',
      error
    )

    alert(
      'No se pudo guardar el producto. Revise la consola.'
    )

  }

}

const guardarCambios = async () => {

  const productoActual =
    productos[productoEditando]

  if (!productoActual) {

    alert(
      "No se encontró el producto que desea editar."
    )

    return

  }

  if (
    editarNombre.trim() === "" ||
    editarPrecio === "" ||
    editarStock === ""
  ) {

    alert(
      "Complete todos los campos."
    )

    return

  }

  const productoActualizado = {

    nombre: editarNombre.trim(),

    precio: Number(editarPrecio),

    stock: Number(editarStock),

    estado:
      Number(editarStock) > 0
        ? "Disponible"
        : "Agotado"

  }

  try {

    await actualizarProductoFirebase(
      productoActual.id,
      productoActualizado
    )

    setProductos(
      productosActuales =>
        productosActuales.map(
          (producto, index) =>

            index === productoEditando

              ? {
                  ...producto,
                  ...productoActualizado
                }

              : producto
        )
    )

    setProductoEditando(null)

    alert(
      "Producto actualizado correctamente en Firebase."
    )

  } catch (error) {

    console.error(
      "Error al actualizar producto:",
      error
    )

    alert(
      "No se pudo actualizar el producto."
    )

  }

}

const productosFiltrados = productos.filter(
  (producto) =>
    producto.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase())
).map((producto) => ({
  ...producto,
  indexOriginal: productos.indexOf(producto)
}))

const productosDisponibles = productos.filter(
  producto => producto.stock > 0
).length

const productosAgotados = productos.filter(
  producto => producto.stock === 0
).length

const productosStockBajo = productos.filter(
  producto => producto.stock > 0 && producto.stock <= 5
).length

const [pedidos, setPedidos] = useState([])

const actualizarDatosAdmin = async () => {

  try {

    const pedidosFirebase =
      await obtenerPedidos()

    const productosFirebase =
      await obtenerProductos()

    setPedidos(pedidosFirebase)

    setProductos(productosFirebase)

  } catch (error) {

    console.error(error)

  }

}

useEffect(() => {

  actualizarDatosAdmin()

}, [moduloActivo])

const ventasTotales = pedidos

  .filter((pedido) => {

    const esServicioDigital =
      Boolean(pedido.tipoOperacion)

    if (esServicioDigital) {

      return pedido.estado === "Completado"

    }

    return pedido.estado === "Entregado"

  })

  .reduce((total, pedido) => {

    return total + Number(pedido.total || 0)

  }, 0)

  const clientesUnicos = new Set(

  pedidos

    .filter((pedido) =>
      !pedido.tipoOperacion
    )

    .map((pedido) =>
      pedido.dni ||
      pedido.telefono ||
      pedido.cliente
    )

    .filter(Boolean)

).size

const iniciarSesion = () => {

  if (
    usuario === 'admin' &&
    password === '123456'
  ) {

    sessionStorage.setItem(
  'adminLogueado',
  'true'
)

sessionStorage.setItem(
  'ultimoUsuario',
  usuario
)

    setAdminLogueado(true)

  } else {

    alert(
      'Usuario o contraseña incorrectos'
    )

  }

}

const cerrarSesion = () => {

  sessionStorage.removeItem(
  'adminLogueado'
)

sessionStorage.removeItem(
  'ultimoUsuario'
)

  setAdminLogueado(false)

  setPassword('')

}

if (!adminLogueado) {

  return (


   <div className="login-page">
   <div className="login-admin">

   <div className="login-icon">
    🔐
   </div>    

      <h1>
        Acceso Administrativo
      </h1>

      <p>
        Ingrese sus credenciales para acceder al sistema.
      </p>

      <input
        type="text"
        placeholder="Usuario"
        value={usuario}
        onChange={(e) =>
          setUsuario(e.target.value)
        }
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <button
        className="add-btn"
        onClick={iniciarSesion}
      >
        Ingresar
      </button>

    </div>
    </div>


  )

}

  return (

        <div className="admin-container">

      <aside className="admin-sidebar">

        <h2>Bodega Liz</h2>

        <ul>

        <li 
            onClick={() => setModuloActivo('dashboard')}
          >
          📊 Dashboard
        </li>

        <li
            onClick={() => setModuloActivo('productos')}
>
          📦 Productos
        </li>

        <li
            onClick={() => setModuloActivo('pedidos')}
          >
          🛒 Pedidos
        </li>

        <li
            onClick={() => setModuloActivo('clientes')}
         >
          👥 Clientes
        </li>

<li
  onClick={() => setModuloActivo('configuracion')}
>
  ⚙️ Configuración
</li>

        </ul>

      </aside>

      <main className="admin-content">

       <div className="admin-header">

  <div>

    <h1>Panel de Administración</h1>

    <p>
      Gestión general de la tienda.
    </p>

  </div>

  <div className="admin-user">

    <span>
      👤 Administrador
    </span>

    <button
      className="logout-btn"
      onClick={cerrarSesion}
    >
      🚪 Cerrar Sesión
    </button>

  </div>

</div>


{moduloActivo === 'dashboard' && (

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

            <h3>{pedidos.length}</h3>
          </div>

          <div className="admin-card">

  <h2>💰 Ventas</h2>

  <h3>
    S/ {ventasTotales.toFixed(2)}
  </h3>

</div>
          <div className="admin-card">

  <h2>👥 Clientes</h2>

  <h3>{clientesUnicos}</h3>

</div>

        </div>

        )}


       {moduloActivo === 'pedidos' && (

  <PedidosAdmin
    onDatosActualizados={actualizarDatosAdmin}
  />

)}

{moduloActivo === 'productos' && (

<>

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
  seleccionarProducto(producto)
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

      </>

    )}

    {moduloActivo === 'clientes' && (

      <ClientesAdmin />

    )}

    {moduloActivo === 'configuracion' && (

      <ConfiguracionAdmin />

    )}

      </main>

    </div>

  )

}

export default Admin
