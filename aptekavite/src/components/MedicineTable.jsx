// src/components/MedicineTable.jsx — СТРОКИ ТАБЛИЦЫ лекарств.
// Презентационный компонент: рисует переданный список и сообщает наверх, какую строку хотят удалить.
// Сам данные не меняет и про сервис ничего не знает.

// medicines — массив лекарств, onDelete — функция-обработчик удаления (приходит из HomePage)
export default function MedicineTable({ medicines, onDelete }) {
  return (
    <>
      {/* map превращает каждый объект массива в строку <tr>.
          key — уникальный ключ, по нему React отслеживает строки при изменениях списка */}
      {medicines.map((item) => (
        <tr key={item.id}>
          {/* ID лекарства */}
          <td>{item.id}</td>
          {/* название */}
          <td>{item.name}</td>
          {/* цена в BYN */}
          <td>{item.price}</td>
          {/* количество */}
          <td>{item.quantity}</td>
          <td>
            {/* стрелочная функция нужна, чтобы передать id конкретной строки при клике */}
            <button type="button" onClick={() => onDelete(item.id)}>
              Удалить
            </button>
          </td>
        </tr>
      ))}
    </>
  )
}
