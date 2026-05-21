import { Link } from 'react-router-dom'

function Hero() {

  return (

    <section className="hero">

      <h1>Bodega Liz</h1>

      <h2>
        Todo lo que necesitas cerca de ti
      </h2>

      <p>
        Encuentra bebidas, snacks y productos
        de calidad con atención rápida y precios accesibles.
      </p>

      <Link to="/productos">

        <button>
          Ver Productos
        </button>

      </Link>

    </section>

  );
}

export default Hero;