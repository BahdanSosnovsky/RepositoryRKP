// src/components/Spinner.jsx — КРУТЯЩИЙСЯ ИНДИКАТОР с подписью.
// Самый маленький переиспользуемый кусок: используется и в глобальном окне загрузки
// (LoadingOverlay), и в локальном (LoadingBlock). Анимация — в index.css (.spinner).

export default function Spinner() {
  return (
    <>
      <div className="spinner" />
      <span>Загрузка...</span>
    </>
  );
}
