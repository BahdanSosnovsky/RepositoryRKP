// src/App.tsx
// ---------------------------------------------------------
// Компонент-контейнер: связывает данные (MedicineService)
// с отображением (MedicineTable, AddMedicineForm).
// Сам ничего не рендерит "по мелочи" — только раскладывает
// более простые компоненты по местам и передаёт им данные
// и обработчики.
// ---------------------------------------------------------

import { useState } from 'react'
import { medicineService } from './services/MedicineService'
import type Medicine from './models/Medicine'
import MedicineTable from './components/MedicineTable'
import AddMedicineForm from './components/AddMedicineForm'

function App() {
  // Строки таблицы. Тип Medicine и сам сервис берём из отдельных
  // модулей — App.tsx не знает, как именно данные хранятся внутри сервиса.
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

export default App
