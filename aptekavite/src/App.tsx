// src/App.tsx
// ---------------------------------------------------------
// Простая страница: таблица лекарств + поля для добавления
// новой строки + кнопка удаления. Данные берутся из заглушки
// MedicineAPI (адаптирована под тему проекта, см. src/MedicineAPI.ts).
// Стили не используются — страница намеренно без оформления.
// ---------------------------------------------------------

import { useState } from 'react'
import MedicineAPI from './MedicineAPI'

function App() {
  // Список строк таблицы, изначально берём из заглушки
  const [medicines, setMedicines] = useState(MedicineAPI.all())

  // Поля формы добавления
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [quantity, setQuantity] = useState('')

  // Добавить новую строку через заглушку и обновить таблицу
  const handleAdd = () => {
    if (!name) return
    MedicineAPI.add({
      name,
      price: Number(price) || 0,
      quantity: Number(quantity) || 0,
    })
    setMedicines(MedicineAPI.all())
    setName('')
    setPrice('')
    setQuantity('')
  }

  // Удалить строку через заглушку и обновить таблицу
  const handleDelete = (id: number) => {
    MedicineAPI.delete(id)
    setMedicines(MedicineAPI.all())
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
        {medicines.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.price}</td>
            <td>{item.quantity}</td>
            <td>
              <button type="button" onClick={() => handleDelete(item.id)}>
                Удалить
              </button>
            </td>
          </tr>
        ))}

        {/* Строка ввода для добавления новой записи */}
        <tr>
          <td></td>
          <td>
            <input value={name} onChange={(e) => setName(e.target.value)} />
          </td>
          <td>
            <input value={price} onChange={(e) => setPrice(e.target.value)} />
          </td>
          <td>
            <input
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </td>
          <td>
            <button type="button" onClick={handleAdd}>
              Добавить
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default App
