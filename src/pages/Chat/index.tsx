import { useContext, useEffect } from "react";
import { AppContext } from "../../App";

const Chat = () => {
  const { wss, authUser } = useContext(AppContext);

  useEffect(() => {
    console.log(wss);
    // if (wss) {
    //   wss.send(JSON.stringify({ action: 'auth', data: { user: { ...authUser } } }));
    // }
  }, [wss, authUser]);

  const handleConnection = () => {};

  return (
    <div>
      <div>
        <div>
          <button onClick={handleConnection}>Connect WS</button>
        </div>
        <div>
          <h1>Create Private Conversation</h1>
          <input type="text" />
          <button type="button">Create</button>
        </div>
        <div>
          <h1>Chat Box</h1>
          <div></div>
          <div>
            <input type="text" />
            <button type="button">Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
