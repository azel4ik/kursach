// Импортируем модель Question, которая описывает структуру данных для вопросов
const Question = require('../models/Question');

// Экспортируем функцию getQuestions, которая обрабатывает запрос на получение всех вопросов
exports.getQuestions = async (req, res) => {
  try {
    // Используем метод find модели Question для получения всех вопросов из базы данных
    const questions = await Question.find();
    
    // Возвращаем список вопросов в формате JSON
    res.json(questions);
  } catch (error) {
    // Если произошла ошибка, возвращаем статус 500 и сообщение об ошибке
    res.status(500).json({ message: error.message });
  }
};

// Экспортируем функцию submitAnswers, которая обрабатывает запрос на проверку ответов пользователя
exports.submitAnswers = async (req, res) => {
  // Получаем массив ответов пользователя из тела запроса
  const userAnswers = req.body.answers;

  try {
    // Получаем все вопросы из базы данных
    const questions = await Question.find();
    
    // Инициализируем переменную для подсчета правильных ответов
    let score = 0;

    // Проходим по каждому вопросу и сравниваем ответы пользователя с правильными ответами
    questions.forEach((question, index) => {
      // Получаем ответ пользователя и правильный ответ для текущего вопроса
      const userAnswer = userAnswers[index];
      const correctAnswer = question.answer;

      // Проверяем тип вопроса и сравниваем ответы
      if (question.type === 'single' || question.type === 'multiple') {
        // Если ответы являются массивами, сравниваем их после сортировки
        if (Array.isArray(userAnswer) && Array.isArray(correctAnswer)) {
          if (userAnswer.sort().join(',') === correctAnswer.sort().join(',')) {
            score++; // Увеличиваем счетчик, если ответы совпадают
          }
        } else if (userAnswer === correctAnswer) {
          // Если ответы являются строками, сравниваем их напрямую
          score++;
        }
      } else if (question.type === 'input') {
        // Для вопросов с вводом ответа сравниваем строки без учета регистра
        if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
          score++;
        }
      }
    });

    // Возвращаем итоговый счет и общее количество вопросов
    res.json({ score, totalQuestions: questions.length });
  } catch (error) {
    // Если произошла ошибка, возвращаем статус 500 и сообщение об ошибке
    res.status(500).json({ message: error.message });
  }
};