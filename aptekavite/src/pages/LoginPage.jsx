// src/pages/LoginPage.jsx — СТРАНИЦА АВТОРИЗАЦИИ.
// Вход идёт через Redux: dispatch(loginUser(...)) -> thunk проверяет аккаунт ->
// authSlice сохраняет пользователя в хранилище. При успехе переходим на "/" (useNavigate).

import { useEffect, useState } from "react"; // useEffect — эффекты, useState — поля формы
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // хук роутера для перехода из кода
import { loginUser, clearAuthError, selectAuthError } from "../store/authSlice";
import ErrorMessage from "../components/ErrorMessage";

export default function LoginPage() {
  const [login, setLogin] = useState(""); // значение поля "Логин"
  const [password, setPassword] = useState(""); // значение поля "Пароль"

  const dispatch = useDispatch();
  const error = useSelector(selectAuthError); // ошибка авторизации из хранилища (null — нет ошибки)
  const navigate = useNavigate(); // функция навигации: navigate('/путь') меняет страницу

  // При открытии страницы сбрасываем ошибку, оставшуюся от другой страницы (напр. регистрации)
  useEffect(() => {
    dispatch(clearAuthError());
  }, [dispatch]);

  const handleSubmit = (event) => {
    // вызывается при отправке формы (кнопка "Войти" / Enter)
    event.preventDefault(); // отменяем стандартную отправку формы, иначе страница перезагрузится

    dispatch(loginUser({ login, password })) // запускаем thunk (на время запроса покажется спиннер)
      .unwrap() // превращает результат в обычный Promise: успех -> then, ошибка -> catch
      .then(() => navigate("/")) // успех: переходим на таблицу лекарств
      .catch(() => {}); // ошибка уже лежит в state.auth.error и выводится ниже — здесь ничего не делаем
  };

  return (
    <section className="card">
      <h2>Авторизация</h2>
      {/* onSubmit — событие отправки формы */}
      <form className="form" onSubmit={handleSubmit}>
        <div className="field">
          <label>Логин</label>
          {/* управляемое поле: значение в state, onChange его обновляет */}
          <input value={login} onChange={(e) => setLogin(e.target.value)} />
        </div>
        <div className="field">
          <label>Пароль</label>
          {/* type="password" — символы скрыты точками */}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {/* показывается только если error не пустая */}
        <ErrorMessage message={error} />
        {/* submit -> вызовет onSubmit формы */}
        <button type="submit" className="btn btn-primary">
          Войти
        </button>
      </form>
    </section>
  );
}
