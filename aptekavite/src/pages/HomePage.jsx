// src/pages/HomePage.jsx — СТРАНИЦА ПРОСМОТРА (таблица лекарств).
// Данные теперь берутся из Redux-хранилища (слайс medicines), а не из useState.
// Страница: 1) при открытии просит загрузить список (fetchMedicines),
//           2) читает список/статус/ошибку через useSelector,
//           3) на добавление и удаление отправляет thunk'и через dispatch.

import { useEffect } from "react"; // хук побочных эффектов: код, который нужно выполнить после отрисовки
import { useDispatch, useSelector } from "react-redux"; // dispatch — отправка действий, useSelector — чтение state
import {
  fetchMedicines,
  addMedicine,
  deleteMedicine,
  selectMedicines,
  selectMedicinesStatus,
  selectMedicinesError,
  selectMedicinesStats,
  LOW_STOCK_LIMIT,
} from "../store/medicinesSlice";
import MedicineTable from "../components/MedicineTable"; // строки таблицы
import AddMedicineForm from "../components/AddMedicineForm"; // строка добавления
import ErrorMessage from "../components/ErrorMessage"; // блок ошибки
import StatsBar from "../components/StatsBar"; // карточки со сводкой (переиспользуются и на странице поставщиков)

export default function HomePage() {
  const dispatch = useDispatch(); // функция отправки действий в хранилище
  const medicines = useSelector(selectMedicines); // список лекарств из хранилища
  const status = useSelector(selectMedicinesStatus); // "idle" | "loading" | "succeeded" | "failed"
  const error = useSelector(selectMedicinesError); // текст ошибки или null
  const stats = useSelector(selectMedicinesStats); // МЕМОИЗИРОВАННЫЙ селектор: сводка пересчитывается только при изменении списка

  // useEffect выполняется после первой отрисовки страницы.
  // Если список ещё ни разу не загружали (status "idle") — запускаем загрузку.
  // На время загрузки статус станет "loading" и появится спиннер (LoadingOverlay).
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchMedicines());
    }
  }, [status, dispatch]); // массив зависимостей: эффект перезапускается, если изменилось одно из значений

  const handleAdd = (data) => dispatch(addMedicine(data)); // вызывается из AddMedicineForm
  const handleDelete = (id) => dispatch(deleteMedicine(id)); // вызывается из MedicineTable

  return (
    <section className="page">
      <h2>Лекарства</h2>

      {/* Сводка по складу: данные из мемоизированного селектора selectMedicinesStats */}
      <StatsBar
        items={[
          { label: "Позиций", value: stats.count },
          { label: "Единиц на складе", value: stats.totalQuantity },
          {
            label: "Стоимость склада, BYN",
            value: stats.totalValue.toFixed(2),
          },
          {
            label: `Заканчивается (< ${LOW_STOCK_LIMIT})`,
            value: stats.lowStock,
          },
        ]}
      />

      {/* Ошибка выводится внутри страницы, над таблицей; спиннер её не перекрывает */}
      <ErrorMessage message={error} />

      <table className="table">
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
    </section>
  );
}
