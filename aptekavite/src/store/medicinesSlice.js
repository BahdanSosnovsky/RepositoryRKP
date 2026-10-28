// src/store/medicinesSlice.js — СЛАЙС ЛЕКАРСТВ (таблица).
//
// Форма state:
//   items  — массив лекарств (простые объекты)
//   status — "idle" | "loading" | "succeeded" | "failed"
//   error  — текст ошибки или null

import {
  createSlice,
  createAsyncThunk,
  createSelector,
  isPending,
  isFulfilled,
  isRejected,
} from "@reduxjs/toolkit"; // isPending/isFulfilled/isRejected — готовые проверки типа action'а для addMatcher; createSelector — мемоизированные селекторы
import { medicineService } from "../services/MedicineService"; // заглушка с данными
import { delay } from "../utils/delay";

// ---------- ASYNC THUNK'и ----------

// Загрузка списка (вызывается при открытии страницы с таблицей)
export const fetchMedicines = createAsyncThunk(
  "medicines/fetch",
  async () => {
    await delay(900); // имитация загрузки страницы
    // Экземпляры класса Medicine -> простые объекты ({ ...item }),
    // потому что в Redux-хранилище должны лежать только сериализуемые данные
    return medicineService.all().map((item) => ({ ...item }));
  },
  {
    // condition — "предохранитель": если загрузка уже идёт, второй запрос не отправляем.
    // (В режиме разработки StrictMode вызывает useEffect дважды — без этого было бы два запроса.)
    condition: (_, { getState }) => getState().medicines.status !== "loading",
  },
);

// Добавление лекарства
export const addMedicine = createAsyncThunk(
  "medicines/add",
  async (data, { rejectWithValue }) => {
    await delay(500);
    if (!data.name || !data.name.trim()) {
      return rejectWithValue("Введите название лекарства");
    }
    if (data.price < 0 || data.quantity < 0) {
      return rejectWithValue("Цена и количество не могут быть отрицательными");
    }
    const created = medicineService.add({ ...data, name: data.name.trim() }); // сервис назначает id
    return { ...created }; // простой объект -> попадёт в action.payload
  },
);

// Удаление лекарства по id
export const deleteMedicine = createAsyncThunk(
  "medicines/delete",
  async (id, { rejectWithValue }) => {
    await delay(500);
    const removed = medicineService.delete(id); // true, если запись была
    if (!removed) {
      return rejectWithValue("Лекарство не найдено");
    }
    return id; // в payload кладём id, чтобы слайс знал, что убрать из items
  },
);

// ---------- СЛАЙС ----------
const medicinesSlice = createSlice({
  name: "medicines",
  initialState: { items: [], status: "idle", error: null },
  reducers: {}, // обычных (синхронных) действий у этого слайса нет — всё идёт через thunk'и

  extraReducers: (builder) => {
    builder
      // 1) addCase — реакция на КОНКРЕТНЫЙ action: что делать с ДАННЫМИ (items)
      .addCase(fetchMedicines.fulfilled, (state, action) => {
        state.items = action.payload; // положили загруженный список
      })
      .addCase(addMedicine.fulfilled, (state, action) => {
        state.items.push(action.payload); // push можно: Immer сделает копию за нас
      })
      .addCase(deleteMedicine.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      })

      // 2) addMatcher — реакция сразу на ГРУППУ action'ов: общий код для статуса и ошибки,
      //    чтобы не писать одно и то же для каждого thunk'а. (addMatcher всегда идёт ПОСЛЕ addCase.)
      .addMatcher(
        isPending(fetchMedicines, addMedicine, deleteMedicine), // любой из трёх thunk'ов начался
        (state) => {
          state.status = "loading"; // -> включается спиннер
          state.error = null; // -> старая ошибка пропадает (спиннер и ошибка не показываются вместе)
        },
      )
      .addMatcher(
        isFulfilled(fetchMedicines, addMedicine, deleteMedicine), // любой завершился успешно
        (state) => {
          state.status = "succeeded"; // -> спиннер выключается
        },
      )
      .addMatcher(
        isRejected(fetchMedicines, addMedicine, deleteMedicine), // любой завершился ошибкой
        (state, action) => {
          state.status = "failed"; // -> спиннер выключается, показывается ошибка
          state.error = action.payload ?? action.error.message;
        },
      );
  },
});

export default medicinesSlice.reducer;

// ---------- СЕЛЕКТОРЫ ----------
// Обычные ("простые") селекторы — просто достают кусок state.
export const selectMedicines = (state) => state.medicines.items;
export const selectMedicinesStatus = (state) => state.medicines.status;
export const selectMedicinesError = (state) => state.medicines.error;

// Остаток, ниже которого лекарство считается "заканчивающимся"
export const LOW_STOCK_LIMIT = 60;

// МЕМОИЗИРОВАННЫЙ селектор (createSelector из Reselect, он входит в Redux Toolkit).
// Как работает: 1) входные селекторы ([selectMedicines]) достают данные из state;
//               2) если их результат НЕ изменился (та же ссылка на массив) — функция-вычислитель
//                  НЕ запускается, возвращается прошлый результат из кэша;
//               3) пересчёт происходит только когда items реально изменился (add / delete / fetch).
// Зачем: подсчёт по всему массиву — "дорогая" работа, а useSelector вызывает селектор после
// каждого action'а. Без мемоизации объект-результат создавался бы заново каждый раз
// и компонент перерисовывался бы без причины.
export const selectMedicinesStats = createSelector(
  [selectMedicines], // входной селектор
  (items) => {
    // результирующая функция: считает сводку по списку
    let totalQuantity = 0; // всего единиц на складе
    let totalValue = 0; // стоимость склада (цена * количество)
    let lowStock = 0; // сколько позиций заканчивается
    for (const item of items) {
      totalQuantity += item.quantity;
      totalValue += item.price * item.quantity;
      if (item.quantity < LOW_STOCK_LIMIT) lowStock += 1;
    }
    return {
      count: items.length,
      totalQuantity,
      totalValue: Math.round(totalValue * 100) / 100, // округляем до копеек
      lowStock,
    };
  },
);
