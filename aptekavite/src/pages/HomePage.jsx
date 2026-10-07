// src/pages/HomePage.jsx — СТРАНИЦА ПРОСМОТРА (таблица лекарств из прошлой лабораторной).
// Связывает данные (medicineService) с отображением (MedicineTable, AddMedicineForm).

import { useState } from "react"; // хук состояния
import { medicineService } from "../services/MedicineService"; // готовый экземпляр сервиса с данными
import MedicineTable from "../components/MedicineTable"; // строки таблицы
import AddMedicineForm from "../components/AddMedicineForm"; // строка добавления

export default function HomePage() {
  // Начальное значение state — список из сервиса. Сам state нужен, чтобы React перерисовал таблицу при изменении.
  const [medicines, setMedicines] = useState(medicineService.all());

  const handleAdd = (data) => {
    // вызывается из AddMedicineForm
    medicineService.add(data); // 1) добавляем данные в сервис (там генерируется id)
    setMedicines(medicineService.all()); // 2) кладём в state НОВЫЙ массив -> React перерисует таблицу
  };

  const handleDelete = (id) => {
    // вызывается из MedicineTable
    medicineService.delete(id); // 1) удаляем из сервиса
    setMedicines(medicineService.all()); // 2) обновляем state -> таблица перерисуется
  };

  // Простая таблица без CSS: рамка (border) и отступы (cellPadding) задаются атрибутами
  return (
    <table border={1} cellPadding={6}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Название</th>
          <th>Цена, BYN</th>
          <th>Количество</th>
          {/* колонка под кнопку "Удалить" */}
          <th></th>
        </tr>
      </thead>
      <tbody>
        {/* Вниз передаём данные (medicines) и функцию (onDelete) — "данные вниз, события вверх" */}
        <MedicineTable medicines={medicines} onDelete={handleDelete} />
        {/* последняя строка таблицы — форма добавления */}
        <AddMedicineForm onAdd={handleAdd} />
      </tbody>
    </table>
  );
}
