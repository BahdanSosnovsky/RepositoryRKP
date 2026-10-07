// src/models/Account.js — МОДЕЛЬ "Аккаунт пользователя".
// Описывает данные одного пользователя системы.

export default class Account {
  constructor(login, password, name) {
    // конструктор: new Account('admin', 'admin123', 'Администратор')
    this.login = login; // логин для входа
    this.password = password; // пароль (в учебном проекте хранится открытым текстом)
    this.name = name; // отображаемое имя (выводится в Nav)
  }
}
