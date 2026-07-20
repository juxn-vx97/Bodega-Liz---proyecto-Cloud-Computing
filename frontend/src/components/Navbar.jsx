import { Link, useLocation } from 'react-router-dom'

function Navbar(props) {

   console.log("Navbar render:", props.carrito);

  const location = useLocation()
  
  if (location.pathname === '/administrador') {

  return null


}

  return (

    <nav className="navbar">

      <div className="logo-section">

        <div className="logo-circle">
          🛒
        </div>

        <div>

          <h2
             style={{
             color: 'white',
             fontWeight: '800',
             letterSpacing: '1px'
         }}
            >
              Bodega Liz
          </h2>

          <p>
            Todo lo que necesitas cerca de ti
          </p>

        </div>

      </div>



      <ul className="menu">

        <li>
          <Link to="/">Inicio</Link>
        </li>

        <li>
          <Link to="/productos">Productos</Link>
        </li>

      <li>
          <Link to="/servicios">⚡ Servicios</Link>
      </li>

        <li>
          <Link to="/contacto">Contacto</Link>
      </li>

      </ul>



      <Link to="/carrito" className="cart">

        🛒  {props.carrito.length}
      </Link>

    </nav>

  );
}

export default Navbar;