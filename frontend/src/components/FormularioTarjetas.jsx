import { useState } from "react"

import {
  agregarOperacionFirebase
} from "../firebase/firebaseService"

function FormularioTarjetas() {

  const [tarjeta, setTarjeta] = useState("")

  const [numero, setNumero] = useState("")

  const [monto, setMonto] = useState("")


  const continuar = async () => {

    if (tarjeta === "") {

      alert("Seleccione una tarjeta")

      return

    }

    if (numero.trim() === "") {

      alert("Ingrese el número de la tarjeta")

      return

    }

    if (monto === "" || Number(monto) <= 0) {

      alert("Seleccione o ingrese un monto válido")

      return

    }


    const nuevaOperacion = {

  id: Date.now(),

  tipoOperacion: "Recarga de Tarjeta",

  servicio: tarjeta,

  numero: numero,

  total: Number(monto),

  fecha: new Date().toLocaleString(),

  estado: "Pendiente"

}

try {


console.log("OPERACIÓN A GUARDAR:", nuevaOperacion);

  await agregarOperacionFirebase(
    nuevaOperacion
  )

console.log("SE GUARDÓ CORRECTAMENTE");

} catch (error) {

  console.error(error)

  alert("Error al registrar la operación.")

  return

}


    alert(
      `Recarga de ${tarjeta} por S/ ${Number(monto).toFixed(2)} registrada correctamente`
    )


    setTarjeta("")

    setNumero("")

    setMonto("")

  }


  return (

    <div className="formulario-servicio">


      <h2>
        💳 Recarga de Tarjetas
      </h2>


      <p className="formulario-descripcion">

        Selecciona el tipo de tarjeta, ingresa
        su número y el monto que deseas recargar.

      </p>


      <h3>
        Seleccione una tarjeta
      </h3>


      <div className="operadores-grid">

        {
          [
            "Metropolitano",
            "Línea 1",
            "Lima Pass",
            "Gift Card"
          ].map((item) => (

            <button

              type="button"

              key={item}

              className={
                `operador-btn ${
                  tarjeta === item
                    ? "activo"
                    : ""
                }`
              }

              onClick={() =>
                setTarjeta(item)
              }

            >

              {item}

            </button>

          ))
        }

      </div>


      {
        tarjeta && (

          <p className="seleccion-actual">

            Tarjeta seleccionada:{" "}

            <strong>
              {tarjeta}
            </strong>

          </p>

        )
      }


      <input

        type="text"

        inputMode="numeric"

        placeholder="Número de la tarjeta"

        value={numero}

        onChange={(e) => {

          const soloNumeros =
            e.target.value.replace(
              /\D/g,
              ""
            )

          setNumero(soloNumeros)

        }}

      />


      <h3>
        Seleccione un monto
      </h3>


      <div className="montos-grid">

        {
          [10, 20, 50, 100].map(
            (valor) => (

              <button

                type="button"

                key={valor}

                className={
                  `monto-btn ${
                    Number(monto) === valor
                      ? "activo"
                      : ""
                  }`
                }

                onClick={() =>
                  setMonto(valor)
                }

              >

                S/ {valor}

              </button>

            )
          )
        }

      </div>


      <input

        type="number"

        min="1"

        placeholder="Monto de la recarga"

        value={monto}

        onChange={(e) =>
          setMonto(e.target.value)
        }

      />


      {
        monto !== "" &&
        Number(monto) > 0 && (

          <p className="seleccion-actual">

            Monto seleccionado:{" "}

            <strong>

              S/ {
                Number(monto).toFixed(2)
              }

            </strong>

          </p>

        )
      }


      <button

        type="button"

        className="continuar-btn"

        onClick={continuar}

      >

        Continuar

      </button>


    </div>

  )

}

export default FormularioTarjetas