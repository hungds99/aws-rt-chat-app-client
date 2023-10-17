import { useEffect, useState } from 'react';
import { RoomServices } from '../../api/services/room';
import { wsMessage } from '../../api/websocket/message';
import { wsRoom } from '../../api/websocket/room';

export default function Rooms() {
  const [members, setMembers] = useState<any[]>([]);

  const [rooms, setRooms] = useState<any[]>([]);
  const [room, setRoom] = useState<any>(null);

  const getRooms = async () => {
    const rooms = await RoomServices.list();
    setRooms(rooms);
  };

  const getRoom = async (id: string) => {
    const room = await RoomServices.getById(id);
    setRoom(room);
  };

  const createRoom = async () => {
    wsRoom.createRoom('authUser.id', members);
  };

  // Listen to new room
  const subscribeNewRoom = () => {
    wsRoom.subscribeNewRoom((room: any) => {
      setRooms((rooms) => [...rooms, room]);
    });

    wsMessage.subscribeNewMessage((message: any) => {
      setRoom((room: any) => {
        return {
          ...room,
          messages: [...room.messages, message]
        };
      });
    });
  };

  useEffect(() => {
    getRooms();
    subscribeNewRoom();
  }, []);

  const handleChangeInput = (e: any) => {
    setMembers([e.target.value]);
  };

  const handleSendMessage = () => {
    wsMessage.createMessage(room.id, ' authUser.id', 'Hello from client');
  };

  return (
    <div className='flex gap-2'>
      <div className='bg-slate-200'>
        <div>
          <input className='border' type='text' onChange={handleChangeInput} />
          <button className='bg-blue-200' onClick={createRoom}>
            Create
          </button>
        </div>
        <div>
          {rooms.length > 0 &&
            rooms.map((room) => {
              return (
                room && (
                  <div
                    className='cursor-pointer'
                    onClick={() => getRoom(room.id)}
                  >
                    {room.id}
                  </div>
                )
              );
            })}
        </div>
      </div>
      <div>
        {room && (
          <div>
            <div>
              <div>Room Id: {room.id}</div>
            </div>
            <div>
              <div>Message Lists</div>
              <div className='flex gap-1 flex-col'>
                {room.messages.map((message: any) => {
                  return (
                    <div className='bg-green-200'>
                      <div>{message.id}</div>
                      <div>{message.content}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className='mt-5 mb-5'>
              <input className='border' type='text' />
              <button className='bg-blue-200' onClick={handleSendMessage}>
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
