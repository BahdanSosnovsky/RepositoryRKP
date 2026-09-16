// src/services/MedicineService.ts
// ---------------------------------------------------------
// Класс-заглушка "сервиса" лекарств. По сути это тот же
// подход, что и в заглушке препода (all/get/add/delete),
// только оформлено как класс:
//
// - список лекарств хранится в приватном поле (инкапсуляция),
//   снаружи класса напрямую его изменить нельзя — только
//   через методы all/get/add/delete;
// - вся логика работы с данными живёт в одном месте.
//
// Данные хранятся в памяти и сбрасываются при перезагрузке
// страницы — это по-прежнему заглушка, а не настоящий бэкенд.
// ---------------------------------------------------------

import Medicine from '../models/Medicine'

// Данные для добавления новой записи — всё, кроме id
// (id сервис генерирует сам)
type NewMedicineData = {
  name: string
  price: number
  quantity: number
}

export default class MedicineService {
  // private — доступно только внутри класса, снаружи это поле не видно
  private medicines: Medicine[]

  constructor(initial: Medicine[] = []) {
    this.medicines = initial
  }

  // Вернуть весь список лекарств
  all(): Medicine[] {
    return this.medicines
  }

  // Найти одно лекарство по id
  get(id: number): Medicine | undefined {
    return this.medicines.find((item) => item.id === id)
  }

  // Добавить новое лекарство. id генерируется автоматически
  add(data: NewMedicineData): Medicine {
    const newMedicine = new Medicine(
      this.nextId(),
      data.name,
      data.price,
      data.quantity,
    )
    this.medicines = [...this.medicines, newMedicine]
    return newMedicine
  }

  // Удалить лекарство по id. Возвращает true, если запись была найдена и удалена
  delete(id: number): boolean {
    const lengthBefore = this.medicines.length
    this.medicines = this.medicines.filter((item) => item.id !== id)
    return this.medicines.length !== lengthBefore
  }

  // Приватный метод — вычисляет следующий свободный id.
  // Используется только внутри класса, поэтому скрыт от внешнего кода.
  private nextId(): number {
    const lastId = this.medicines.reduce(
      (maxId, item) => Math.max(maxId, item.id),
      0,
    )
    return lastId + 1
  }
}

// Единственный экземпляр сервиса с начальными данными.
// Импортируется в компонентах вместо создания нового сервиса каждый раз,
// поэтому все части приложения работают с одними и теми же данными.
export const medicineService = new MedicineService([
  new Medicine(1, 'Парацетамол', 1.5, 120),
  new Medicine(2, 'Аспирин', 2.0, 80),
  new Medicine(3, 'Ибупрофен', 3.2, 50),
  new Medicine(4, 'Анальгин', 1.8, 60),
])
