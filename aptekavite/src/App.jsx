// src/App.jsx — КОРНЕВОЙ КОМПОНЕНТ.
// Задачи: 1) узнать авторизованного пользователя из Redux-хранилища (слайс auth);
//         2) описать маршруты (какая страница на каком адресе);
//         3) показывать навигацию на всех страницах и окно загрузки поверх всего.

import { useDispatch, useSelector } from "react-redux"; // доступ к хранилищу
import { Routes, Route, Navigate } from "react-router-dom"; // Routes/Route — список маршрутов, Navigate — перенаправление
import { logout, selectCurrentUser } from "./store/authSlice"; // действие выхода и селектор пользователя
import Nav from "./components/Nav"; // панель навигации
import LoadingOverlay from "./components/LoadingOverlay"; // спиннер загрузки
import HomePage from "./pages/HomePage"; // страница с таблицей лекарств
import SuppliersPage from "./pages/SuppliersPage"; // вторая форма: поставщики (таблица на TanStack Table)
import RegisterPage from "./pages/RegisterPage"; // страница регистрации
import LoginPage from "./pages/LoginPage"; // страница авторизации

function App() {
  const dispatch = useDispatch();

  // currentUser — текущий пользователь из state.auth.user; null = никто не вошёл.
  // Раньше он лежал в useState прямо здесь, теперь — в хранилище Redux (authSlice).
  const currentUser = useSelector(selectCurrentUser);

  // Эту функцию передаём в Nav: вызывается по кнопке "Выйти"
  const handleLogout = () => dispatch(logout()); // отправляем action logout -> authSlice сбросит пользователя

  return (
    <>
      {/* Nav показывается на каждой странице, т.к. стоит ВНЕ <Routes>.
          Вниз передаём данные (currentUser) и функцию (onLogout) через props */}
      <Nav currentUser={currentUser} onLogout={handleLogout} />

      <main className="content">
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

          {/* Адрес "/suppliers" — вторая форма (поставщики). Тоже защищена: только для вошедших */}
          <Route
            path="/suppliers"
            element={
              currentUser ? <SuppliersPage /> : <Navigate to="/login" replace />
            }
          />

          {/* Адрес "/login" — авторизация. Пользователя страница сама кладёт в хранилище через dispatch */}
          <Route path="/login" element={<LoginPage />} />

          {/* Адрес "/register" — регистрация */}
          <Route path="/register" element={<RegisterPage />} />

          {/* "*" — любой другой адрес: отправляем на "/" (а оттуда, если не вошёл, — на /login) */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Окно загрузки. Стоит ВНЕ <Routes> и сам решает, показываться ли (по статусу в хранилище) */}
      <LoadingOverlay />
    </>
  );
}

export default App; // экспорт по умолчанию — чтобы main.jsx мог импортировать App
