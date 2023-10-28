import clsx from "clsx";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RoomServices } from "../../../api/services/room";
import "./style.css";

const Rooms = () => {
  const navigate = useNavigate();

  const { roomId } = useParams();

  const [rooms, setRooms] = useState([]);

  const getRooms = async () => {
    const rooms = await RoomServices.list();
    setRooms(rooms);
  };

  useEffect(() => {
    getRooms();
  }, []);

  const handleRoomSelect = (id: string) => {
    id && navigate(`/conversations/${id}`);
  };

  return (
    <div className="room-container">
      {rooms.map((room, index) => (
        <div
          key={index}
          className={clsx("room-item", {
            "room-item--active": room.id === roomId,
          })}
          onClick={() => handleRoomSelect(room.id)}
        >
          <div className="room-item__avatar">
            <img
              width={50}
              height={50}
              src="https://picsum.photos/200"
              alt="avatar"
              className="room-item__avatar__image"
            />
          </div>
          <div className="room-item__info">
            <div className="room-item__info__name">Room name</div>
            <div className="room-item__info__last-message">Last message</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Rooms;
