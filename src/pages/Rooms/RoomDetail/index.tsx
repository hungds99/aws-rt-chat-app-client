import { useContext } from "react";
import Composer from "../../../components/Composer";
import MessageList from "../../../components/Messages";
import { RoomContext } from "../../../providers/rooms";
import "./style.css";

const RoomDetail = () => {
  const { room } = useContext(RoomContext);

  return (
    <>
      {room ? (
        <>
          <div className="room-detail__header">
            <div className="room-detail__avatar">
              <img
                width={50}
                height={50}
                src="https://picsum.photos/200"
                alt="avatar"
              />
            </div>
            <div className="room-detail__detail">
              <h3>{room?.name || "John Doe"}</h3>
              <p>{room?.avatar || "Active 1 hours ago"}</p>
            </div>
          </div>
          <div className="room-detail___content">
            <MessageList roomId={room.id} />
          </div>
          <div className="room-detail___footer">
            <Composer roomId={room.id} />
          </div>
        </>
      ) : (
        <div className="room-detail___empty">
          <h3>No room selected</h3>
          <p>Please select a room to start conversation</p>
        </div>
      )}
    </>
  );
};

export default RoomDetail;
