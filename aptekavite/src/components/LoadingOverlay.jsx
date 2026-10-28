// src/components/LoadingOverlay.jsx — ГЛОБАЛЬНОЕ ОКНО ЗАГРУЗКИ (спиннер на весь экран).
// Показывается, пока в слайсах auth / medicines status === "loading", и пропадает сразу после ответа.
//
// Почему он не конфликтует с ошибками:
//  1) он смотрит только на статус загрузки (selectIsLoading), ошибок не читает и не рисует;
//  2) при старте запроса (pending) слайсы сбрасывают error = null, поэтому
//     "старая ошибка под спиннером" невозможна;
//  3) как только запрос завершился ошибкой, status становится "failed" -> спиннер исчезает,
//     а ошибка выводится самой страницей через <ErrorMessage />.

import { useSelector } from "react-redux"; // хук для чтения данных из хранилища
import { selectIsLoading } from "../store/selectors";
import Spinner from "./Spinner"; // общий индикатор

export default function LoadingOverlay() {
  const isLoading = useSelector(selectIsLoading); // true/false; компонент перерисуется при изменении

  if (!isLoading) return null; // нет загрузки — ничего не рисуем

  return (
    // overlay-fixed — поверх всего экрана. role="status" и aria-live — чтобы программы чтения с экрана озвучили "Загрузка"
    <div className="overlay overlay-fixed" role="status" aria-live="polite">
      <Spinner />
    </div>
  );
}
