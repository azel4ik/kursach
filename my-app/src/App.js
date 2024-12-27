import React from 'react';
import Quiz from './Components/Quiz'; // Импортируем компонент Quiz
import 'bootstrap/dist/css/bootstrap.min.css'; // Импортируем стили Bootstrap
import './App.css'; // Импортируем стили приложения

// Основной компонент приложения
function App() {
  return (
    <div className="App">
      <div className="header">
        <h1>FilmQuiz</h1> {/* Заголовок приложения */}
      </div>
      <div className="quiz-container">
        <Quiz /> {/* Компонент викторины */}
      </div>
    </div>
  );
}

export default App; // Экспортируем компонент App