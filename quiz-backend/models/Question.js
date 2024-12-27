// Импортируем mongoose для работы с MongoDB
const mongoose = require('mongoose');

// Определяем схему для модели Question
const questionSchema = new mongoose.Schema({
  // Текст вопроса (строка)
  text: String,
  
  // Тип вопроса (строка, ограниченная списком возможных значений)
  type: {
    type: String,
    enum: ['single', 'multiple', 'input'], // Возможные типы: одиночный выбор, множественный выбор, ввод текста
    default: 'single', // По умолчанию тип вопроса - одиночный выбор
  },
  
  // Массив вариантов ответа (строки)
  options: [String],
  
  // Правильный ответ (может быть строкой или массивом, в зависимости от типа вопроса)
  answer: mongoose.Schema.Types.Mixed,
});

// Экспортируем модель Question, которая будет использоваться для взаимодействия с базой данных
module.exports = mongoose.model('Question', questionSchema);