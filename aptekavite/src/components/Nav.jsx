// src/components/Nav.jsx — ПАНЕЛЬ НАВИГАЦИИ.
// Компонент "глупый": ничего не хранит, только показывает то, что ему передали в props.

import { Link } from "react-router-dom"; // Link — ссылка, которая меняет страницу БЕЗ перезагрузки браузера

// Деструктуризация props: currentUser — пользователь или null, onLogout — функция выхода
export default function Nav({ currentUser, onLogout }) {
  return (
    <nav className="nav">
      {currentUser ? ( // тернарный оператор: если пользователь вошёл — один вид меню, иначе другой
        <>
          {/* ссылка на таблицу */}
          <Link to="/" className="nav-brand">
            💊 Аптека
          </Link>
          {/* справа: имя пользователя и кнопка выхода */}
          <span className="nav-user">Здравствуйте, {currentUser.name}</span>
          {/* по клику вызываем handleLogout из App */}
          <button type="button" className="btn btn-outline" onClick={onLogout}>
            Выйти
          </button>
        </>
      ) : (
        <>
          <span className="nav-brand">💊 Аптека</span>
          <span className="nav-spacer" />
          {/* ссылки для гостя */}
          <Link to="/login">Войти</Link>
          <Link to="/register">Регистрация</Link>
        </>
      )}
    </nav>
  );
}
