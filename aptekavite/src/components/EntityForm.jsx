// src/components/EntityForm.jsx — УНИВЕРСАЛЬНАЯ ФОРМА ДОБАВЛЕНИЯ.
// Строится по описанию полей, поэтому подходит для любой сущности:
//   <EntityForm fields={[{ name: "city", label: "Город" }]} onSubmit={...} />
// Здесь используется для добавления поставщика; так же можно подключить к любой другой таблице.
// Значения полей хранит у себя (useState), наружу отдаёт готовый объект через onSubmit.

import { useId, useState } from "react"; // useId — уникальный префикс для id полей (чтобы label был связан с input)

// Пустые значения для всех полей: { name: "", city: "", ... }
const buildEmpty = (fields) =>
  Object.fromEntries(fields.map((field) => [field.name, ""]));

export default function EntityForm({
  fields,
  onSubmit,
  submitText = "Добавить",
}) {
  const formId = useId(); // уникальная строка для этой формы
  const [values, setValues] = useState(() => buildEmpty(fields)); // ленивая инициализация: считается один раз

  // Обновляем одно поле, остальные копируем как есть
  const handleChange = (name, value) =>
    setValues((prev) => ({ ...prev, [name]: value }));

  const handleSubmit = (event) => {
    event.preventDefault(); // не даём браузеру перезагрузить страницу

    // onSubmit может вернуть Promise (у нас — dispatch(...).unwrap()).
    // Успех -> очищаем поля. Ошибка -> поля остаются, чтобы пользователь поправил ввод
    // (сама ошибка показывается страницей через <ErrorMessage />).
    Promise.resolve(onSubmit(values))
      .then(() => setValues(buildEmpty(fields)))
      .catch(() => {});
  };

  return (
    <form className="entity-form" onSubmit={handleSubmit}>
      {fields.map((field) => (
        <div className="field" key={field.name}>
          <label htmlFor={`${formId}-${field.name}`}>{field.label}</label>
          <input
            id={`${formId}-${field.name}`}
            type={field.type ?? "text"} // тип по умолчанию — текст
            value={values[field.name]}
            onChange={(e) => handleChange(field.name, e.target.value)}
          />
        </div>
      ))}
      <button type="submit" className="btn btn-primary">
        {submitText}
      </button>
    </form>
  );
}
