import { useState, useEffect } from "react";

const wsConnection = new WebSocket("ws://localhost:5002");

const useConnection = () => {
  const [messages, setMessages] = useState([]);

  const wsSend = (data) => {
    const message = JSON.stringify(data);

    console.log(wsConnection);
    if (!wsConnection.readyState) {
      setTimeout(() => {
        wsSend(message);
      }, 100);
    } else {
      wsConnection.send(message);
    }
  };

  useEffect(() => {
    wsConnection.onopen = (e) => console.log(e);

    wsConnection.onerror = () => console.log("Ошибка");

    wsConnection.onmessage = function (event) {
      setMessages(JSON.parse(event.data));
    };

    return () => {
      wsConnection.onclose = function (event) {
        if (event.wasClean) {
          console.log("Соединение закрыто чисто");
        } else {
          console.log("Обрыв соединения");
        }
        console.log("Код: " + event.code + " причина: " + event.reason);
      };
    };
  }, []);

  return [messages, wsSend];
};

export default useConnection;
