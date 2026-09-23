// src/App.tsx
// ---------------------------------------------------------
// Корень приложения: навигация + маршруты.
// "/"          — таблица лекарств (HomePage)
// "/register"  — страница регистрации (RegisterPage)
// "/login"     — страница авторизации (LoginPage)
//
// Информация об авторизовавшемся пользователе хранится прямо
// здесь, в state корневого компонента (currentUser), и передаётся
// вниз в Nav и LoginPage через пропсы.
// ---------------------------------------------------------

import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import HomePage from './pages/HomePage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import type Account from './models/Account'

function App() {
  const [currentUser, setCurrentUser] = useState<Account | null>(null)

  // Вызывается из LoginPage после успешной проверки логина/пароля
  const handleLogin = (account: Account) => {
    setCurrentUser(account)
  }

  const handleLogout = () => {
    setCurrentUser(null)
  }

  return (
    <>
      <Nav currentUser={currentUser} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
      </Routes>
    </>
  )
}

export default App
