import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ThemeProvider, createTheme } from "@mui/material/styles"; // 수정된 부분

const theme = createTheme({
  typography: {
    fontFamily: '"Noto Sans KR", serif',
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      {" "}
      {/* MuiThemeProvider -> ThemeProvider로 수정 */}
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
