import { useState } from "react"

function FormularioMovil() {

    const [operador, setOperador] = useState("")

    const [numero, setNumero] = useState("")

    const [monto, setMonto] = useState("")

    const continuar = () => {

        if (operador === "") {

            alert("Seleccione un operador")

            return

        }

        if (numero.length !== 9) {

            alert("Ingrese un número de celular válido")

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

<>
        <h2>📱 Recarga Móvil</h2>

        <p className="formulario-descripcion">
             Selecciona el operador, ingresa el número y el monto que deseas recargar.
        </p>
            </>
            <h3>Seleccione un operador</h3>

<div className="operadores-grid">

    {["Claro","Movistar","Entel","Bitel"].map((item)=>(

        <button

            key={item}

            className={`operador-btn ${operador===item ? "activo" : ""}`}

            onClick={()=>setOperador(item)}

        >

            {item}

        </button>

    ))}

</div>

            <input

                type="text"

                placeholder="Número de celular"

                maxLength={9}

                value={numero}

                onChange={(e)=>setNumero(e.target.value)}

            />

            <h3>Monto</h3>

            <div className="montos-grid">

                {[5,10,20,30].map((valor)=>(

                    <button

                        key={valor}

                        className={monto===valor ? "activo" : ""}

                        onClick={()=>setMonto(valor)}

                    >

                        S/ {valor}

                    </button>

                ))}

            </div>

            <h3>Seleccione un monto</h3>

<input

    type="number"

    placeholder="Otro monto (opcional)"

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

export default FormularioMovil