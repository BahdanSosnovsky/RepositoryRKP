// src/pages/RegisterPage.jsx — СТРАНИЦА РЕГИСТРАЦИИ.
// Создаёт новый аккаунт в AccountService и отправляет пользователя на страницу входа.

import { useState } from "react"; // хук состояния
import { useNavigate } from "react-router-dom"; // хук для перехода на другую страницу
import { accountService } from "../services/AccountService"; // сервис с аккаунтами

export default function RegisterPage() {
  const [name, setName] = useState(""); // поле "Имя"
  const [login, setLogin] = useState(""); // поле "Логин"
  const [password, setPassword] = useState(""); // поле "Пароль"
  const [error, setError] = useState(""); // сообщение об ошибке

  const navigate = useNavigate(); // функция перехода между маршрутами

  const handleSubmit = (event) => {
    // отправка формы
    event.preventDefault(); // не даём браузеру перезагрузить страницу

    const result = accountService.register({ login, password, name }); // { ok: true, account } или { ok: false, error }

    if (!result.ok) {
      // регистрация не удалась (пустые поля или логин занят)
      setError(result.error); // показываем причину
      return;
    }

    setError(""); // успех — очищаем ошибку
    navigate("/login"); // после регистрации идём на страницу входа
  };

  return (
    <div>
      <h2>Регистрация</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Имя</label>
          <br />
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Логин</label>
          <br />
          <input value={login} onChange={(e) => setLogin(e.target.value)} />
        </div>
        <div>
          <label>Пароль</label>
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {/* красный текст ошибки показывается только если она есть */}
        {error && <p style={{ color: "red" }}>{error}</p>}
        <br />
        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
  );
}
