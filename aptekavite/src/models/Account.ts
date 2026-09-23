// src/models/Account.ts
// ---------------------------------------------------------
// Класс-модель "Аккаунт пользователя". Описывает, какие данные
// хранятся про одного пользователя, авторизующегося в системе.
// ---------------------------------------------------------

export default class Account {
  login: string
  password: string
  name: string

  constructor(login: string, password: string, name: string) {
    this.login = login
    this.password = password
    this.name = name
  }
}
