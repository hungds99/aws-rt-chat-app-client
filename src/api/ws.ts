export const WSServices = {
  auth: (ws: WebSocket, user: any): any => {
    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          action: "auth",
          data: {
            userId: user.id,
          },
        }),
      );
    };
  },
  subscribeConnection: (ws: WebSocket): any => {
    console.log("subscribeConnection: ", ws);
    ws.addEventListener("open", (event) => {
      console.log("Connection open: ", event);
      // ws.send('Hello Server!');
    });
  },
  createRoom: (ws: WebSocket, userId: any, members: any): any => {
    ws.send(
      JSON.stringify({
        action: "createRoom",
        data: {
          userId: userId,
          memberIds: [...members],
        },
      }),
    );
  },
  subscribeNewRoom: (ws: WebSocket, cb: any): any => {
    ws.onmessage = (event) => {
      console.log("subscribeNewRoom: ", event);
      const response = JSON.parse(event.data);
      if (response?.data?.status === "ROOM_CREATED") {
        const room = response?.data?.data;
        cb(room);
      }
    };
  },
  createMessage: (
    ws: WebSocket,
    roomId: any,
    senderId: string,
    message: any,
  ): any => {
    ws.send(
      JSON.stringify({
        action: "createMessage",
        data: {
          roomId: roomId,
          userId: senderId,
          content: message,
        },
      }),
    );
  },
  subscribeNewMessage: (ws: WebSocket, cb: any): any => {
    ws.onmessage = (event) => {
      console.log("subscribeNewMessage: ", event);
      const response = JSON.parse(event.data);
      console.log("subscribeNewMessage: ", response);

      if (
        response?.data?.status === "MESSAGE_CREATED" ||
        response?.status === "MESSAGE_RECEIVED"
      ) {
        const message = response?.data?.data || response?.data;
        cb(message);
      }
    };
  },
};
