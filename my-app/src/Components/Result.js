import React from 'react';
import { Alert, Button } from 'react-bootstrap'; // Импортируем компоненты Bootstrap

// Компонент Result для отображения результатов
const Result = ({ score, totalQuestions, onRestart }) => {
  return (
    <div>
      <h2>Результаты</h2> {/* Заголовок */}
      <Alert variant="success">
        Вы ответили правильно на {score} из {totalQuestions} вопросов. {/* Текст результата */}
      </Alert>
      <Button variant="primary" onClick={onRestart} className="restart-button">
        Начать заново
      </Button> {/* Кнопка для перезапуска викторины */}
    </div>
  );
};

export default Result; // Экспортируем компонент Result