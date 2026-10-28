// src/components/SuppliersTable.jsx — ТАБЛИЦА НА БИБЛИОТЕКЕ TanStack Table (@tanstack/react-table).
// Библиотека "headless": считает сортировку, фильтр и страницы, а вёрстку (<table>, <tr>...)
// рисуем сами. Из коробки получаем: сортировку по клику на заголовок, поиск по всем колонкам
// и постраничный вывод.

import { useMemo, useState } from "react"; // useMemo — запомнить значение между перерисовками, useState — состояние
import {
  createColumnHelper, // помощник для описания колонок
  flexRender, // отрисовка заголовка/ячейки (они могут быть строкой или функцией)
  getCoreRowModel, // базовая модель строк (обязательна)
  getFilteredRowModel, // включает фильтрацию
  getPaginationRowModel, // включает постраничный вывод
  getSortedRowModel, // включает сортировку
  useReactTable, // главный хук библиотеки
} from "@tanstack/react-table";

const columnHelper = createColumnHelper(); // создаём один раз вне компонента

// data — массив поставщиков (из Redux), onDelete — функция удаления по id
export default function SuppliersTable({ data, onDelete }) {
  const [sorting, setSorting] = useState([]); // [{ id: "city", desc: false }] — по какой колонке и как сортируем
  const [globalFilter, setGlobalFilter] = useState(""); // текст в поле поиска

  // Описание колонок. useMemo — чтобы массив не создавался заново при каждой перерисовке
  // (TanStack Table сравнивает ссылки, новый массив каждый раз = лишняя работа).
  const columns = useMemo(
    () => [
      columnHelper.accessor("id", { header: "ID" }), // accessor — колонка, берущая значение из поля объекта
      columnHelper.accessor("name", { header: "Компания" }),
      columnHelper.accessor("contact", { header: "Контакт" }),
      columnHelper.accessor("city", { header: "Город" }),
      columnHelper.accessor("phone", { header: "Телефон" }),
      columnHelper.display({
        // display — колонка без данных (у нас — кнопка)
        id: "actions",
        header: "",
        enableSorting: false, // по кнопкам сортировать нечего
        cell: ({ row }) => (
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => onDelete(row.original.id)} // row.original — исходный объект строки
          >
            Удалить
          </button>
        ),
      }),
    ],
    [onDelete], // пересоздаём колонки, только если изменилась функция удаления
  );

  const table = useReactTable({
    data, // что показывать
    columns, // как показывать
    state: { sorting, globalFilter }, // текущее состояние (храним сами, в useState)
    onSortingChange: setSorting, // библиотека сообщает, что сортировка изменилась
    onGlobalFilterChange: setGlobalFilter, // ... и что изменился поисковый текст
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(), // подключаем сортировку
    getFilteredRowModel: getFilteredRowModel(), // подключаем фильтрацию
    getPaginationRowModel: getPaginationRowModel(), // подключаем страницы
    initialState: { pagination: { pageSize: 5 } }, // по 5 строк на странице
  });

  const rows = table.getRowModel().rows; // строки ТЕКУЩЕЙ страницы (после поиска и сортировки)

  return (
    <div>
      {/* Поле поиска по всем колонкам */}
      <div className="toolbar">
        <input
          placeholder="Поиск по таблице..."
          value={globalFilter}
          onChange={(e) => table.setGlobalFilter(e.target.value)}
        />
      </div>

      <table className="table">
        <thead>
          {/* getHeaderGroups — строки заголовка */}
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const sorted = header.column.getIsSorted(); // false | "asc" | "desc"
                return (
                  <th
                    key={header.id}
                    className={header.column.getCanSort() ? "sortable" : ""}
                    // по клику переключаем сортировку: нет -> по возрастанию -> по убыванию -> нет
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                    {/* стрелка показывает направление сортировки */}
                    {sorted === "asc" && " ▲"}
                    {sorted === "desc" && " ▼"}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="empty">
                Ничего не найдено
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <tr key={row.id}>
                {/* getVisibleCells — ячейки строки */}
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Постраничная навигация */}
      <div className="pagination">
        <button
          type="button"
          className="btn btn-outline"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          «
        </button>
        <button
          type="button"
          className="btn btn-outline"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          ‹
        </button>
        <span>
          Страница {table.getState().pagination.pageIndex + 1} из{" "}
          {Math.max(table.getPageCount(), 1)}
        </span>
        <button
          type="button"
          className="btn btn-outline"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          ›
        </button>
        <button
          type="button"
          className="btn btn-outline"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          »
        </button>
        {/* выбор количества строк на странице */}
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => table.setPageSize(Number(e.target.value))}
        >
          {[5, 10, 20].map((size) => (
            <option key={size} value={size}>
              {size} на странице
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
