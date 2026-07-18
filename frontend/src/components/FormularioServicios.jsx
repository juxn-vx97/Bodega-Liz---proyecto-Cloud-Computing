import { useState } from "react"

import {
  agregarOperacionFirebase
} from "../firebase/firebaseService"

function FormularioServicios() {

  const [servicio, setServicio] = useState("")

  const [codigo, setCodigo] = useState("")

  const [monto, setMonto] = useState("")


  const continuar = async () => {

    if (servicio === "") {

      alert("Seleccione un servicio")

      return

    }

    if (codigo.trim() === "") {

      alert("Ingrese el código del suministro")

      return

    }

    if (monto === "" || Number(monto) <= 0) {

      alert("Seleccione o ingrese un monto válido")

      return

    }


    const nuevaOperacion = {

  id: Date.now(),

  tipoOperacion: "Pago de Servicios",

  servicio: servicio,

  codigo: codigo,

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
      `Pago de ${servicio} por S/ ${Number(monto).toFixed(2)} registrado correctamente`
    )


    setServicio("")

    setCodigo("")

    setMonto("")

  }


  return (

    <div className="formulario-servicio">


      <h2>
        💡 Pago de Servicios
      </h2>


      <p className="formulario-descripcion">

        Selecciona el servicio, ingresa el código
        de suministro y el monto que deseas pagar.

      </p>


      <h3>
        Seleccione un servicio
      </h3>


      <div className="operadores-grid">

        {
          [
            "Luz",
            "Agua",
            "Internet",
            "Cable",
            "Gas"
          ].map((item) => (

            <button

              type="button"

              key={item}

              className={
                `operador-btn ${
                  servicio === item
                    ? "activo"
                    : ""
                }`
              }

              onClick={() =>
                setServicio(item)
              }

            >

              {item}

            </button>

          ))
        }

      </div>


      {
        servicio && (

          <p className="seleccion-actual">

            Servicio seleccionado:{" "}

            <strong>
              {servicio}
            </strong>

          </p>

        )
      }


      <input

        type="text"

        placeholder="Código del suministro"

        value={codigo}

        onChange={(e) =>
          setCodigo(e.target.value)
        }

      />


      <h3>
        Seleccione un monto
      </h3>


      <div className="montos-grid">

        {
          [20, 50, 100].map(
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

        placeholder="Monto del pago"

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

export default FormularioServicios