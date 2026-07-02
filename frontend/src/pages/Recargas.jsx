import FormularioMovil from "../components/FormularioMovil"

import FormularioServicios from "../components/FormularioServicios"

import FormularioTarjetas from "../components/FormularioTarjetas"

import { useState } from "react"

function Recargas() {

const [servicioActivo, setServicioActivo] = useState(null)
  
  return (

    <div className="servicios-page">

      <h1>⚡ Servicios de Bodega Liz</h1>

<p className="servicios-subtitulo">

  Realiza recargas, paga servicios y disfruta de nuestros servicios adicionales desde un solo lugar.

</p>

      <div className="servicios-grid">

<div
  className={`servicio-card ${
    servicioActivo === "movil" ? "activo" : ""
  }`}
  onClick={() => setServicioActivo("movil")}
>
          <div className="servicio-icono">
            📱
          </div>

          <h2>Recarga Móvil</h2>

          <p>

            Claro, Movistar, Entel y Bitel.

          </p>

        </div>

<div
  className={`servicio-card ${
    servicioActivo === "servicios" ? "activo" : ""
  }`}
  onClick={() => setServicioActivo("servicios")}
>
          <div className="servicio-icono">
            💡
          </div>

          <h2>Pago de Servicios</h2>

          <p>

            Agua, luz, internet, cable y gas.

          </p>

        </div>

<div
  className={`servicio-card ${
    servicioActivo === "tarjetas" ? "activo" : ""
  }`}
  onClick={() => setServicioActivo("tarjetas")}
>
          <div className="servicio-icono">
            💳
          </div>

          <h2>Recarga de Tarjetas</h2>

          <p>

            Transporte y otros servicios.

          </p>

        </div>

        <div className="servicio-card beneficios-card">

  <div className="servicio-icono">
    ⭐
  </div>

  <h2>¿Por qué elegir Bodega Liz?</h2>

  <ul className="beneficios-lista">

  <li>✅ Entrega rápida a domicilio</li>

  <li>✅ Pagos seguros</li>

  <li>✅ Atención personalizada</li>

  <li>✅ Productos de calidad</li>

</ul>

</div>

      </div>

{
  servicioActivo === "movil" && (
    <FormularioMovil />
  )
}

{
  servicioActivo === "servicios" && (
    <FormularioServicios />
  )
}

{
  servicioActivo === "tarjetas" && (
    <FormularioTarjetas />
  )
}

    </div>



  )

}

export default Recargas