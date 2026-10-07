// src/components/Nav.jsx — ПАНЕЛЬ НАВИГАЦИИ.
// Компонент "глупый": ничего не хранит, только показывает то, что ему передали в props.

import { Link } from "react-router-dom"; // Link — ссылка, которая меняет страницу БЕЗ перезагрузки браузера

// Деструктуризация props: currentUser — пользователь или null, onLogout — функция выхода
export default function Nav({ currentUser, onLogout }) {
  return (
    <nav>
      {currentUser ? ( // тернарный оператор: если пользователь вошёл — один вид меню, иначе другой
        <>
          {/* ссылка на таблицу */}
          <Link to="/">Аптека</Link>
          {/* текстовый разделитель */}
          {" | "}
          {/* выводим имя из объекта Account */}
          Здравствуйте, {currentUser.name}{" "}
          {/* по клику вызываем handleLogout из App */}
          <button type="button" onClick={onLogout}>
            Выйти
          </button>
        </>
      ) : (
        <>
          {/* ссылка на авторизацию */}
          <Link to="/login">Войти</Link>
          {" | "}
          {/* ссылка на регистрацию */}
          <Link to="/register">Регистрация</Link>
        </>
      )}
    </nav>
  );
}
