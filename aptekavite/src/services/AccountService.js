// src/services/AccountService.js — СЕРВИС-ЗАГЛУШКА аккаунтов ("объект с данными об аккаунтах" из задания).
// Хранит список пользователей в памяти, умеет проверять вход и регистрировать новых.

import Account from "../models/Account"; // модель аккаунта

export default class AccountService {
  #accounts; // приватный список аккаунтов (снаружи недоступен)

  constructor(initial = []) {
    // initial — стартовый список
    this.#accounts = initial;
  }

  authenticate(login, password) {
    // АВТОРИЗАЦИЯ: проверка логина и пароля
    return this.#accounts.find(
      // ищем аккаунт, у которого совпали ОБА поля
      (account) => account.login === login && account.password === password,
    ); // вернёт Account или undefined
  }

  register({ login, password, name }) {
    // РЕГИСТРАЦИЯ нового пользователя
    if (!login || !password || !name) {
      // хотя бы одно поле пустое
      return { ok: false, error: "Заполните все поля" };
    }

    const exists = this.#accounts.some((account) => account.login === login); // some — есть ли хоть один с таким логином
    if (exists) {
      // логин занят
      return { ok: false, error: "Такой логин уже занят" };
    }

    const account = new Account(login, password, name); // создаём объект нового аккаунта
    this.#accounts = [...this.#accounts, account]; // добавляем в НОВЫЙ массив
    return { ok: true, account }; // сообщаем об успехе
  }
}

// Единственный экземпляр сервиса с двумя тестовыми аккаунтами
export const accountService = new AccountService([
  new Account("admin", "admin123", "Администратор"),
  new Account("user", "user123", "Пользователь"),
]);
