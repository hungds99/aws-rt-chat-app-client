import { useEffect, useState } from "react";
import { RoomServices } from "../../api/room";
import { WSServices } from "../../api/ws";

export default function Rooms() {
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
    WSServices.createRoom(["76d03424-0c89-491f-b208-5f2c688b6b40"]);
  };

  // Listen to new room
  const subscribeNewRoom = () => {
    WSServices.subscribeNewRoom((room: any) => {
      console.log("New room", room);
      setRooms((rooms) => [...rooms, room]);
    });
  };

  useEffect(() => {
    console.log("Rooms");
    getRooms();
    subscribeNewRoom();
  }, []);

  return (
    <div className="flex gap-2">
      <div className="bg-slate-200">
        <div>
          <input className="border" type="text" />
          <button className="bg-blue-200" onClick={createRoom}>
            Create
          </button>
        </div>
        <div>
          {rooms.map((room) => {
            return <div onClick={() => getRoom(room.id)}>{room.id}</div>;
          })}
        </div>
      </div>
      <div>
        {room && (
          <div>
            <div>
              <div>{room.id}</div>
              <div>{room.name}</div>
              <div>{room.description}</div>
              <div>{room.createdAt}</div>
              <div>{room.updatedAt}</div>
            </div>
            <div className="flex gap-1 flex-col">
              {room.messages.map((message: any) => {
                return (
                  <div className="bg-green-200">
                    <div>{message.id}</div>
                    <div>{message.content}</div>
                    <div>{message.createdAt}</div>
                    <div>{message.updatedAt}</div>
                  </div>
                );
              })}
            </div>
            <div className="mt-5 mb-5">
              <input className="border" type="text" />
              <button className="bg-blue-200">Send</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
