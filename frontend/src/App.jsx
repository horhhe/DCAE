import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Calculator from './pages/Calculator'
import History from './pages/History'

function App() {
  const token = localStorage.getItem('token')
  const auth = !!token

  return (
    <BrowserRouter>
      <nav className="p-4 bg-gray-100 flex gap-4">
        {auth ? (
          <>
            <Link to="/calculator">Calculator</Link>
            <Link to="/history">History</Link>
            <button className="ml-auto" onClick={() => { localStorage.removeItem('token'); window.location.reload(); }}>
              Выйти
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Sign in</Link>
            <Link to="/register">Sign up</Link>
          </>
        )}
      </nav>
      <Routes>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/calculator" element={ auth ? <Calculator/> : <Navigate to="/login"/> }/>
        <Route path="/history" element={ auth ? <History/> : <Navigate to="/login"/> }/>
        <Route path="*" element={<Navigate to={ auth ? "/calculator" : "/login" }/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
