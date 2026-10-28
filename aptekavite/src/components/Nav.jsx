// src/components/Nav.jsx — ПАНЕЛЬ НАВИГАЦИИ.
// Компонент "глупый": ничего не хранит, только показывает то, что ему передали в props.

import { Link, NavLink } from "react-router-dom"; // NavLink — как Link, но сам добавляет класс "active" на ссылке текущей страницы

// Деструктуризация props: currentUser — пользователь или null, onLogout — функция выхода
export default function Nav({ currentUser, onLogout }) {
  return (
    <nav className="nav">
      {currentUser ? ( // тернарный оператор: если пользователь вошёл — один вид меню, иначе другой
        <>
          {/* название — ссылка на главную */}
          <Link to="/" className="nav-brand">
            💊 Аптека
          </Link>
          {/* end — чтобы "/" подсвечивался только на главной, а не на всех страницах */}
          <NavLink to="/" end>
            Лекарства
          </NavLink>
          <NavLink to="/suppliers">Поставщики</NavLink>
          {/* пустой блок раздвигает меню: слева ссылки, справа пользователь */}
          <span className="nav-spacer" />
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
