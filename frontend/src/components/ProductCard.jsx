function ProductCard(props) {

  function agregarCarrito() {

    const productoExistente = props.carrito.find(

      (producto) => producto.nombre === props.nombre

    )


    if (productoExistente) {

      const nuevoCarrito = props.carrito.map((producto) => {

        if (producto.nombre === props.nombre) {

          return {

            ...producto,

            cantidad: producto.cantidad + 1

          }

        }

        return producto

      })

      props.setCarrito(nuevoCarrito)

    } else {

      props.setCarrito([

        ...props.carrito,

        {

          nombre: props.nombre,

          precio: props.precio,

          imagen: props.imagen,

          cantidad: 1

        }

      ])

    }

  }


  return (
    <div className="card">

      <img src={props.imagen} alt={props.nombre} />

      <h2>{props.nombre}</h2>

      <p>Precio: S/ {props.precio}</p>

      <button onClick={agregarCarrito}>
        Agregar al carrito
      </button>

    </div>
  );
}

export default ProductCard;