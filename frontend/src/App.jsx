import './App.css'
import { useState } from "react";import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Productos from './pages/Productos'
import Servicios from './pages/Servicios'
import Contacto from './pages/Contacto'
import Carrito from './pages/Carrito'
import Admin from './pages/Admin'
import FinalizarCompra from './pages/FinalizarCompra'
import Recargas from "./pages/Recargas"

function App() {

const [carrito, setCarrito] = useState([]);

  return (

    <div>

      <Navbar carrito={carrito} />

      <Routes>

<Route
  path="/"
  element={
    <Home
      carrito={carrito}
      setCarrito={setCarrito}
    />
  }
/>
        <Route
          path="/productos"
          element={
            <Productos
              carrito={carrito}
              setCarrito={setCarrito}
            />
          }
        />

<Route
  path="/servicios"
  element={<Recargas />}
/>
        <Route path="/contacto" element={<Contacto />} />
        

        <Route
          path="/administrador"
         element={<Admin />}
/>

        <Route
          path="/carrito"
          element={

            
            
  <Carrito
    carrito={carrito}
    setCarrito={setCarrito}
  />

}
        />

  <Route
  path="/finalizar-compra"
  element={
  
  <FinalizarCompra
      carrito={carrito}
      setCarrito={setCarrito}
    />
  }
  
/>


{/*

<Route
  path="/servicios-digitales"
  element={<Recargas />}

*/

}

  <Route
  path="/servicios-digitales"
  element={<Recargas />}
  />

      </Routes>

    </div>
  );
}

export default App;