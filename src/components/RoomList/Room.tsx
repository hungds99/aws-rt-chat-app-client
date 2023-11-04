import clsx from 'clsx';
import { useNavigate, useParams } from 'react-router-dom';

const Room = ({ room }) => {
  const navigate = useNavigate();

  const { roomId } = useParams();

  const handleRoomSelect = (id: string) => {
    id && navigate(`/rooms/${id}`);
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
        <div className='room-item__info__name'>John Doe</div>
        <div className='room-item__info__last-message'>
          <p>
            {room.lastMessage?.content
              ? room.lastMessage?.content
              : 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'}
          </p>
        </div>
      </div>
    </div>
  );
};

Room.propTypes = {};

export default Room;
