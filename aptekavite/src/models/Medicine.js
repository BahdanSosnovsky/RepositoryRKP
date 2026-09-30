// src/models/Medicine.js — МОДЕЛЬ "Лекарство".
// Класс описывает, из каких полей состоит одна запись таблицы.

export default class Medicine {
  constructor(id, name, price, quantity) { // конструктор вызывается при new Medicine(...)
    this.id = id // уникальный номер
    this.name = name // название
    this.price = price // цена в BYN
    this.quantity = quantity // количество на складе
  }
}
