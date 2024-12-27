import React, { useState, useEffect } from 'react';
import Question from './Question'; // Импортируем компонент Question
import Result from './Result'; // Импортируем компонент Result
import { Container, Row, Col, Button } from 'react-bootstrap'; // Импортируем компоненты Bootstrap
import axios from 'axios'; // Импортируем библиотеку для HTTP-запросов

// Основной компонент Quiz
const Quiz = () => {
  const [questions, setQuestions] = useState([]); // Состояние для хранения вопросов
  const [currentQuestion, setCurrentQuestion] = useState(0); // Состояние для текущего вопроса
  const [score, setScore] = useState(0); // Состояние для итогового счета
  const [showResult, setShowResult] = useState(false); // Состояние для отображения результата
  const [loading, setLoading] = useState(true); // Состояние для индикации загрузки
  const [selectedOptions, setSelectedOptions] = useState([]); // Состояние для выбранных вариантов ответа
  const [inputAnswers, setInputAnswers] = useState([]); // Состояние для ответов в поле ввода
  const [started, setStarted] = useState(false); // Состояние для начала викторины
  const [history, setHistory] = useState([]); // Состояние для хранения истории вопросов
  const [userAnswers, setUserAnswers] = useState(Array(questions.length).fill(null)); // Состояние для хранения ответов пользователя
  const [progress, setProgress] = useState(0); // Состояние для прогресса

  // Загрузка вопросов при монтировании компонента
  useEffect(() => {
    axios.get('http://localhost:5000/api/quiz/questions') // Запрос на получение вопросов
      .then(response => {
        console.log('Questions loaded:', response.data);
        setQuestions(response.data); // Сохраняем вопросы в состояние
        setLoading(false); // Убираем индикатор загрузки
      })
      .catch(error => {
        console.error('Error fetching questions:', error);
        setLoading(false); // Убираем индикатор загрузки даже при ошибке
      });
  }, []);

  // Обработчик ответа на вопрос
  const handleAnswer = (answer) => {
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestion] = answer; // Сохраняем ответ для текущего вопроса
    setUserAnswers(newUserAnswers);

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setHistory([...history, currentQuestion]); // Добавляем текущий вопрос в историю
      setCurrentQuestion(nextQuestion); // Переходим к следующему вопросу
      setProgress((nextQuestion / questions.length) * 100); // Обновляем прогресс
    } else {
      // Если это последний вопрос, сразу отправляем ответы на сервер
      setProgress(100);
      handleSubmit();
    }
  };

  // Обработчик кнопки "Назад"
  const handleBack = () => {
    if (history.length > 0) {
      const previousQuestion = history[history.length - 1];
      setHistory(history.slice(0, history.length - 1)); // Удаляем последний вопрос из истории
      setCurrentQuestion(previousQuestion); // Возвращаемся к предыдущему вопросу
      setProgress((previousQuestion / questions.length) * 100); // Обновляем прогресс
    }
  };

  // Обработчик отправки ответов на сервер
  const handleSubmit = () => {
    // Отправляем ответы на сервер
    axios.post('http://localhost:5000/api/quiz/submit', { answers: userAnswers })
      .then(response => {
        setScore(response.data.score); // Устанавливаем итоговый счет
        setShowResult(true); // Показываем результат
      })
      .catch(error => {
        console.error('Error submitting answers:', error);
      });
  };

  // Обработчик кнопки "Начать заново"
  const handleRestart = () => {
    setCurrentQuestion(0); // Сбрасываем текущий вопрос
    setScore(0); // Сбрасываем итоговый счет
    setShowResult(false); // Скрываем результат
    setSelectedOptions([]); // Сбрасываем выбранные ответы
    setInputAnswers([]); // Сбрасываем введенные ответы
    setHistory([]); // Сбрасываем историю вопросов
    setUserAnswers(Array(questions.length).fill(null)); // Сбрасываем ответы пользователя
    setProgress(0); // Сбрасываем прогресс
  };

  // Если данные загружаются, показываем сообщение "Loading..."
  if (loading) {
    return <div>Loading...</div>;
  }

  // Если викторина еще не начата, показываем кнопку "Начать"
  if (!started) {
    return (
      <div className="start-button">
        <button onClick={() => setStarted(true)}>Начать</button>
      </div>
    );
  }

  return (
    <Container>
      <Row>
        <Col>
          {/* Прогресс-бар */}
          {!showResult && (
          <div className="progress-bar-container">
             <div className="progress-bar" style={{ width: `${progress}%` }}></div>
          </div>
          )}
          <div className={`progress-text ${showResult ? 'fade-out' : ''}`}>
            Вопрос {currentQuestion + 1} из {questions.length} {/* Текст прогресса */}
          </div>
          {showResult ? (
            <Result
              score={score} // Передаем итоговый счет
              totalQuestions={questions.length} // Передаем общее количество вопросов
              onRestart={handleRestart} // Передаем функцию для перезапуска
            />
          ) : (
            <>
              <Question
                question={questions[currentQuestion]} // Передаем текущий вопрос
                handleAnswer={handleAnswer} // Передаем функцию для обработки ответа
                setSelectedOptions={(options) => setSelectedOptions([...selectedOptions, options])} // Передаем функцию для сохранения выбранных вариантов
                setInputAnswers={(answer) => setInputAnswers([...inputAnswers, answer])} // Передаем функцию для сохранения ответа в поле ввода
              />
              {currentQuestion > 0 && !showResult && (
                <Button variant="secondary" onClick={handleBack} className="back-button">
                  Назад
                </Button>
              )}
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Quiz; // Экспортируем компонент Quiz