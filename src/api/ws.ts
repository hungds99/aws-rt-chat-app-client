const WS_URL = 'ws://127.0.0.1:3001';

const wsClient: WebSocket | null = new WebSocket(WS_URL);

wsClient.onopen = (event) => {
  console.log('WebSocket Client Connected : ', wsClient, event);
};

wsClient.onmessage = (message) => {
  console.log('WebSocket Client Received Message : ', wsClient, message);
};

wsClient.onerror = (event) => {
  console.log('WebSocket Client Connection Error : ', wsClient, event);
};

wsClient.onclose = (event) => {
  console.log('WebSocket Client Connection Closed : ', wsClient, event);
};

export default wsClient;
