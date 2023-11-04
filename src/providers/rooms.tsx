import { createContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { RoomServices } from '../api/services/room';
import { Room } from '../shared/interface/room';

interface RoomContextProps {
  room: Room | null;
}

export const RoomContext = createContext<RoomContextProps>(null);

export const RoomProvider = ({ children }: any) => {
  const [room, setRoom] = useState<Room | null>(null);

  const { roomId } = useParams();

  const getRoom = async (id: string) => {
    const room = await RoomServices.getById(id);
    setRoom(room);
  };

  useEffect(() => {
    if (roomId && roomId !== room?.id) {
      getRoom(roomId);
    }
  }, [roomId]);

  return (
    <RoomContext.Provider value={{ room }}>{children}</RoomContext.Provider>
  );
};
