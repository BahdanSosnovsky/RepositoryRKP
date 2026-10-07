// src/App.jsx — КОРНЕВОЙ КОМПОНЕНТ.
// Задачи: 1) хранить в state авторизованного пользователя (требование лабораторной);
//         2) описать маршруты (какая страница на каком адресе);
//         3) показывать навигацию на всех страницах.

import { useState } from "react"; // хук useState — хранение данных внутри компонента
import { Routes, Route, Navigate } from "react-router-dom"; // Routes/Route — список маршрутов, Navigate — перенаправление
import Nav from "./components/Nav"; // панель навигации
import HomePage from "./pages/HomePage"; // страница с таблицей лекарств
import RegisterPage from "./pages/RegisterPage"; // страница регистрации
import LoginPage from "./pages/LoginPage"; // страница авторизации

function App() {
  // currentUser — текущий пользователь; null = никто не вошёл, иначе объект Account.
  // setCurrentUser — функция, которой state меняется (после неё React перерисует компонент).
  const [currentUser, setCurrentUser] = useState(null);

  // Эту функцию передаём в LoginPage: она вызывается при успешном входе
  const handleLogin = (account) => setCurrentUser(account); // запоминаем вошедшего пользователя

  // Эту функцию передаём в Nav: вызывается по кнопке "Выйти"
  const handleLogout = () => setCurrentUser(null); // сбрасываем пользователя

  return (
    <>
      {/* Nav показывается на каждой странице, т.к. стоит ВНЕ <Routes>.
          Вниз передаём данные (currentUser) и функцию (onLogout) через props */}
      <Nav currentUser={currentUser} onLogout={handleLogout} />

      {/* Routes выбирает ОДИН подходящий Route по текущему адресу в браузере */}
      <Routes>
        {/* Адрес "/" — таблица. Защищённый маршрут: если пользователь не вошёл (currentUser === null),
            вместо страницы делаем перенаправление на /login (replace — не оставляем "/" в истории) */}
        <Route
          path="/"
          element={
            currentUser ? <HomePage /> : <Navigate to="/login" replace />
          }
        />

        {/* Адрес "/login" — авторизация. В props передаём handleLogin, чтобы страница могла сохранить пользователя в state App */}
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />

        {/* Адрес "/register" — регистрация */}
        <Route path="/register" element={<RegisterPage />} />

        {/* "*" — любой другой адрес: отправляем на "/" (а оттуда, если не вошёл, — на /login) */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App; // экспорт по умолчанию — чтобы main.jsx мог импортировать App
