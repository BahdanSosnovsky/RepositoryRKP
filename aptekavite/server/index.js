// server/index.js
// ---------------------------------------------------------
// Это СЕРВЕР-ЗАГЛУШКА (mock backend) для проекта "Аптека".
// Он не подключён к базе данных — все данные хранятся прямо
// в оперативной памяти процесса (в обычном массиве).
// После перезапуска сервера данные сбросятся к начальным.
//
// Задача этого файла — показать, как в будущем можно будет
// подключить настоящий бэкенд к таблице лекарств на фронтенде.
// Сейчас фронтенд (src/App.tsx) работает независимо от сервера
// и хранит свои данные локально в React state, поэтому сервер
// можно запускать отдельно и проверять его, например, через
// Postman/curl, не трогая интерфейс.
// ---------------------------------------------------------

import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

// Разрешаем запросы с фронтенда (Vite dev-сервер обычно на 5173)
app.use(cors());
// Позволяет серверу читать JSON из тела запроса (req.body)
app.use(express.json());

// "База данных" аптеки — просто массив в памяти (заглушка).
// id, название, категория, цена (руб.), количество на складе.
let medicines = [
  { id: 1, name: 'Парацетамол', category: 'Жаропонижающее', price: 45, quantity: 120 },
  { id: 2, name: 'Аспирин', category: 'Обезболивающее', price: 60, quantity: 80 },
  { id: 3, name: 'Ибупрофен', category: 'Противовоспалительное', price: 95, quantity: 50 },
];

// Простой корневой маршрут — чтобы проверить, что сервер жив
app.get('/', (req, res) => {
  res.send('Сервер-заглушка аптеки работает. Используйте /api/medicines');
});

// GET /api/medicines — получить весь список лекарств
app.get('/api/medicines', (req, res) => {
  res.json(medicines);
});

// POST /api/medicines — добавить новое лекарство (заглушка)
// Ожидает в теле запроса JSON вида:
// { "name": "...", "category": "...", "price": 100, "quantity": 10 }
app.post('/api/medicines', (req, res) => {
  const { name, category, price, quantity } = req.body || {};

  // Минимальная проверка, что название передано
  if (!name) {
    return res.status(400).json({ error: 'Поле "name" обязательно' });
  }

  const newMedicine = {
    id: Date.now(), // простой способ сгенерировать уникальный id
    name,
    category: category || 'Без категории',
    price: Number(price) || 0,
    quantity: Number(quantity) || 0,
  };

  medicines.push(newMedicine);
  res.status(201).json(newMedicine);
});

// DELETE /api/medicines/:id — удалить лекарство по id (заглушка)
app.delete('/api/medicines/:id', (req, res) => {
  const id = Number(req.params.id);
  const existed = medicines.some((item) => item.id === id);

  medicines = medicines.filter((item) => item.id !== id);

  if (!existed) {
    return res.status(404).json({ error: 'Лекарство с таким id не найдено' });
  }

  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Сервер-заглушка запущен: http://localhost:${PORT}`);
});
