import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "./context/context";
import { SpeechProvider } from "@speechly/react-client";

ReactDOM.render(
  <SpeechProvider appId="b58b9c57-b9dd-48f1-b5bb-6706fcd3b501" language = "en-US">
    <Provider>
    <App />
  </Provider>
  </SpeechProvider>
  ,
  document.getElementById("root")
);
