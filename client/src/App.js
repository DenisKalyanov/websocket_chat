import "./App.css";
import { useState } from "react";
import useConnection from "./hooks/useConnection.tsx";


function App() {
  //=========================================
  // State
  //=========================================
  const [value, setValue] = useState({ name: "", message: "" });

  //=========================================
  // Custom Hooks
  //=========================================
  const [messages, wsSend] = useConnection();

  const onChangeHandler = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const onSmbHandler = (e) => {
    e.preventDefault();
    setValue({ ...value, message: "" });
    wsSend(value);
  };

  return (
    <div className="App">
      <form onSubmit={onSmbHandler}>
        <label>
          Enter your name:
          <input
            type="text"
            value={value.name}
            name="name"
            onChange={onChangeHandler}
          />
        </label>
        <br />
        <label>
          Enter your message:
          <textarea
            type="text"
            value={value.message}
            name="message"
            onChange={onChangeHandler}
          />
        </label>
        <button type="submit">SEND MESSAGE</button>
      </form>
      <div>
        {messages.map((item, index) =>
          <div key={item.message + index}>
            <p>{item.name}</p>
            <span>{item.message}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
