// src/main.jsx — ТОЧКА ВХОДА приложения. Vite подключает этот файл из index.html.
// Здесь React "прикрепляется" к странице и оборачивается в роутер.

import { StrictMode } from 'react' // StrictMode — режим проверок React (только в разработке)
import { createRoot } from 'react-dom/client' // createRoot — создаёт корень React-приложения
import { BrowserRouter } from 'react-router-dom' // BrowserRouter — включает маршрутизацию через адресную строку
import './index.css' // глобальные стили (подключаются просто импортом файла)
import App from './App.jsx' // корневой компонент приложения

createRoot(document.getElementById('root')).render( // находим <div id="root"> из index.html и рендерим в него
  <StrictMode>
    {/* BrowserRouter даёт ВСЕМ вложенным компонентам доступ к Routes, Link, useNavigate */}
    <BrowserRouter>
      {/* корневой компонент: навигация + маршруты + state пользователя */}
      <App />
    </BrowserRouter>
  </StrictMode>,
)
