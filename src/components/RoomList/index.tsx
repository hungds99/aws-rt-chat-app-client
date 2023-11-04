import { useEffect, useState } from 'react';
import { RoomServices } from '../../api/services/room';
import Room from './Room';
import './style.css';

const RoomList = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    (async () => {
      const rooms = await RoomServices.list();
      setRooms(rooms);
    })();
  }, []);

  return (
    <div className='room-list'>
      {rooms.length > 0 ? (
        rooms.map((room, index) => {
          return <Room key={index} room={room} />;
        })
      ) : (
        <div className='room-list__empty'>No rooms</div>
      )}
    </div>
  );
};

export default RoomList;
