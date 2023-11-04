import { useContext, useState } from 'react';
import { wsMessage } from '../../api/websocket/message';
import { AuthContext } from '../../providers/auth';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import './style.css';

const Composer = ({ roomId }) => {
  const { user } = useContext(AuthContext);

  const [message, setMessage] = useState('');

  const handleMessageChange = (e: any) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (message && user.id && roomId) {
      wsMessage.createMessage(roomId, user?.id, message);
      setMessage('');
    }
  };

  return (
    <div className='message-composer'>
      <Input
        value={message}
        type='text'
        placeholder='Type a message...'
        onChange={handleMessageChange}
      />
      <Button onClick={handleSendMessage}>Send</Button>
    </div>
  );
};

export default Composer;
