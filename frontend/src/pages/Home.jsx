import Hero from '../components/Hero'
import ProductCard from '../components/ProductCard'

import cocaColaImg from '../assets/cocacola.jpg'
import laysImg from '../assets/lays.jpg'
import oreoImg from '../assets/oreo.jpg'

function Home() {

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
    }
  ]


  return (
    <div>

      <Hero />

      <section className="products">

        {
          productos.map((producto) => (
            <ProductCard
              key={producto.id}
              nombre={producto.nombre}
              precio={producto.precio}
              imagen={producto.imagen}
            />
          ))
        }

      </section>

    </div>
  );
}

export default Home;