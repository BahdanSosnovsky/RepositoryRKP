// src/main.jsx — ТОЧКА ВХОДА приложения. Vite подключает этот файл из index.html.
// Здесь React "прикрепляется" к странице, получает хранилище Redux и роутер.

import { StrictMode } from "react"; // StrictMode — режим проверок React (только в разработке)
import { createRoot } from "react-dom/client"; // createRoot — создаёт корень React-приложения
import { Provider } from "react-redux"; // Provider — раздаёт хранилище Redux всем компонентам
import { BrowserRouter } from "react-router-dom"; // BrowserRouter — включает маршрутизацию через адресную строку
import { store } from "./store/index.js"; // созданное хранилище (слайсы auth и medicines)
import "./index.css"; // глобальные стили (подключаются просто импортом файла)
import App from "./App.jsx"; // корневой компонент приложения

createRoot(document.getElementById("root")).render(
  // находим <div id="root"> из index.html и рендерим в него
  <StrictMode>
    {/* Provider даёт ВСЕМ вложенным компонентам доступ к хранилищу (useSelector, useDispatch) */}
    <Provider store={store}>
      {/* BrowserRouter даёт ВСЕМ вложенным компонентам доступ к Routes, Link, useNavigate */}
      <BrowserRouter>
        {/* корневой компонент: навигация + маршруты + окно загрузки */}
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
