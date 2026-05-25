import { useLocation } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import cocaColaImg from '../assets/cocacola.jpg'
import laysImg from '../assets/lays.jpg'
import oreoImg from '../assets/oreo.jpg'

import aguaImg from '../assets/aguacielo.webp'
import arrozImg from '../assets/arrozcosteno.webp'
import azucarImg from '../assets/azucarrubia.webp'
import casinoImg from '../assets/casino.webp'
import chizitosImg from '../assets/chizitos.jpg'
import doritosImg from '../assets/doritos.jpg'
import gloriaImg from '../assets/lechegloria.webp'
import pringlesImg from '../assets/pringles.png'
import redbullImg from '../assets/redbull.png'
import ritzImg from '../assets/ritz.webp'
import snickersImg from '../assets/snickers.png'
import spriteImg from '../assets/sprite.jpg'
import sublimeImg from '../assets/sublime.png'
import tentacionImg from '../assets/tentacion.webp'
import tridentImg from '../assets/trident.webp'

function Productos(props) {

  const location = useLocation()

const categoriaSeleccionada =
  location.state?.categoria

  const productos = [

    {
  id: 1,
  nombre: 'Coca Cola',
  precio: '4.50',
  imagen: cocaColaImg,
  categoria: 'Bebidas'
},


    {
      id: 2,
      nombre: 'Papas Lays',
      precio: '3.00',
      imagen: laysImg,
      categoria: 'Snacks'
    },

    {
      id: 3,
      nombre: 'Galletas Oreo',
      precio: '2.50',
      imagen: oreoImg,
      categoria: 'Galletas'
    },

    {
      id: 4,
      nombre: 'Agua Cielo',
      precio: '2.00',
      imagen: aguaImg,
      categoria: 'Bebidas'
    },

    {
      id: 5,
      nombre: 'Arroz Costeño',
      precio: '6.50',
      imagen: arrozImg,
      categoria: 'Primera necesidad'
    },

    {
      id: 6,
      nombre: 'Azúcar Rubia',
      precio: '4.20',
      imagen: azucarImg,
      categoria: 'Primera necesidad'
    },

    {
      id: 7,
      nombre: 'Casino',
      precio: '2.00',
      imagen: casinoImg,
      categoria: 'Galletas'
    },

    {
      id: 8,
      nombre: 'Chizitos',
      precio: '3.50',
      imagen: chizitosImg,
      categoria: 'Snacks'
    },

    {
      id: 9,
      nombre: 'Doritos',
      precio: '5.00',
      imagen: doritosImg,
      categoria: 'Snacks'
    },

    {
      id: 10,
      nombre: 'Leche Gloria',
      precio: '5.50',
      imagen: gloriaImg,
      categoria: 'Primera necesidad'
    },

    {
      id: 11,
      nombre: 'Pringles',
      precio: '9.00',
      imagen: pringlesImg,
      categoria: 'Snacks'
    },

    {
      id: 12,
      nombre: 'Red Bull',
      precio: '8.50',
      imagen: redbullImg,
      categoria: 'Bebidas'
    },

    {
      id: 13,
      nombre: 'Ritz',
      precio: '3.50',
      imagen: ritzImg,
      categoria: 'Galletas'
    },

    {
      id: 14,
      nombre: 'Snickers',
      precio: '4.00',
      imagen: snickersImg,
      categoria: 'Dulces'
    },

    {
      id: 15,
      nombre: 'Sprite',
      precio: '4.50',
      imagen: spriteImg,
      categoria: 'Bebidas'
    },

    {
      id: 16,
      nombre: 'Sublime',
      precio: '2.50',
      imagen: sublimeImg,
      categoria: 'Dulces'
    },

    {
      id: 17,
      nombre: 'Tentación',
      precio: '3.00',
      imagen: tentacionImg,
      categoria: 'Galletas'
    },

    {
      id: 18,
      nombre: 'Trident',
      precio: '2.00',
      imagen: tridentImg,
      categoria: 'Dulces'
    }

  ]


  const productosFiltrados =
  categoriaSeleccionada

    ? productos.filter(

        (producto) =>
          producto.categoria ===
          categoriaSeleccionada
      )

    : productos


  return (

    <div>

      <button
        className="back-button"
        onClick={() => window.location.href = '/'}
          >
       ← Volver al Inicio
      </button>

      <section className="page-title">

        <h1>Todos nuestros productos</h1>

        <p>
          Encuentra bebidas, snacks y productos de primera necesidad.
        </p>

      </section>


      <section className="products">

        {
             productosFiltrados.map((producto) => (
            <
              ProductCard
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