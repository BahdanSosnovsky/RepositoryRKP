// src/store/authSlice.js — СЛАЙС (slice) АВТОРИЗАЦИИ.
// Слайс = кусок Redux-хранилища + его редьюсеры + автоматически созданные actions.
// Здесь хранится авторизованный пользователь (раньше он лежал в useState корня App).
//
// Форма state:
//   user   — { login, name } или null (пароль в хранилище НЕ кладём!)
//   status — "idle" | "loading" | "succeeded" | "failed"  (на его основе показывается спиннер)
//   error  — текст ошибки или null                        (на его основе показывается ошибка)

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; // createSlice — слайс, createAsyncThunk — асинхронное действие
import { accountService } from "../services/AccountService"; // наша заглушка с аккаунтами
import { delay } from "../utils/delay"; // имитация задержки сети

// ---------- ASYNC THUNK'и (асинхронные действия) ----------
// createAsyncThunk сам создаёт три action'а: <имя>/pending, <имя>/fulfilled, <имя>/rejected.
// Их потом обрабатывает extraReducers слайса.

// Вход: проверяем логин и пароль через сервис
export const loginUser = createAsyncThunk(
  "auth/login", // префикс имён action'ов: auth/login/pending и т.д.
  async ({ login, password }, { rejectWithValue }) => {
    await delay(700); // "запрос на сервер" занимает время -> виден спиннер
    const account = accountService.authenticate(login, password); // Account или undefined
    if (!account) {
      return rejectWithValue("Неверный логин или пароль"); // -> action rejected, текст попадёт в action.payload
    }
    return { login: account.login, name: account.name }; // -> action fulfilled; возвращаем ПРОСТОЙ объект без пароля
  },
);

// Регистрация: создаём новый аккаунт (пользователь после неё НЕ входит автоматически)
export const registerUser = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    await delay(700);
    const result = accountService.register(data); // { ok: true, account } или { ok: false, error }
    if (!result.ok) {
      return rejectWithValue(result.error); // например "Такой логин уже занят"
    }
    return { login: result.account.login, name: result.account.name };
  },
);

// ---------- СЛАЙС ----------
const initialState = {
  user: null, // никто не вошёл
  status: "idle", // ещё ничего не запрашивали
  error: null, // ошибок нет
};

const authSlice = createSlice({
  name: "auth", // имя слайса: ключ в хранилище и префикс обычных action'ов
  initialState,

  // reducers — ОБЫЧНЫЕ (синхронные) редьюсеры. Здесь можно "менять" state напрямую:
  // Redux Toolkit использует библиотеку Immer и сам превращает это в неизменяемое обновление.
  reducers: {
    logout(state) {
      state.user = null; // выход
      state.status = "idle";
      state.error = null;
    },
    clearAuthError(state) {
      state.error = null; // страницы вызывают это при открытии, чтобы не показывать старую ошибку
    },
  },

  // extraReducers — реакция слайса на ЧУЖИЕ action'ы, в нашем случае на action'ы thunk'ов.
  // Именно сюда приходят pending / fulfilled / rejected от createAsyncThunk.
  extraReducers: (builder) => {
    builder
      // --- вход ---
      .addCase(loginUser.pending, (state) => {
        state.status = "loading"; // запрос пошёл -> включится спиннер
        state.error = null; // старую ошибку убираем, чтобы она не торчала под спиннером
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded"; // успех -> спиннер выключится
        state.user = action.payload; // запоминаем пользователя
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed"; // неудача -> спиннер выключится
        // payload — наш текст из rejectWithValue; если его нет (неожиданная ошибка) — берём стандартное сообщение
        state.error = action.payload ?? action.error.message;
      })
      // --- регистрация ---
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.status = "succeeded"; // user не трогаем: после регистрации нужно войти
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? action.error.message;
      });
  },
});

export const { logout, clearAuthError } = authSlice.actions; // action creators обычных редьюсеров
export default authSlice.reducer; // сам редьюсер подключается в store

// Селекторы — функции, достающие нужный кусок из state (используются в useSelector)
export const selectCurrentUser = (state) => state.auth.user;
export const selectAuthError = (state) => state.auth.error;
