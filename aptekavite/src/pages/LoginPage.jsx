// src/pages/LoginPage.jsx — СТРАНИЦА АВТОРИЗАЦИИ.
// При верном логине/пароле: 1) сохраняет пользователя в state App (через onLogin),
// 2) переходит на страницу просмотра "/" с помощью useNavigate.

import { useState } from 'react' // хук состояния
import { useNavigate } from 'react-router-dom' // хук роутера для перехода из кода
import { accountService } from '../services/AccountService' // сервис с аккаунтами

export default function LoginPage({ onLogin }) { // onLogin пришёл из App (handleLogin)
  const [login, setLogin] = useState('') // значение поля "Логин"
  const [password, setPassword] = useState('') // значение поля "Пароль"
  const [error, setError] = useState('') // текст ошибки ('' — ошибки нет)

  const navigate = useNavigate() // функция навигации: navigate('/путь') меняет страницу

  const handleSubmit = (event) => { // вызывается при отправке формы (кнопка "Войти" / Enter)
    event.preventDefault() // отменяем стандартную отправку формы, иначе страница перезагрузится

    const account = accountService.authenticate(login, password) // ищем аккаунт: вернёт Account или undefined

    if (!account) { // не нашли — данные неверные
      setError('Неверный логин или пароль') // показываем ошибку
      return // дальше не идём
    }

    setError('') // успех — убираем старую ошибку
    onLogin(account) // отдаём пользователя в App -> он сохранится в state корневого компонента
    navigate('/') // переходим на таблицу лекарств
  }

  return (
    <div>
      <h2>Авторизация</h2>
      {/* onSubmit — событие отправки формы */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Логин</label>
          <br />
          {/* управляемое поле: значение в state, onChange его обновляет */}
          <input value={login} onChange={(e) => setLogin(e.target.value)} />
        </div>
        <div>
          <label>Пароль</label>
          <br />
          {/* type="password" — символы скрыты точками */}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {/* условный рендер: если error не пустая строка — показываем красный текст */}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <br />
        {/* submit -> вызовет onSubmit формы */}
        <button type="submit">Войти</button>
      </form>
    </div>
  )
}
