
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import Registro from './pages/Registro'
import PublicLayout from './layouts/PublicLayout'
import PrivateLayout from './layouts/PrivateLayout'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'


function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
        </Route>
        {/* Rutas privadas protegidas*/}
       <Route element = {<ProtectedRoute />} >  
          <Route path="app/" element={<PrivateLayout />}>
            <Route index element={<Dashboard />} />  {/* Ruta por defecto para /app es el Dashboard*/}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
