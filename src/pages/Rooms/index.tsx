import { useContext, useEffect, useState } from 'react';
import { RoomServices } from '../../api/room';
import { WSServices } from '../../api/ws';
import { AppContext } from '../../App';

export default function Rooms() {
  const { authUser, ws } = useContext<any>(AppContext);

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
    WSServices.createRoom(ws, authUser.id, members);
  };

  // Listen to new room
  const subscribeNewRoom = () => {
    WSServices.subscribeNewRoom(ws, (room: any) => {
      console.log('New room', room);
      setRooms((rooms) => [...rooms, room]);
    });

    WSServices.subscribeNewMessage(ws, (message: any) => {
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
    WSServices.createMessage(ws, room.id, authUser.id, 'Hello from client');
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
