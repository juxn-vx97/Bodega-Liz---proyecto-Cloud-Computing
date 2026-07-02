import { useState } from "react"

function FormularioServicios() {

    const [servicio, setServicio] = useState("")

    const [codigo, setCodigo] = useState("")

    const [monto, setMonto] = useState("")

    const continuar = () => {

        if(servicio===""){

            alert("Seleccione un servicio")

            return

        }

        if(codigo===""){

            alert("Ingrese el código del suministro")

            return

        }

        if(monto===""){

            alert("Seleccione un monto")

            return

        }

        alert("Mañana conectaremos este formulario con Firebase 🚀")

    }

    return(

        <div className="formulario-servicio">

            <h2>💡 Pago de Servicios</h2>

            <p className="formulario-descripcion">

                Seleccione el servicio que desea pagar.

            </p>

            <h3>Servicio</h3>

            <div className="operadores-grid">

                {

                    ["Luz","Agua","Internet","Cable","Gas"].map((item)=>(

                        <button

                            key={item}

                            className={`operador-btn ${servicio===item ? "activo" : ""}`}

                            onClick={()=>setServicio(item)}

                        >

                            {item}

                        </button>

                    ))

                }

            </div>

            <input

                type="text"

                placeholder="Código del suministro"

                value={codigo}

                onChange={(e)=>setCodigo(e.target.value)}

            />

            <h3>Seleccione un monto</h3>

            <div className="montos-grid">

                {

                    [20,50,100].map((valor)=>(

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

export default FormularioServicios