import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc
} from "firebase/firestore"

import db from "./firestore"


// ==========================================
// PRODUCTOS
// ==========================================

export const obtenerProductos = async () => {

  const consulta = await getDocs(
    collection(db, "productos")
  )

  return consulta.docs.map(
    (documento) => ({

      id: documento.id,

      ...documento.data()

    })
  )

}


// ==========================================
// AGREGAR PRODUCTO
// ==========================================

export const agregarProductoFirebase =
  async (producto) => {

    const referencia = await addDoc(

      collection(db, "productos"),

      producto

    )

    return referencia.id

  }


// ==========================================
// ACTUALIZAR PRODUCTO
// ==========================================

export const actualizarProductoFirebase =
  async (id, producto) => {

    if (!id) {

      throw new Error(
        "No se recibió el ID del producto."
      )

    }

    const referencia = doc(
      db,
      "productos",
      id
    )

    await updateDoc(
      referencia,
      producto
    )

  }


// ==========================================
// ELIMINAR PRODUCTO
// ==========================================

export const eliminarProductoFirebase =
  async (id) => {

    if (!id) {

      throw new Error(
        "No se recibió el ID del producto."
      )

    }

    const referencia = doc(
      db,
      "productos",
      id
    )

    await deleteDoc(referencia)

  }


// ==========================================
// PEDIDOS Y OPERACIONES
// ==========================================

export const obtenerPedidos = async () => {

  const consulta = await getDocs(
    collection(db, "pedidos")
  )

  return consulta.docs.map(
    (documento) => ({

      firebaseId: documento.id,

      ...documento.data()

    })
  )

}


// ==========================================
// AGREGAR PEDIDO U OPERACIÓN
// ==========================================

export const agregarPedidoFirebase =
  async (pedido) => {

    const referencia = await addDoc(

      collection(db, "pedidos"),

      pedido

    )

    return referencia.id

  }


// ==========================================
// ACTUALIZAR PEDIDO U OPERACIÓN
// ==========================================

export const actualizarPedidoFirebase =
  async (firebaseId, datos) => {

    if (!firebaseId) {

      throw new Error(
        "No se recibió el ID de Firebase del pedido."
      )

    }

    const referencia = doc(
      db,
      "pedidos",
      firebaseId
    )

    await updateDoc(
      referencia,
      datos
    )

  }