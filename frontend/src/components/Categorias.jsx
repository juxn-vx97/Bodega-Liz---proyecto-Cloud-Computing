function Categorias() {

  const categorias = [

    {
      nombre: 'Bebidas',
      icono: '🥤'
    },

    {
      nombre: 'Snacks',
      icono: '🍟'
    },

    {
      nombre: 'Galletas',
      icono: '🍪'
    },

    {
      nombre: 'Limpieza',
      icono: '🧼'
    },

    {
      nombre: 'Abarrotes',
      icono: '🛒'
    },

    {
      nombre: 'Delivery',
      icono: '🚚'
    }

  ]


  return (

    <section className="categories">

      {
        categorias.map((categoria, index) => (

          <div className="category-card" key={index}>

            <div className="category-icon">

              {categoria.icono}

            </div>

            <h3>{categoria.nombre}</h3>

          </div>

        ))
      }

    </section>

  );
}

export default Categorias;