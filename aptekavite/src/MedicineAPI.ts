// src/MedicineAPI.ts
// ---------------------------------------------------------
// Заглушка данных под тему проекта "Аптека".
// Структура и логика методов взяты из заглушки, которую
// прислал преподаватель (EmployeeAPI: all/get/delete/add),
// поля данных заменены на "лекарства" (name/price/quantity).
// ---------------------------------------------------------

interface Medicine {
  id: number
  name: string
  price: number
  quantity: number
}

const MedicineAPI = {
  medicines: [
    { id: 1, name: 'Парацетамол', price: 1.5, quantity: 120 },
    { id: 2, name: 'Аспирин', price: 2.0, quantity: 80 },
    { id: 3, name: 'Ибупрофен', price: 3.2, quantity: 50 },
    { id: 4, name: 'Анальгин', price: 1.8, quantity: 60 },
  ] as Medicine[],

  // Вернуть весь список лекарств
  all: function () {
    return this.medicines
  },

  // Найти одно лекарство по id
  get: function (id: number) {
    const isMedicine = (p: Medicine) => p.id === id
    return this.medicines.find(isMedicine)
  },

  // Удалить лекарство по id
  delete: function (id: number) {
    const isNotDelMedicine = (p: Medicine) => p.id !== id
    this.medicines = this.medicines.filter(isNotDelMedicine)
    return true
  },

  // Добавить новое лекарство (id генерируется автоматически, если не передан)
  add: function (medicine: Partial<Medicine>) {
    let newMedicine = medicine as Medicine
    if (!newMedicine.id) {
      newMedicine = {
        ...newMedicine,
        id:
          this.medicines.reduce((prev, current) => {
            return prev.id > current.id ? prev : current
          }, { id: 0 } as Medicine).id + 1,
      }
    }
    this.medicines = [...this.medicines, newMedicine]
    return newMedicine
  },
}

export default MedicineAPI
