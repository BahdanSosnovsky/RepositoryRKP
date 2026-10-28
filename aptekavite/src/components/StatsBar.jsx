// src/components/StatsBar.jsx — ПОЛОСА КАРТОЧЕК СО СВОДКОЙ.
// Универсальный компонент: показывает любой список пар "подпись — значение".
// Переиспользуется на двух страницах: лекарства (HomePage) и поставщики (SuppliersPage).

// items — массив вида [{ label: "Позиций", value: 4 }, ...]
export default function StatsBar({ items }) {
  return (
    <div className="stats">
      {items.map((item) => (
        <div className="stat" key={item.label}>
          <div className="stat-value">{item.value}</div>
          <div className="stat-label">{item.label}</div>
        </div>
      ))}
    </div>
  );
}
