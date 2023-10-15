import wsClient from '../ws';

export const wsRoom = {
  createRoom: (userId: any, members: any): any => {
    wsClient.send(
      JSON.stringify({
        action: 'createRoom',
        data: {
          userId: userId,
          memberIds: [...members]
        }
      })
    );
  },
  subscribeNewRoom: (cb: any): any => {
    wsClient.onmessage = (event) => {
      const response = JSON.parse(event.data);
      if (response?.data?.status === 'ROOM_CREATED') {
        const room = response?.data?.data;
        cb(room);
      }
    };
  }
};
