import { useContext, useEffect, useRef, useState } from "react";
import { RoomServices } from "../../api/services/room";
import { wsMessage } from "../../api/websocket/message";
import { AuthContext } from "../../providers/auth";
import Message from "./Message";
import "./style.css";

const MessageList = ({ roomId }) => {
  const { user } = useContext(AuthContext);

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  const [messages, setMessages] = useState([]);

  const getMessages = async (roomId: string) => {
    const { _room, messages } = await RoomServices.getById(roomId);
    setMessages(messages);
  };

  useEffect(() => {
    getMessages(roomId);
  }, [roomId]);

  const getNewMessage = (message: any) => {
    setMessages((messages) => [...messages, message]);
  };

  useEffect(() => {
    wsMessage.subscribeNewMessage(getNewMessage);
    scrollToBottom();
  }, []);

  return (
    <div className="message-list">
      {messages.map((message, index) => (
        <Message key={index} message={message} owner={user} />
      ))}
      <div ref={messagesEndRef}></div>
    </div>
  );
};

export default MessageList;
