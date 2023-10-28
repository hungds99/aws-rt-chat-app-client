import clsx from 'clsx';
import { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { RoomServices } from '../../../api/services/room';
import { wsMessage } from '../../../api/websocket/message';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { AuthContext } from '../../../providers/auth';
import './style.css';

const Messages = () => {
  let { roomId } = useParams();
  const { user } = useContext(AuthContext);

  const [room, setRoom] = useState({});
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getMessages = async (roomId: string) => {
    const { room, messages } = await RoomServices.getById(roomId);
    setMessages(messages);
    setRoom(room);
  };

  useEffect(() => {
    getMessages(roomId);
  }, [roomId]);

  const handleMessageChange = (e: any) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (message && user.id && roomId) {
      wsMessage.createMessage(roomId, user?.id, message);
    }
  };

  const getNewMessage = (message: any) => {
    setMessages((messages) => [...messages, message]);
    setMessage('');
    scrollToBottom();
  };

  useEffect(() => {
    wsMessage.subscribeNewMessage(getNewMessage);
    scrollToBottom();
  }, []);

  return (
    <>
      <div className='conversation-layout__right-header'>
        <div className='conversation-layout__right-header__avatar'>
          <img
            width={50}
            height={50}
            src='https://picsum.photos/200'
            alt='avatar'
            className='conversation-layout__right-header__avatar__image'
          />
        </div>
        <div className='conversation-layout__right-header__info'>
          <div className='conversation-layout__right-header__info__name'>
            Room name
          </div>
          <div className='conversation-layout__right-header__info__last-active'>
            Active 1 hour ago
          </div>
        </div>
      </div>
      <div className='conversation-layout_right-content'>
        <div className='message-container'>
          {messages.map((message, index) => (
            <div
              className={clsx('message-item', {
                'message--owner': message.userId === user?.id
              })}
              key={index}
            >
              <div className='message__avatar'>
                <img
                  width={50}
                  height={50}
                  src='https://picsum.photos/200'
                  alt='avatar'
                  className='message__avatar__image'
                />
              </div>
              <div className='message__content'>{message.content}</div>
            </div>
          ))}
          <div ref={messagesEndRef}></div>
        </div>
      </div>
      <div className='conversation-layout_right-footer'>
        <Input
          value={message}
          type='text'
          placeholder='Type a message...'
          onChange={handleMessageChange}
        />
        <Button onClick={handleSendMessage}>Send</Button>
      </div>
    </>
  );
};

export default Messages;
