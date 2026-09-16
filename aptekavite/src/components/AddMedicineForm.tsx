// src/components/AddMedicineForm.tsx
// ---------------------------------------------------------
// Строка таблицы с полями ввода для добавления нового
// лекарства. Хранит своё собственное состояние полей формы
// и наружу отдаёт только готовые данные через onAdd —
// сама ничего не знает про MedicineService.
// ---------------------------------------------------------

import { useState } from 'react'

interface AddMedicineFormProps {
  onAdd: (data: { name: string; price: number; quantity: number }) => void
}

export default function AddMedicineForm({ onAdd }: AddMedicineFormProps) {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [quantity, setQuantity] = useState('')

  const handleSubmit = () => {
    if (!name) return // без названия строку не добавляем

    onAdd({
      name,
      price: Number(price) || 0,
      quantity: Number(quantity) || 0,
    })

    // Очищаем поля формы после добавления
    setName('')
    setPrice('')
    setQuantity('')
  }

  return (
    <tr>
      <td></td>
      <td>
        <input
          placeholder="Название"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </td>
      <td>
        <input
          type="number"
          placeholder="Цена"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </td>
      <td>
        <input
          type="number"
          placeholder="Количество"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </td>
      <td>
        <button type="button" onClick={handleSubmit}>
          Добавить
        </button>
      </td>
    </tr>
  )
}
