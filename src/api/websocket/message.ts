import wsClient from '../ws';

export const wsMessage = {
  createMessage: (roomId: any, senderId: string, message: any): any => {
    wsClient.send(
      JSON.stringify({
        action: 'createMessage',
        data: {
          roomId: roomId,
          userId: senderId,
          content: message
        }
      })
    );
  },
  subscribeNewMessage: (cb: any): any => {
    wsClient.onmessage = (event) => {
      const response = JSON.parse(event.data);
      if (
        response?.data?.status === 'MESSAGE_CREATED' ||
        response?.status === 'MESSAGE_RECEIVED'
      ) {
        const message = response?.data?.data || response?.data;
        cb(message);
      }
    };
  }
};
