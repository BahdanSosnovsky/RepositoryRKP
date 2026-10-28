// src/store/suppliersSlice.js — СЛАЙС ПОСТАВЩИКОВ (вторая форма, таблица на TanStack Table).
//
// Форма state:
//   items  — массив поставщиков { id, name, contact, city, phone }
//   status — "idle" | "loading" | "succeeded" | "failed"
//   error  — текст ошибки или null
//
// Здесь используется НАСТОЯЩИЙ асинхронный action: список загружается запросом fetch
// к публичному тестовому API (JSONPlaceholder). Добавление и удаление — thunk'и
// с имитацией задержки (у тестового API данные не сохраняются).

import {
  createSlice,
  createAsyncThunk,
  createSelector,
  isPending,
  isFulfilled,
  isRejected,
} from "@reduxjs/toolkit";
import { delay } from "../utils/delay";

const SUPPLIERS_URL = "https://jsonplaceholder.typicode.com/users"; // публичное тестовое API (список "пользователей")

// ---------- ASYNC THUNK'и ----------

// Загрузка списка по сети (настоящий fetch)
export const fetchSuppliers = createAsyncThunk(
  "suppliers/fetch",
  async (_, { rejectWithValue, signal }) => {
    // signal — AbortSignal от thunk'а: позволяет отменить запрос
    try {
      const response = await fetch(SUPPLIERS_URL, { signal }); // отправляем GET-запрос и ждём ответ
      if (!response.ok) {
        // сервер ответил, но с ошибкой (404, 500 ...) — fetch в этом случае НЕ бросает исключение
        return rejectWithValue(`Ошибка сервера: ${response.status}`);
      }
      const users = await response.json(); // разбираем JSON
      // Приводим чужой формат к нашему: берём только нужные поля
      return users.map((user) => ({
        id: user.id,
        name: user.company.name, // название компании
        contact: user.name, // контактное лицо
        city: user.address.city,
        phone: user.phone,
      }));
    } catch {
      // сюда попадаем, если сети нет вообще (offline, блокировка и т.п.)
      return rejectWithValue(
        "Не удалось загрузить поставщиков. Проверьте подключение к интернету.",
      );
    }
  },
  {
    // не запускаем второй запрос, пока идёт первый (StrictMode вызывает useEffect дважды)
    condition: (_, { getState }) => getState().suppliers.status !== "loading",
  },
);

// Добавление поставщика. getState позволяет прочитать текущий state прямо внутри thunk'а
export const addSupplier = createAsyncThunk(
  "suppliers/add",
  async (data, { getState, rejectWithValue }) => {
    await delay(500);
    const name = data.name.trim();
    const city = data.city.trim();
    if (!name) return rejectWithValue("Введите название компании");
    if (!city) return rejectWithValue("Введите город");

    // новый id = максимальный существующий + 1
    const lastId = getState().suppliers.items.reduce(
      (maxId, item) => Math.max(maxId, item.id),
      0,
    );
    return {
      id: lastId + 1,
      name,
      contact: data.contact.trim() || "—", // если поле пустое — прочерк
      city,
      phone: data.phone.trim() || "—",
    };
  },
);

// Удаление поставщика по id
export const deleteSupplier = createAsyncThunk(
  "suppliers/delete",
  async (id, { getState, rejectWithValue }) => {
    await delay(500);
    const exists = getState().suppliers.items.some((item) => item.id === id);
    if (!exists) return rejectWithValue("Поставщик не найден");
    return id;
  },
);

// ---------- СЛАЙС ----------
const suppliersSlice = createSlice({
  name: "suppliers",
  initialState: { items: [], status: "idle", error: null },
  reducers: {},

  extraReducers: (builder) => {
    builder
      // реакция на конкретные action'ы — работа с данными
      .addCase(fetchSuppliers.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addSupplier.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteSupplier.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      // общая реакция на группы action'ов — статус и ошибка
      .addMatcher(
        isPending(fetchSuppliers, addSupplier, deleteSupplier),
        (state) => {
          state.status = "loading"; // включится спиннер над формой и таблицей
          state.error = null; // старая ошибка убирается
        },
      )
      .addMatcher(
        isFulfilled(fetchSuppliers, addSupplier, deleteSupplier),
        (state) => {
          state.status = "succeeded";
        },
      )
      .addMatcher(
        isRejected(fetchSuppliers, addSupplier, deleteSupplier),
        (state, action) => {
          state.status = "failed";
          state.error = action.payload ?? action.error.message;
        },
      );
  },
});

export default suppliersSlice.reducer;

// ---------- СЕЛЕКТОРЫ ----------
export const selectSuppliers = (state) => state.suppliers.items;
export const selectSuppliersStatus = (state) => state.suppliers.status;
export const selectSuppliersError = (state) => state.suppliers.error;

// Мемоизированный селектор: сводка по поставщикам. Пересчитывается только при изменении items.
export const selectSuppliersStats = createSelector(
  [selectSuppliers],
  (items) => ({
    count: items.length,
    cities: new Set(items.map((item) => item.city)).size, // Set оставляет только уникальные города
  }),
);
