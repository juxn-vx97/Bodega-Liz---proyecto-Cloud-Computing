import { useState } from "react"

import {
  agregarOperacionFirebase
} from "../firebase/firebaseService"

function FormularioMovil() {

  const [operador, setOperador] = useState("")

  const [numero, setNumero] = useState("")

  const [monto, setMonto] = useState("")


  const continuar = async () => {
    
    if (operador === "") {

      alert("Seleccione un operador")

      return

    }

    if (numero.length !== 9) {

      alert("Ingrese un número de celular válido")

      return

    }

    if (monto === "" || Number(monto) <= 0) {

      alert("Seleccione o ingrese un monto válido")

      return

    }


 const nuevaOperacion = {

  id: Date.now(),

  tipoOperacion: "Recarga Móvil",

  servicio: operador,

  numero: numero,

  total: Number(monto),

  fecha: new Date().toLocaleString(),

  estado: "Pendiente"

}

try {

  await agregarOperacionFirebase(

    nuevaOperacion

  )

} catch (error) {

  console.error(error)

  alert("Error al registrar la operación.")

  return

}

    alert(
      `Recarga de S/ ${Number(monto).toFixed(2)} para ${numero} registrada correctamente`
    )


    setOperador("")

    setNumero("")

    setMonto("")

  }


  return (

    <div className="formulario-servicio">


      <h2>
        📱 Recarga Móvil
      </h2>


      <p className="formulario-descripcion">

        Selecciona el operador, ingresa el número
        y el monto que deseas recargar.

      </p>


      <h3>
        Seleccione un operador
      </h3>


      <div className="operadores-grid">

        {
          [
            "Claro",
            "Movistar",
            "Entel",
            "Bitel"
          ].map((item) => (

            <button

              type="button"

              key={item}

              className={
                `operador-btn ${
                  operador === item
                    ? "activo"
                    : ""
                }`
              }

              onClick={() =>
                setOperador(item)
              }

            >

              {item}

            </button>

          ))
        }

      </div>


      {
        operador && (

          <p className="seleccion-actual">

            Operador seleccionado:{" "}

            <strong>
              {operador}
            </strong>

          </p>

        )
      }


      <input

        type="text"

        inputMode="numeric"

        placeholder="Número de celular"

        maxLength={9}

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
          [5, 10, 20, 30].map(
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

export default FormularioMovil

