import ReactDOM from "react-dom/client";

import App from "./App";

import axios from "axios";

const promise = axios.get("http://localhost:3001/notes");

promise.then((response) => {
  console.log(response);
});

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
