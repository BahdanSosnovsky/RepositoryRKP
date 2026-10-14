// src/store/selectors.js — СЕЛЕКТОРЫ, зависящие от нескольких слайсов.

// Идёт ли сейчас хоть какая-то загрузка. Спиннер (LoadingOverlay) смотрит ТОЛЬКО на это.
// Ошибки читаются отдельными селекторами (selectAuthError, selectMedicinesError),
// поэтому спиннер и ошибки друг другу не мешают: пока статус "loading" — ошибка уже сброшена
// (см. pending в слайсах), а как только пришёл ответ — спиннер исчезает и ошибка видна.
export const selectIsLoading = (state) =>
  state.auth.status === "loading" || state.medicines.status === "loading";
