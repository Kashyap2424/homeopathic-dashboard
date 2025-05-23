const environment = {
  local: {
    API_URL: "http://localhost:8000", // local env URL
    WEB_SOCKET_URL: "ws://localhost:8000",
  },
  dev: {
    API_URL: "https://botox-injection-assistant.onrender.com", // dev env URL
    WEB_SOCKET_URL: "wss://botox-injection-assistant.onrender.com:8000",
  },
  production: {
    API_URL: "https://juneplex.com/api", // << updated production URL
    WEB_SOCKET_URL: "wss://juneplex.com", // << secure WebSocket URL
  },
};

// const config = environment[process.env.REACT_APP_STAGE] || environment.production;
const config = environment.production;
export default config;
