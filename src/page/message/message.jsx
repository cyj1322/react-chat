import React, { useEffect, useState } from 'react';
import style from './message.module.css';

const Message = ({ socket }) => {
  const [state, setState] = useState({ message: '', name: '' });
  const [chat, setChat] = useState([]);

  const onSocket = ({ name, message }) => {
    console.log(name, message);
    setChat((chat) => {
      return [...chat, { name, message }];
    });
  };

  useEffect(() => {
    socket.on('msgToClient', onSocket);
  }, []);

  const onTextChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onMessageSubmit = (e) => {
    e.preventDefault();
    const { name, message } = state;
    socket.emit('msgToServer', { name, message });
    setState({ message: '', name });
  };

  const renderChat = () => {
    return chat.map(({ name, message }, index) => (
      <div key={index}>
        <h3>
          {name}:<span>{message}</span>
        </h3>
      </div>
    ));
  };

  return (
    <div className="card">
      <form onSubmit={onMessageSubmit}>
        <h1>Message</h1>
        <div className="name-field">
          name
          <input
            name="name"
            onChange={(e) => onTextChange(e)}
            value={state.name}
            label="Name"
          />
        </div>
        <div>
          massage
          <input
            name="message"
            onChange={(e) => onTextChange(e)}
            value={state.message}
            id="outlined-multiline-static"
            variant="outlined"
            label="Message"
          />
        </div>
        <button>Send Message</button>
      </form>
      <div className="render-chat">
        <h1>Chat log</h1>
        {renderChat()}
      </div>
    </div>
  );
};

export default Message;
