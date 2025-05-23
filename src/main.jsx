// React Import
import React from "react";

// React DOM Import
import ReactDOM from "react-dom/client";

// Redux Import
import { Provider } from "react-redux";

// React Router DOM Import
import { BrowserRouter as Router } from "react-router-dom";

// Context Import
import ThemeProvider from "./utils/ThemeContext";

// App Import
import App from "./App";

// Store Import
import store from "./redux/index";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </Router>
    </Provider>
  </React.StrictMode>
);
