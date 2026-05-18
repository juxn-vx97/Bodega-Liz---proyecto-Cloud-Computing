function Servicios() {

  const servicios = [

    {
      id: 1,
      titulo: 'Delivery rápido',
      descripcion: 'Entregamos productos directamente a tu hogar.'
    },

    {
      id: 2,
      titulo: 'Recargas móviles',
      descripcion: 'Realizamos recargas para diferentes operadores.'
    },

    {
      id: 3,
      titulo: 'Pago de servicios',
      descripcion: 'Aceptamos pagos de luz, agua e internet.'
    }

  ]


  return (
    <div>

      <section className="page-title">

        <h1>Nuestros Servicios</h1>

        <p>
          Servicios rápidos y confiables para nuestros clientes.
        </p>

      </section>


      <section className="services-container">

        {
          servicios.map((servicio) => (

            <div className="service-card" key={servicio.id}>

              <h2>{servicio.titulo}</h2>

              <p>{servicio.descripcion}</p>

            </div>

          ))
        }

      </section>

    </div>
  );
}

export default Servicios;