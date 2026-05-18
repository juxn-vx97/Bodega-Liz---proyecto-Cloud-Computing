import { Link } from 'react-router-dom'

function Navbar(props) {
  return (
    <nav className="navbar">

      <h2>Bodega Liz</h2>

      <ul className="menu">

        <li>
          <Link to="/">Inicio</Link>
        </li>

        <li>
          <Link to="/productos">Productos</Link>
        </li>

        <li>
          <Link to="/servicios">Servicios</Link>
        </li>

        <li>
          <Link to="/contacto">Contacto</Link>
        </li>

      </ul>


      <Link to="/carrito" className="cart">

  🛒 {props.carrito.length}

</Link>

    </nav>
  );
}

export default Navbar;