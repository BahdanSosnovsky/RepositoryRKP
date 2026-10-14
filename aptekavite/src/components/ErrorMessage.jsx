// src/components/ErrorMessage.jsx — БЛОК С ТЕКСТОМ ОШИБКИ.
// Рисуется внутри страницы (не поверх неё), поэтому спиннер его не перекрывает.
// Если message пустой (null/"") — не показывается вообще.

export default function ErrorMessage({ message }) {
  if (!message) return null; // ошибки нет — нечего показывать

  // role="alert" — программы чтения с экрана сразу зачитают ошибку
  return (
    <p className="error" role="alert">
      {message}
    </p>
  );
}
