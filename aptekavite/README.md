# Аптека

Учебный проект: таблица лекарств, регистрация и авторизация с маршрутизацией.

Стек: React + Vite (JavaScript), React Router.

## Запуск

```bash
npm install
npm run dev      # режим разработки, http://localhost:5173
npm run build    # сборка в папку dist
npm run preview  # предпросмотр собранной версии
```

## Страницы

| Адрес       | Страница                                              |
|-------------|-------------------------------------------------------|
| `/login`    | авторизация                                           |
| `/register` | регистрация нового аккаунта                           |
| `/`         | таблица лекарств (только для авторизованных)          |

Тестовые аккаунты: `admin` / `admin123`, `user` / `user123`.

## Структура

```
src/
├── models/       Medicine.js, Account.js        — классы-модели
├── services/     MedicineService.js,            — классы-заглушки с данными
│                 AccountService.js                (хранят всё в памяти)
├── components/   Nav, MedicineTable, AddMedicineForm
├── pages/        HomePage, LoginPage, RegisterPage
├── App.jsx       маршруты + state авторизованного пользователя
└── main.jsx      точка входа, BrowserRouter
```

Данные (лекарства и аккаунты) хранятся в памяти и сбрасываются
при перезагрузке страницы.

## Сервер-заглушка (Express)

В папке `server/` лежит отдельный Express-сервер (`GET/POST/DELETE
/api/medicines`), к фронтенду он пока не подключён. Запуск: `npm run server`
(порт 3001).
