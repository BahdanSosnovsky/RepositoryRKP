// src/components/AddMedicineForm.jsx — СТРОКА ВВОДА для добавления нового лекарства.
// Свои поля хранит у себя в state, а готовые данные отдаёт наверх через onAdd.

import { useState } from "react"; // хук состояния

export default function AddMedicineForm({ onAdd }) {
  // onAdd — функция из HomePage
  const [name, setName] = useState(""); // текст поля "Название"
  const [price, setPrice] = useState(""); // текст поля "Цена" (строка, пока пользователь вводит)
  const [quantity, setQuantity] = useState(""); // текст поля "Количество"

  const handleSubmit = () => {
    // обработчик кнопки "Добавить"
    if (!name) return; // если название пустое — ничего не делаем

    onAdd({
      // передаём данные наверх (в HomePage)
      name, // название как есть
      price: Number(price) || 0, // строку -> число; если не число (NaN) или пусто — подставляем 0
      quantity: Number(quantity) || 0, // то же для количества
    });

    setName(""); // очищаем поля после добавления
    setPrice("");
    setQuantity("");
  };

  return (
    <tr>
      {/* пустая ячейка под колонку ID (id назначит сервис) */}
      <td></td>
      <td>
        {/* Управляемый input: value берётся из state, onChange обновляет state на каждый символ */}
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
        {/* type="button" — чтобы не отправлялась форма */}
        <button type="button" onClick={handleSubmit}>
          Добавить
        </button>
      </td>
    </tr>
  );
}
