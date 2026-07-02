import { useState } from "react"

function FormularioTarjetas() {

    const [tarjeta, setTarjeta] = useState("")

    const [numero, setNumero] = useState("")

    const [monto, setMonto] = useState("")

    const continuar = () => {

        if (tarjeta === "") {

            alert("Seleccione una tarjeta")

            return

        }

        if (numero === "") {

            alert("Ingrese el número de la tarjeta")

            return

        }

        if (monto === "") {

            alert("Seleccione un monto")

            return

        }

        alert("Mañana conectaremos este formulario con Firebase 🚀")

    }

    return (

        <div className="formulario-servicio">

            <h2>💳 Recarga de Tarjetas</h2>

            <p className="formulario-descripcion">

                Seleccione la tarjeta que desea recargar.

            </p>

            <h3>Tipo de tarjeta</h3>

            <div className="operadores-grid">

                {

                    [

                        "Metropolitano",

                        "Línea 1",

                        "Lima Pass",

                        "Gift Card"

                    ].map((item)=>(

                        <button

                            key={item}

                            className={`operador-btn ${tarjeta===item ? "activo" : ""}`}

                            onClick={()=>setTarjeta(item)}

                        >

                            {item}

                        </button>

                    ))

                }

            </div>

            <input

                type="text"

                placeholder="Número de la tarjeta"

                value={numero}

                onChange={(e)=>setNumero(e.target.value)}

            />

            <h3>Seleccione un monto</h3>

            <div className="montos-grid">

                {

                    [10,20,50,100].map((valor)=>(

                        <button

                            key={valor}

                            className={`monto-btn ${monto===valor ? "activo" : ""}`}

                            onClick={()=>setMonto(valor)}

                        >

                            S/ {valor}

                        </button>

                    ))

                }

            </div>

            <input

                type="number"

                placeholder="Otro monto"

                onChange={(e)=>setMonto(Number(e.target.value))}

            />

            <button

                className="continuar-btn"

                onClick={continuar}

            >

                Continuar

            </button>

        </div>

    )

}

export default FormularioTarjetas