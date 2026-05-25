import { Link } from 'react-router-dom'

import heroImg from '../assets/hero.jpg'

function Hero() {

  return (

    <section
      className="hero"
      style={{

        backgroundImage: `
          linear-gradient(
            rgba(0,0,0,0.55),
            rgba(0,0,0,0.55)
          ),
          url(${heroImg})
        `
      }}
    >

      <div className="hero-content">

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

      </div>

    </section>

  );
}

export default Hero;