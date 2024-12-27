import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap'; // Импортируем компоненты Bootstrap

// Компонент Question
const Question = ({ question, handleAnswer, setSelectedOptions, setInputAnswers }) => {
  const [selectedOptions, setSelectedOptionsLocal] = useState([]); // Состояние для выбранных вариантов ответа
  const [inputAnswer, setInputAnswer] = useState(''); // Состояние для ответа в поле ввода

  // Обработчик выбора варианта ответа
  const handleOptionChange = (option) => {
    if (question.type === 'multiple') {
      // Если вопрос с множественным выбором
      if (selectedOptions.includes(option)) {
        // Если вариант уже выбран, удаляем его
        setSelectedOptionsLocal(selectedOptions.filter(item => item !== option));
      } else {
        // Если вариант не выбран, добавляем его
        setSelectedOptionsLocal([...selectedOptions, option]);
      }
    } else {
      // Если вопрос с одиночным выбором, передаем ответ родительскому компоненту
      handleAnswer(option);
    }
  };

  // Обработчик изменения текста в поле ввода
  const handleInputChange = (event) => {
    setInputAnswer(event.target.value); // Обновляем состояние с текстом ответа
  };

  // Обработчик отправки ответа
  const handleSubmit = () => {
    if (question.type === 'multiple') {
      // Если вопрос с множественным выбором, передаем массив выбранных вариантов
      handleAnswer(selectedOptions);
      setSelectedOptions(selectedOptions);
    } else if (question.type === 'input') {
      // Если вопрос с вводом текста, передаем текст ответа
      handleAnswer(inputAnswer);
      setInputAnswers(inputAnswer);
    }
  };

  // Если вопрос не загружен, показываем сообщение "Loading..."
  if (!question) {
    return <div>Loading...</div>;
  }

  return (
    <div className="question-container">
      <div className="question-text">{question.text}</div> {/* Текст вопроса */}
      {question.type === 'single' && (
        <div className="options-container">
          {/* Варианты ответа для вопроса с одиночным выбором */}
          {question.options.map((option, index) => (
            <Button
              key={index}
              variant="primary"
              onClick={() => handleOptionChange(option)}
              className="option-button single-option"
            >
              {option}
            </Button>
          ))}
        </div>
      )}
      {(question.type === 'multiple' || question.type === 'input') && (
        <div className="options-container">
          {/* Варианты ответа для вопроса с множественным выбором */}
          {question.type === 'multiple' && question.options.map((option, index) => (
            <Form.Check
              key={index}
              type="checkbox"
              label={option}
              onChange={() => handleOptionChange(option)}
              className="option-button multiple-option"
            />
          ))}
          {/* Поле ввода для вопроса с вводом текста */}
          {question.type === 'input' && (
            <Form.Control
              type="text"
              placeholder="Введите ответ"
              value={inputAnswer}
              onChange={handleInputChange}
              className="input-answer"
            />
          )}
          {/* Кнопка "Ответить" */}
          <Button variant="success" onClick={handleSubmit} className="submit-answer">
            Ответить
          </Button>
        </div>
      )}
    </div>
  );
};

export default Question; // Экспортируем компонент Question