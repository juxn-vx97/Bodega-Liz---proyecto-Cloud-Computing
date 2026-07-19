function Carrito(props) {

  const eliminarProducto = (indexProducto) => {

    const nuevoCarrito = props.carrito.filter((producto, index) => {

      return index !== indexProducto

    })

    props.setCarrito(nuevoCarrito)

  }



const aumentarCantidad = (indexProducto) => {

  const nuevoCarrito = props.carrito.map(

    (producto, index) => {

      if (index === indexProducto) {

        if (producto.cantidad >= producto.stock) {

          alert("No hay más stock disponible.")

          return producto

        }

        return {

          ...producto,

          cantidad: producto.cantidad + 1

        }

      }

      return producto

    }

  )

  props.setCarrito(nuevoCarrito)

}



  const disminuirCantidad = (indexProducto) => {

    const nuevoCarrito = props.carrito.map((producto, index) => {

      if (index === indexProducto) {

        return {

          ...producto,

          cantidad: producto.cantidad - 1

        }

      }

      return producto

    }).filter((producto) => producto.cantidad > 0)

    props.setCarrito(nuevoCarrito)

  }



  const total = props.carrito.reduce((acumulador, producto) => {

    return acumulador +

      (Number(producto.precio) * producto.cantidad)

  }, 0)



  const igv = total * 0.18

  const subtotal = total - igv

 console.log("Carrito actual:", props.carrito);

  return (
    <div>

      <section className="page-title">

        <h1>Carrito de compras</h1>

        <p>
          Productos agregados por el cliente.
        </p>

      </section>



      <section className="cart-container">

        {
          props.carrito.map((producto, index) => (

            <div className="cart-card" key={index}>

              <img
                src={producto.imagen}
                alt={producto.nombre}
              />

              <h2>{producto.nombre}</h2>



              <div className="quantity-controls">

                <button
                  onClick={() => disminuirCantidad(index)}
                >
                  -
                </button>

                <span>
                  {producto.cantidad}
                </span>

                <button
                  onClick={() => aumentarCantidad(index)}
                >
                  +
                </button>

              </div>



              <p>
                S/ {(producto.precio * producto.cantidad).toFixed(2)}
              </p>



              <button
                onClick={() => eliminarProducto(index)}
              >
                Eliminar
              </button>

            </div>

          ))
        }

      </section>



      <section className="cart-total">

        <h3>
          Subtotal: S/ {subtotal.toFixed(2)}
        </h3>

        <h3>
          IGV (18%): S/ {igv.toFixed(2)}
        </h3>

        <h2>
          Total: S/ {total.toFixed(2)}
        </h2>

        <button

        className="checkout-btn"

        onClick={() =>
        window.location.href =
        '/finalizar-compra'
        }

>

Finalizar Compra

</button>

      </section>

    </div>
  );
}

export default Carrito;