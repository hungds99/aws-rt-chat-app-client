import wsClient from '../ws';

export const wsAuth = {
  auth: (user: any): any => {
    wsClient.onopen = () => {
      wsClient.send(
        JSON.stringify({
          action: 'auth',
          data: {
            userId: user.id
          }
        })
      );
    };
  }
};
