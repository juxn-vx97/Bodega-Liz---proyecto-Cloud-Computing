import {
  collection,
  getDocs,
  addDoc
} from "firebase/firestore"

import db from "./firestore"


const productosIniciales = [

  {
    nombre: "Coca Cola",
    precio: 4.50,
    stock: 20,
    estado: "Disponible"
  },

  {
    nombre: "Papas Lays",
    precio: 3.00,
    stock: 15,
    estado: "Disponible"
  },

  {
    nombre: "Galletas Oreo",
    precio: 2.50,
    stock: 10,
    estado: "Disponible"
  },

  {
    nombre: "Agua Cielo",
    precio: 2.00,
    stock: 25,
    estado: "Disponible"
  },

  {
    nombre: "Arroz Costeño",
    precio: 6.50,
    stock: 12,
    estado: "Disponible"
  },

  {
    nombre: "Azúcar Rubia",
    precio: 4.20,
    stock: 8,
    estado: "Disponible"
  },

  {
    nombre: "Casino",
    precio: 2.00,
    stock: 20,
    estado: "Disponible"
  },

  {
    nombre: "Chizitos",
    precio: 3.50,
    stock: 18,
    estado: "Disponible"
  },

  {
    nombre: "Doritos",
    precio: 5.00,
    stock: 0,
    estado: "Agotado"
  },

  {
    nombre: "Leche Gloria",
    precio: 5.50,
    stock: 14,
    estado: "Disponible"
  },

  {
    nombre: "Pringles",
    precio: 9.00,
    stock: 5,
    estado: "Disponible"
  },

  {
    nombre: "Red Bull",
    precio: 8.50,
    stock: 0,
    estado: "Agotado"
  },

  {
    nombre: "Ritz",
    precio: 3.50,
    stock: 9,
    estado: "Disponible"
  },

  {
    nombre: "Snickers",
    precio: 4.00,
    stock: 16,
    estado: "Disponible"
  },

  {
    nombre: "Sprite",
    precio: 4.50,
    stock: 11,
    estado: "Disponible"
  },

  {
    nombre: "Sublime",
    precio: 2.50,
    stock: 22,
    estado: "Disponible"
  },

  {
    nombre: "Tentación",
    precio: 3.00,
    stock: 13,
    estado: "Disponible"
  },

  {
    nombre: "Trident",
    precio: 2.00,
    stock: 30,
    estado: "Disponible"
  }

]


export const migrarProductosAFirebase =
  async () => {

    try {

      const consulta =
        await getDocs(
          collection(db, "productos")
        )


      const nombresExistentes =
        consulta.docs.map(

          (documento) =>
            documento
              .data()
              .nombre
              ?.trim()
              .toLowerCase()

        )


      let productosAgregados = 0

      let productosOmitidos = 0


      for (
        const producto
        of productosIniciales
      ) {

        const nombreNormalizado =
          producto.nombre
            .trim()
            .toLowerCase()


        if (
          nombresExistentes.includes(
            nombreNormalizado
          )
        ) {

          console.log(
            `Producto omitido: ${producto.nombre}`
          )

          productosOmitidos++

          continue

        }


        await addDoc(

          collection(
            db,
            "productos"
          ),

          producto

        )


        console.log(
          `Producto agregado: ${producto.nombre}`
        )


        productosAgregados++

      }


      return {

        productosAgregados,

        productosOmitidos

      }

    }

    catch (error) {

      console.error(
        "Error al migrar productos:",
        error
      )

      throw error

    }

  }