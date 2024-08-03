# Веб-приложение Kamamoto с коллекцией японской керамики

## Описание проекта

Сайт с частной коллекцией японской керамики, на котором:

- удобно визуализирована в виде каталога сама коллекция
- содержится информация о предметах и мастерах, их изготовивших
- есть информация о выставках и мероприятиях, на которых экспонировались предметы из коллекции

## Используемые инструменты и библиотеки

- `react` - базовая библиотека для реализации SPA
- `react-router-dom` для реализации роутинга и рендера уникальной информации по определённым роутам
- `redux` для работы с состоянием переменных
- `react-image-gallery` для создания слайдеров
- `html-react-parser` для парсинга описаний к экспонатам (которые хранятся в текстовом виде) в html-разметку
- `react-helmet-async` для работы с заголовками страниц
- `emailjs` для отправки сообщений из раздела "контакты"
- `vite` для сборки проекта

## Применяемые методологии

- BEM
- DRY
- Desktop-first

## Что нужно доделать / можно улучшить

- сделать редирект на 404 страницу, если по роуту нет контента
- добавить поиск по коллекции
