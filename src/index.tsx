import "./index.css";
import React from "react";
import { render } from "react-dom";
import { App } from "./App";
import { TempoDevtools } from "tempo-devtools";
import { BrowserRouter } from "react-router-dom";

// Initialize Tempo Devtools
TempoDevtools.init();

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root"),
);
