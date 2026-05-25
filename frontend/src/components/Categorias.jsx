import { useNavigate } from 'react-router-dom'

function Categorias() {

  const navigate = useNavigate()

  const categorias = [

    {
      icono: '🥤',
      nombre: 'Bebidas'
    },

    {
      icono: '🍟',
      nombre: 'Snacks'
    },

    {
      icono: '🍪',
      nombre: 'Galletas'
    },

    {
      icono: '🥛',
      nombre: 'Primera necesidad'
    },

    {
      icono: '🍫',
      nombre: 'Dulces'
    }

  ]


  function irCategoria(nombreCategoria) {

    navigate('/productos', {

      state: {

        categoria: nombreCategoria

      }

    })

  }


  return (

    <section className="categories">

      {
        categorias.map((categoria, index) => (

          <div
            className="category-card"
            key={index}

            onClick={() =>
              irCategoria(categoria.nombre)
            }
          >

            <span>
              {categoria.icono}
            </span>

            <h3>
              {categoria.nombre}
            </h3>

          </div>

        ))
      }

    </section>

  );
}

export default Categorias;