// src/components/Nav.tsx
// ---------------------------------------------------------
// Навигация вверху страницы. Помимо ссылок между страницами
// показывает, авторизован ли пользователь: имя + кнопка
// "Выйти" либо ссылка на страницу входа.
// currentUser передаётся сюда из App.tsx — сам Nav ничего
// не знает про то, откуда взялся пользователь.
// ---------------------------------------------------------

import { Link } from 'react-router-dom'
import type Account from '../models/Account'

interface NavProps {
  currentUser: Account | null
  onLogout: () => void
}

export default function Nav({ currentUser, onLogout }: NavProps) {
  return (
    <nav>
      <Link to="/">Аптека</Link>
      {' | '}
      <Link to="/register">Регистрация</Link>
      {' | '}
      {currentUser ? (
        <>
          Здравствуйте, {currentUser.name}{' '}
          <button type="button" onClick={onLogout}>
            Выйти
          </button>
        </>
      ) : (
        <Link to="/login">Войти</Link>
      )}
    </nav>
  )
}
