// src/components/MedicineTable.tsx
// ---------------------------------------------------------
// "Глупый" (презентационный) компонент: ничего не знает про
// сервис MedicineService, только рисует строки таблицы по
// переданному списку и вызывает onDelete при клике на кнопку.
// Вся логика (откуда взялись данные, как удалять) остаётся
// снаружи — в App.tsx.
// ---------------------------------------------------------

import type Medicine from '../models/Medicine'

interface MedicineTableProps {
  medicines: Medicine[]
  onDelete: (id: number) => void
}

export default function MedicineTable({
  medicines,
  onDelete,
}: MedicineTableProps) {
  return (
    <>
      {medicines.map((item) => (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.name}</td>
          <td>{item.price}</td>
          <td>{item.quantity}</td>
          <td>
            <button type="button" onClick={() => onDelete(item.id)}>
              Удалить
            </button>
          </td>
        </tr>
      ))}
    </>
  )
}
