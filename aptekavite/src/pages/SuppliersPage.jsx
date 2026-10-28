// src/pages/SuppliersPage.jsx — ВТОРАЯ ФОРМА: поставщики.
// Показывает, как переиспользуются готовые части:
//   ErrorMessage, StatsBar, Spinner (через LoadingBlock) — те же, что на странице лекарств;
//   EntityForm — универсальная форма; SuppliersTable — таблица на TanStack Table.
// Данные — из слайса suppliers: список грузится настоящим fetch-запросом.

import { useCallback, useEffect } from "react"; // useCallback — запомнить функцию между перерисовками
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSuppliers,
  addSupplier,
  deleteSupplier,
  selectSuppliers,
  selectSuppliersStatus,
  selectSuppliersError,
  selectSuppliersStats,
} from "../store/suppliersSlice";
import ErrorMessage from "../components/ErrorMessage"; // тот же блок ошибки, что и на странице лекарств
import StatsBar from "../components/StatsBar";
import LoadingBlock from "../components/LoadingBlock";
import EntityForm from "../components/EntityForm";
import SuppliersTable from "../components/SuppliersTable";

// Описание полей формы добавления: по нему EntityForm сам строит inputs
const SUPPLIER_FIELDS = [
  { name: "name", label: "Компания" },
  { name: "contact", label: "Контактное лицо" },
  { name: "city", label: "Город" },
  { name: "phone", label: "Телефон" },
];

export default function SuppliersPage() {
  const dispatch = useDispatch();
  const suppliers = useSelector(selectSuppliers);
  const status = useSelector(selectSuppliersStatus);
  const error = useSelector(selectSuppliersError);
  const stats = useSelector(selectSuppliersStats); // мемоизированный селектор: объект не пересоздаётся без причины

  // При первом открытии страницы загружаем список с сервера (fetch внутри thunk'а)
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchSuppliers());
    }
  }, [status, dispatch]);

  // useCallback: функции остаются теми же между перерисовками. Это важно для SuppliersTable:
  // onDelete входит в зависимости useMemo колонок, и без useCallback колонки пересоздавались бы постоянно.
  const handleAdd = useCallback(
    (values) => dispatch(addSupplier(values)).unwrap(), // unwrap -> Promise: форма узнаёт, успешно ли добавлено
    [dispatch],
  );
  const handleDelete = useCallback(
    (id) => dispatch(deleteSupplier(id)),
    [dispatch],
  );

  return (
    <section className="page">
      <h2>Поставщики</h2>

      <StatsBar
        items={[
          { label: "Поставщиков", value: stats.count },
          { label: "Городов", value: stats.cities },
        ]}
      />

      {/* Ошибка выводится ВНЕ LoadingBlock, поэтому локальный спиннер её не перекрывает */}
      <ErrorMessage message={error} />

      {/* Если первая загрузка не удалась — даём повторить */}
      {status === "failed" && suppliers.length === 0 && (
        <p>
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => dispatch(fetchSuppliers())}
          >
            Повторить загрузку
          </button>
        </p>
      )}

      {/* Спиннер загрузки поверх формы и таблицы */}
      <LoadingBlock loading={status === "loading"}>
        <EntityForm fields={SUPPLIER_FIELDS} onSubmit={handleAdd} />
        <SuppliersTable data={suppliers} onDelete={handleDelete} />
      </LoadingBlock>
    </section>
  );
}
