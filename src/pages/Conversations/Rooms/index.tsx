import clsx from "clsx";
import "./style.css";

const Rooms = () => {
  return (
    <div className="room-container">
      {Array.from({ length: 10 }).map((_, index) => (
        <div
          key={index}
          className={clsx("room-item", {
            "room-item--active": index === 0,
          })}
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
