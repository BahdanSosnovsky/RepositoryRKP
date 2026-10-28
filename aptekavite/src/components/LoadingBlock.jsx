// src/components/LoadingBlock.jsx — ЛОКАЛЬНЫЙ СПИННЕР ПОВЕРХ БЛОКА.
// Оборачивает любую часть страницы (форму, таблицу) и, пока loading === true,
// рисует над ней полупрозрачный слой со спиннером. Остальная страница остаётся доступной.
// Используется на странице поставщиков: спиннер "над формой и таблицей".
//
// Важно: сообщения об ошибках на странице выводятся ВНЕ этого блока (выше него),
// поэтому спиннер их никогда не перекрывает.

import Spinner from "./Spinner";

// loading — показывать ли спиннер; children — то, что находится внутри блока
export default function LoadingBlock({ loading, children }) {
  return (
    // aria-busy сообщает вспомогательным технологиям, что содержимое сейчас обновляется
    <div className="loading-block" aria-busy={loading}>
      {children}
      {/* overlay-local — слой растягивается только на этот блок, а не на весь экран */}
      {loading && (
        <div className="overlay overlay-local" role="status">
          <Spinner />
        </div>
      )}
    </div>
  );
}
