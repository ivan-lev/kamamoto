# Kamamoto - a web app for presenting private collection of Japanese ceramics

## Project description

Сайт с частной коллекцией японской керамики, на котором:

- удобно визуализирована в виде каталога сама коллекция
- содержится информация о предметах и мастерах, их изготовивших
- есть информация о выставках и мероприятиях, на которых экспонировались предметы из коллекции

## Frontend

#### Tools and packages

- `react 19` - базовая библиотека для реализации SPA
- `react-router-dom` для реализации роутинга
- `redux` для хранения состояния переменных и работы с ними
- `swiper` для создания слайдеров
- `html-react-parser` для парсинга html-информацииб хранящейся в бд
- `emailjs` для отправки сообщений из раздела "контакты"
- `vite` для сборки проекта
- `motion` - для анимирования компонентов
- `docker` - to automate the deployment of application 

## Backend

#### Tools and packages

- [mongodb](https://www.mongodb.com/) - database used in project
- [express](https://www.npmjs.com/package/express) - framework to work with Node.js
- [mongoose](https://www.npmjs.com/package/mongoose) - tool to work with the MongoDB
- 'winston' - for logging everything

#### Directories

`/routes` — folder with routing logic
`/controllers` — folder with all controllers   
`/models` — folder with files describing MongoDB schemes and models 
`/errors` - error handling logic placed here
`/middlewares` - stores all intermediate processing functions

## Useful npm scripts

`npm run build` — make a production build of project
`npm run dev` — run project in development mode

## Methodologies

- BEM
- DRY
- Desktop-first

## Vendor files

- icons from [Jtb Variety Thin Icons Collection](https://www.svgrepo.com/collection/jtb-variety-thin-icons/) set
- [Raleway](https://fonts.google.com/specimen/Raleway) fonts in Fontsource package