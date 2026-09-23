// src/pages/RegisterPage.tsx
// ---------------------------------------------------------
// Простая страница регистрации. Реального сохранения данных
// нет (нет ни бэкенда, ни базы пользователей) — форма только
// собирает значения полей и выводит их в консоль. При
// необходимости сюда позже можно подключить настоящий запрос.
// ---------------------------------------------------------

import { useState } from 'react'
import type { FormEvent } from 'react'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Заглушка: реальной отправки на сервер пока нет
    console.log('Регистрация:', { name, email, password })
  }

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
          <label>Email</label>
          <br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
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
        <br />
        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
  )
}
