import React, { useState } from 'react';
const Faq= () => {
  const [activeIndex, setActiveIndex] = useState(null);//state который указывает какой индекс нажатый для показа ответа

  const faqs = [
    {
      question: "Что такое React?",
      answer: "React — это библиотека JavaScript для создания пользовательских интерфейсов."
    },
    {
      question: "Как установить React?",
      answer: "Вы можете установить React с помощью npm: npm install react react-dom."
    },
    {
      question: "Что такое компоненты в React?",
      answer: "Компоненты — это независимые и переиспользуемые части кода, которые описывают часть пользовательского интерфейса."
    },
    {
      question: "Что такое состояние в React?",
      answer: "Состояние — это объект, который определяет, как компонент должен вести себя и отображаться."
    },
    {
      question: "Как обрабатывать события в React?",
      answer: "Вы можете обрабатывать события, передавая обработчики событий в JSX, например: onClick={handleClick}."
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index); // если индекс совпадает с текущим, то сбросить индекс
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>Часто задаваемые вопросы</h1>
      {faqs.map((faq, index) => (
        <div key={index} style={{ marginBottom: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
          <div 
            onClick={() => toggleFAQ(index)} 
            style={{ padding: '10px', cursor: 'pointer', background: '#f1f1f1' }}
          >
            <h3>{faq.question}</h3>
          </div>
          {activeIndex === index && (
            <div style={{ padding: '10px' }}>
              <p>{faq.answer}</p>
            </div>
          )}
        </div> //общий контейнер для одного элемента содержащий div который показывает вопрос и div  которій будет появлятся если activeIndex===index 
      ))}
    </div>
  );
};

export default Faq;