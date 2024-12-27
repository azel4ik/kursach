// Импортируем express для создания маршрутов
const express = require('express');

// Создаем экземпляр маршрутизатора
const router = express.Router();

// Импортируем контроллеры для обработки запросов
const quizController = require('../controllers/quizController');

// Определяем маршрут для получения всех вопросов
router.get('/questions', quizController.getQuestions);

// Определяем маршрут для отправки ответов пользователя
router.post('/submit', quizController.submitAnswers);

// Экспортируем маршрутизатор, чтобы его можно было использовать в основном файле сервера
module.exports = router;