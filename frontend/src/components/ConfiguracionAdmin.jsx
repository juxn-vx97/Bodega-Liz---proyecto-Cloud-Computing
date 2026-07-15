import { useState } from "react"

function ConfiguracionAdmin() {

  const configuracionGuardada =
    JSON.parse(
      localStorage.getItem("configuracionTienda")
    ) || {

      nombre: "Bodega Liz",

      horario: "08:00 - 21:00",

      costoDelivery: 5,

      telefono: "987654321"

    }

  const [configuracion, setConfiguracion] =
    useState(configuracionGuardada)

  const actualizarCampo = (e) => {

    const { name, value } = e.target

    setConfiguracion({

      ...configuracion,

      [name]: value

    })

  }

  const guardarConfiguracion = () => {

    localStorage.setItem(

      "configuracionTienda",

      JSON.stringify(configuracion)

    )

    alert("Configuración guardada correctamente")

  }

  return (

    <div>

      <h2 className="inventory-title">
        ⚙️ Configuración de la Tienda
      </h2>

      <div className="product-form">

        <input
          type="text"
          name="nombre"
          placeholder="Nombre de la tienda"
          value={configuracion.nombre}
          onChange={actualizarCampo}
        />

        <input
          type="text"
          name="horario"
          placeholder="Horario de atención"
          value={configuracion.horario}
          onChange={actualizarCampo}
        />

        <input
          type="number"
          name="costoDelivery"
          placeholder="Costo del delivery"
          value={configuracion.costoDelivery}
          onChange={actualizarCampo}
        />

        <input
          type="text"
          name="telefono"
          placeholder="Teléfono de contacto"
          value={configuracion.telefono}
          onChange={actualizarCampo}
        />

        <button
          className="add-btn"
          onClick={guardarConfiguracion}
        >
          💾 Guardar Configuración
        </button>

      </div>

    </div>

  )

}

export default ConfiguracionAdmin