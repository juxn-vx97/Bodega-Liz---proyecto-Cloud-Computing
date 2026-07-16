import { useState, useEffect } from 'react'
import { agregarPedidoFirebase } from "../firebase/firebaseService"

function FinalizarCompra(props) {

const [nombre, setNombre] = useState('')

const [dni, setDni] = useState('')

const [telefono, setTelefono] = useState('')

const [direccion, setDireccion] = useState('')

const [referencia, setReferencia] = useState('')

const [tipoEntrega, setTipoEntrega] = useState('Delivery')

const [metodoPago, setMetodoPago] = useState('Yape')

const [pedidoConfirmado, setPedidoConfirmado] = useState(false)

const [totalPedido, setTotalPedido] = useState(0)

const total = props.carrito.reduce((acumulador, producto) => {

  return acumulador +
    (Number(producto.precio) * producto.cantidad)

}, 0)

const confirmarPedido = async () => {

  if (
    nombre === '' ||
    dni === '' ||
    telefono === '' ||
    direccion === ''
  ) {

    alert('Complete todos los campos obligatorios.')

    return

  }

  const pedido = {

  id: "PED-" + Date.now(),

  cliente: nombre,

  dni: dni,

  telefono: telefono,

  direccion: direccion,

  referencia: referencia,

  metodoPago: metodoPago,

  tipoEntrega: tipoEntrega,

  productos: props.carrito,

  subtotal: Number((total / 1.18).toFixed(2)),

  igv: Number((total - (total / 1.18)).toFixed(2)),

  delivery: tipoEntrega === "Delivery" ? 5 : 0,

  total: tipoEntrega === "Delivery"
    ? total + 5
    : total,

  estado: "Pendiente",

  fecha: new Date().toLocaleString()

}

const pedidosGuardados = JSON.parse(

  localStorage.getItem("pedidos")

) || []

pedidosGuardados.push(pedido)

localStorage.setItem(

  "pedidos",

  JSON.stringify(pedidosGuardados)

)

try {

  await agregarPedidoFirebase(pedido)

  console.log("Pedido guardado en Firestore.")

} catch (error) {

  console.error(
    "Error al guardar el pedido:",
    error
  )

}

  setTotalPedido(

tipoEntrega === "Delivery"

? total + 5

: total

)

  // Mostrar la confirmación
  setPedidoConfirmado(true)

  // Vaciar el carrito
  props.setCarrito([])

}

useEffect(() => {

  if (total < 15) {

    setTipoEntrega('Recoger en tienda')

  }

}, [total])


if (pedidoConfirmado) {

return(

<div className="success-container">

<div className="success-icon">✅</div>

  <h1>Pedido registrado correctamente</h1>

  <p className="success-message">

    ¡Gracias por comprar en <strong>Bodega Liz</strong>! 
    Su pedido fue registrado exitosamente y será procesado en los próximos minutos.
  </p>

  <div className="success-details">

    <div className="detail-row">
      <span>👤 Cliente</span>
      <strong>{nombre}</strong>
    </div>

    <div className="detail-row">
      <span>💳 Método de pago</span>
      <strong>{metodoPago}</strong>
    </div>

    <div className="detail-row">
      <span>🚚 Tipo de entrega</span>
      <strong>{tipoEntrega}</strong>
    </div>

    <div className="detail-row">
      <span>💰 Total a pagar</span>

     <strong>

S/ {totalPedido.toFixed(2)}

</strong>
    </div>
  </div>

  <button
  className="confirm-btn"
  onClick={() => {

    props.setCarrito([])

    window.location.href = '/'

  }}
>
  Volver al Inicio
</button>
</div>

)

}

return (

<div className="checkout-container">

<div className="checkout-left">

<h1>

Finalizar Compra

</h1>

<p>

Complete sus datos para registrar el pedido.

</p>

<h2>

👤 Información Personal

</h2>

<input

type="text"

placeholder="Nombre completo"

value={nombre}

onChange={(e)=>setNombre(e.target.value)}

/>

<input

type="text"

placeholder="DNI"

value={dni}

onChange={(e)=>setDni(e.target.value)}

/>

<input

type="text"

placeholder="Número de celular"

value={telefono}

onChange={(e)=>setTelefono(e.target.value)}

/>

<h2>

📍 Dirección

</h2>

<input

type="text"

placeholder="Dirección"

value={direccion}

onChange={(e)=>setDireccion(e.target.value)}

/>

<textarea

placeholder="Referencia"

value={referencia}

onChange={(e)=>setReferencia(e.target.value)}

/>

<h2>

🚚 Método de Entrega

</h2>

<div className="delivery-options">

<label>

<input

type="radio"

value="Delivery"

disabled={total < 15}

checked={tipoEntrega === 'Delivery'}

onChange={(e)=>

setTipoEntrega(e.target.value)

}

/>

Delivery

{total < 15 && (

<span className="delivery-warning">

(Disponible desde S/ 15.00)

</span>

)}

</label>

<label>

<input

type="radio"

value="Recoger en tienda"

checked={

tipoEntrega === 'Recoger en tienda'

}

onChange={(e)=>

setTipoEntrega(e.target.value)

}

/>

Recoger en tienda

</label>

</div>

{total < 15 ? (

<div className="delivery-alert">

<p>

⚠ El servicio de Delivery está disponible para compras desde <strong>S/ 15.00</strong>.

</p>

</div>

) : (

<div className="delivery-info">

{

tipoEntrega === 'Delivery'

?

<>

<p>

🚚 Costo de envío:

<strong> S/ 5.00</strong>

</p>

<p>

⏱ Tiempo estimado:

<strong>30 - 45 minutos</strong>

</p>

<p className="delivery-note">

ℹ️ El servicio de delivery está disponible únicamente dentro del área de cobertura de la Bodega Liz.

</p>

</>


:

<>

<p>

🏪 Recojo en tienda:

<strong> Gratis</strong>

</p>

<p>

⏱ Tiempo estimado:

<strong>15 minutos</strong>

</p>

<p className="delivery-note">

ℹ️ Puede acercarse a la tienda mostrando la confirmación de su pedido para realizar el recojo.

</p>

</>

}

</div>

)}

<h2>

💳 Método de Pago

</h2>

<div className="payment-options">

<label>

<input

type="radio"

value="Yape"

checked={metodoPago === 'Yape'}

onChange={(e)=>setMetodoPago(e.target.value)}

/>

Yape

</label>

<label>

<input

type="radio"

value="Plin"

checked={metodoPago === 'Plin'}

onChange={(e)=>setMetodoPago(e.target.value)}

/>

Plin

</label>

<label>

<input

type="radio"

value="Tarjeta"

checked={metodoPago === 'Tarjeta'}

onChange={(e)=>setMetodoPago(e.target.value)}

/>

Tarjeta

</label>

<label>

<input

type="radio"

value="Efectivo"

checked={metodoPago === 'Efectivo'}

onChange={(e)=>setMetodoPago(e.target.value)}

/>

Efectivo

</label>

</div>

</div>

<div className="checkout-right">

<h2>🛒 Resumen del Pedido</h2>

<hr />

{
props.carrito.map((producto,index)=>(

<div
key={index}
className="checkout-product"
>

<div>

<strong>{producto.nombre}</strong>

<br/>

Cantidad: {producto.cantidad}

</div>

<div>

S/ {(producto.precio * producto.cantidad).toFixed(2)}

</div>

</div>

))
}

<hr />

<p>

Subtotal

<span>

S/ {(total/1.18).toFixed(2)}

</span>

</p>

<p>

IGV (18%)

<span>

S/ {(total-(total/1.18)).toFixed(2)}

</span>

</p>

<p>

Delivery

<span>

{

tipoEntrega==="Delivery"

?

"S/ 5.00"

:

"Gratis"

}

</span>

</p>

<hr />

<h2>

Total

<span>

S/ {

(tipoEntrega==="Delivery"

?

total+5

:

total

).toFixed(2)

}

</span>

</h2>

<button

className="confirm-btn"

onClick={confirmarPedido}

>

Confirmar Pedido

</button>

</div>

</div>

)

}

export default FinalizarCompra