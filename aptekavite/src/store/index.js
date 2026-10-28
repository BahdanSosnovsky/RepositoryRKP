// src/store/index.js — ХРАНИЛИЩЕ (store) Redux. Одно на всё приложение.

import { configureStore } from "@reduxjs/toolkit"; // configureStore — создаёт store с разумными настройками по умолчанию
import authReducer from "./authSlice"; // редьюсер авторизации
import medicinesReducer from "./medicinesSlice"; // редьюсер лекарств
import suppliersReducer from "./suppliersSlice"; // редьюсер поставщиков (вторая форма)

export const store = configureStore({
  reducer: {
    auth: authReducer, // state.auth      — пользователь, статус, ошибка
    medicines: medicinesReducer, // state.medicines — список, статус, ошибка
    suppliers: suppliersReducer, // state.suppliers — поставщики, статус, ошибка
  },
});
