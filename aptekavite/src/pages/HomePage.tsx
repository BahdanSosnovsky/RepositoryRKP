// src/pages/HomePage.tsx
// ---------------------------------------------------------
// Главная страница: таблица лекарств. Логика та же, что была
// раньше прямо в App.tsx — просто теперь это отдельная
// страница роутера, а не единственный экран приложения.
// ---------------------------------------------------------

import { useState } from 'react'
import { medicineService } from '../services/MedicineService'
import type Medicine from '../models/Medicine'
import MedicineTable from '../components/MedicineTable'
import AddMedicineForm from '../components/AddMedicineForm'

export default function HomePage() {
  const [medicines, setMedicines] = useState<Medicine[]>(medicineService.all())

  // Добавить новую запись через сервис и перечитать таблицу
  const handleAdd = (data: { name: string; price: number; quantity: number }) => {
    medicineService.add(data)
    setMedicines(medicineService.all())
  }

  // Удалить запись через сервис и перечитать таблицу
  const handleDelete = (id: number) => {
    medicineService.delete(id)
    setMedicines(medicineService.all())
  }

  return (
    <table border={1} cellPadding={6}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Название</th>
          <th>Цена, BYN</th>
          <th>Количество</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <MedicineTable medicines={medicines} onDelete={handleDelete} />
        <AddMedicineForm onAdd={handleAdd} />
      </tbody>
    </table>
  )
}
