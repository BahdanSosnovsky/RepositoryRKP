// src/services/MedicineService.js — СЕРВИС-ЗАГЛУШКА лекарств.
// Вместо настоящего сервера хранит данные в памяти и даёт методы all/get/add/delete
// (как в заглушке, которую дал преподаватель).

import Medicine from '../models/Medicine' // модель записи

export default class MedicineService {
  #medicines // #поле — ПРИВАТНОЕ (инкапсуляция): снаружи класса к нему обратиться нельзя

  constructor(initial = []) { // initial — начальный список (по умолчанию пустой)
    this.#medicines = initial
  }

  all() { // вернуть весь список
    return this.#medicines
  }

  get(id) { // найти одну запись по id
    return this.#medicines.find((item) => item.id === id) // find вернёт элемент или undefined
  }

  add({ name, price, quantity }) { // добавить запись (деструктуризация объекта-аргумента)
    const newMedicine = new Medicine(this.#nextId(), name, price, quantity) // id генерируем сами
    this.#medicines = [...this.#medicines, newMedicine] // НОВЫЙ массив (копия + новый элемент) — важно для React
    return newMedicine // возвращаем созданную запись
  }

  delete(id) { // удалить запись по id
    const lengthBefore = this.#medicines.length // запоминаем длину до удаления
    this.#medicines = this.#medicines.filter((item) => item.id !== id) // filter создаёт НОВЫЙ массив без этой записи
    return this.#medicines.length !== lengthBefore // true, если что-то реально удалили
  }

  #nextId() { // приватный метод: вычисляет следующий свободный id
    const lastId = this.#medicines.reduce( // reduce сворачивает массив в одно значение
      (maxId, item) => Math.max(maxId, item.id), // на каждом шаге берём максимум из текущего max и id элемента
      0, // начальное значение — 0 (если список пуст, первый id будет 1)
    )
    return lastId + 1
  }
}

// Единственный экземпляр сервиса (синглтон) с начальными данными.
// Все страницы импортируют именно его, поэтому видят одни и те же данные.
export const medicineService = new MedicineService([
  new Medicine(1, 'Парацетамол', 1.5, 120),
  new Medicine(2, 'Аспирин', 2.0, 80),
  new Medicine(3, 'Ибупрофен', 3.2, 50),
  new Medicine(4, 'Анальгин', 1.8, 60),
])
