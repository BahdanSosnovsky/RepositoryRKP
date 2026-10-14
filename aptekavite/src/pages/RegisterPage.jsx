// src/pages/RegisterPage.jsx — СТРАНИЦА РЕГИСТРАЦИИ.
// Регистрация идёт через Redux: dispatch(registerUser(...)). При успехе — переход на страницу входа.

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // хук для перехода на другую страницу
import {
  registerUser,
  clearAuthError,
  selectAuthError,
} from "../store/authSlice";
import ErrorMessage from "../components/ErrorMessage";

export default function RegisterPage() {
  const [name, setName] = useState(""); // поле "Имя"
  const [login, setLogin] = useState(""); // поле "Логин"
  const [password, setPassword] = useState(""); // поле "Пароль"

  const dispatch = useDispatch();
  const error = useSelector(selectAuthError); // сообщение об ошибке из хранилища
  const navigate = useNavigate(); // функция перехода между маршрутами

  // При открытии страницы сбрасываем старую ошибку (например, "Неверный логин или пароль" со страницы входа)
  useEffect(() => {
    dispatch(clearAuthError());
  }, [dispatch]);

  const handleSubmit = (event) => {
    // отправка формы
    event.preventDefault(); // не даём браузеру перезагрузить страницу

    dispatch(registerUser({ login, password, name })) // thunk регистрации (на время запроса — спиннер)
      .unwrap()
      .then(() => navigate("/login")) // успех: после регистрации идём на страницу входа
      .catch(() => {}); // ошибка (пустые поля / логин занят) выводится ниже из state
  };

  return (
    <section className="card">
      <h2>Регистрация</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="field">
          <label>Имя</label>
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="field">
          <label>Логин</label>
          <input value={login} onChange={(e) => setLogin(e.target.value)} />
        </div>
        <div className="field">
          <label>Пароль</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {/* текст ошибки показывается только если она есть */}
        <ErrorMessage message={error} />
        <button type="submit" className="btn btn-primary">
          Зарегистрироваться
        </button>
      </form>
    </section>
  );
}
