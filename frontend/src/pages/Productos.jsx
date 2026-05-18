import ProductCard from '../components/ProductCard'

import cocaColaImg from '../assets/cocacola.jpg'
import laysImg from '../assets/lays.jpg'
import oreoImg from '../assets/oreo.jpg'

function Productos(props) {

  const productos = [

    {
      id: 1,
      nombre: 'Coca Cola',
      precio: '4.50',
      imagen: cocaColaImg
    },

    {
      id: 2,
      nombre: 'Papas Lays',
      precio: '3.00',
      imagen: laysImg
    },

    {
      id: 3,
      nombre: 'Galletas Oreo',
      precio: '2.50',
      imagen: oreoImg
    },

    {
      id: 4,
      nombre: 'Inca Kola',
      precio: '5.00',
      imagen: cocaColaImg
    },

    {
      id: 5,
      nombre: 'Chizitos',
      precio: '2.00',
      imagen: laysImg
    },

    {
      id: 6,
      nombre: 'Casino',
      precio: '1.50',
      imagen: oreoImg
    }

  ]


  return (
    <div>

      <section className="page-title">

        <h1>Todos nuestros productos</h1>

        <p>
          Encuentra bebidas, snacks y productos de primera necesidad.
        </p>

      </section>


      <section className="products">

        {
          productos.map((producto) => (
            <ProductCard
              key={producto.id}
              nombre={producto.nombre}
              precio={producto.precio}
              imagen={producto.imagen}
              carrito={props.carrito}
              setCarrito={props.setCarrito}
            />
          ))
        }

      </section>

    </div>
  );
}

export default Productos;