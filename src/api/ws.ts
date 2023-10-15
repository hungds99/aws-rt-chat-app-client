const WS_URL = "ws://127.0.0.1:3001";

const wsClient: WebSocket | null = new WebSocket(WS_URL);

wsClient.onopen = () => {
  console.log("WebSocket Client Connected");
};

wsClient.onmessage = (message) => {
  console.log(message);
};

wsClient.onerror = function () {
  console.log("Connection Error");
};

wsClient.onclose = function () {
  console.log("echo-protocol Client Closed");
};

export default wsClient;
