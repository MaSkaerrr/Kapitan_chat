import React from 'react';

export default function Main() {
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  return (
    <div className="main-container" style={{ padding: "20px" }}>
      {isAuthenticated ? (
        <>
          <h1>👋 Вітаємо у чаті!</h1>
          <p>Тут буде інтерфейс месенджера. !!!! Component — Messager</p>
        </>
      ) : (
        <>
          <h1>Ви не авторизовані</h1>
          <p>Будь ласка, увійдіть, щоб продовжити. !!!! Component — Introduction</p>
        </>
      )}
    </div>
  );
}
