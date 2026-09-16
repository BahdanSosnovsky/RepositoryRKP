// src/models/Medicine.ts
// ---------------------------------------------------------
// Класс-модель "Лекарство". Описывает форму одной записи
// в таблице аптеки. Это "чистые данные" — модель ничего не
// знает ни про React, ни про то, откуда она берётся
// (заглушка, сервер, что угодно).
// ---------------------------------------------------------

export default class Medicine {
  readonly id: number
  name: string
  price: number
  quantity: number

  constructor(id: number, name: string, price: number, quantity: number) {
    this.id = id
    this.name = name
    this.price = price
    this.quantity = quantity
  }
}
