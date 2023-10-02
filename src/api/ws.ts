import { ws } from "../App";

export const WSServices = {
  auth: (user: any): any => {
    ws.send(
      JSON.stringify({
        action: "auth",
        data: {
          id: "ddd2030e-d100-456b-bc8b-83d4e42d6808",
        },
      }),
    );
  },
  subscribeConnection: (): any => {
    // ws.addEventListener('message', (event) => {
    //   console.log('one connection open', event);
    // });
  },
  createRoom: (members: any): any => {
    console.log("subscribeConnection: ", ws);
    ws.send(
      JSON.stringify({
        action: "createRoom",
        room: {
          userId: "ddd2030e-d100-456b-bc8b-83d4e42d6808",
          members: ["ddd2030e-d100-456b-bc8b-83d4e42d6808", ...members],
        },
      }),
    );
  },
  subscribeNewRoom: (cb: any): any => {
    // Listen open connection
    console.log("Connection Event");
    ws.addEventListener("open", (event) => {
      console.log("event", event);
    });

    // Listen message from server
    console.log("Message Event");
    ws.addEventListener("message", (event) => {
      console.log("event", event);
      const data = JSON.parse(event.data);
      const room = data.data;
      cb(room);
    });
  },
};
