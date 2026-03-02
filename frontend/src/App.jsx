
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import Registro from './pages/Registro'
import PublicLayout from './layouts/PublicLayout'
import PrivateLayout from './layouts/PrivateLayout'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'
import Empresas from './pages/Empresas'
import Trabajadores from './pages/Trabajadores'
import Incidencias from './pages/Incidencias'
import NotFound from './pages/NotFound'
import EmpresaForm from './pages/EmpresaForm'

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
          <Route path="app" element={<PrivateLayout />}>
            <Route index element={<Dashboard />} />  {/* Ruta por defecto para /app es el Dashboard*/}
            <Route path="empresas" element={<Empresas />} />
            <Route path="empresas/nueva" element={<EmpresaForm />} />
            <Route path="empresas/:id/editar" element={<EmpresaForm />} />
            <Route path="trabajadores" element={<Trabajadores />} />
            <Route path="trabajadores/:id" element={<Trabajadores />} />
            <Route path="trabajadores/nuevo" element={<Trabajadores />} />
            <Route path="trabajadores/:id/editar" element={<Trabajadores />} />
            <Route path="incidencias" element={<Incidencias />} />
          </Route>
        </Route>

        {/* 404 */}
          <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
