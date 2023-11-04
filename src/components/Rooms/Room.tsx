import clsx from 'clsx';
import { useNavigate, useParams } from 'react-router-dom';

const Room = ({ room }) => {
  const navigate = useNavigate();

  const { roomId } = useParams();

  const handleRoomSelect = (id: string) => {
    id && navigate(`/conversations/${id}`);
  };

  return (
    <div
      className={clsx('room-item', {
        'room-item--active': room.id === roomId
      })}
      onClick={() => handleRoomSelect(room.id)}
    >
      <div className='room-item__avatar'>
        <img
          width={50}
          height={50}
          src='https://picsum.photos/200'
          alt='avatar'
        />
      </div>
      <div className='room-item__info'>
        <div className='room-item__info__name'>Room name</div>
        <div className='room-item__info__last-message'>
          {room.lastMessage?.content ? room.lastMessage?.content : 'No message'}
        </div>
      </div>
    </div>
  );
};

Room.propTypes = {};

export default Room;
