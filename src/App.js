import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import GlobalStyles from "./GlobalStyles"
import Register from "./Pages/Register";

export default function App() {
	return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={< Login />} />
        <Route path="/register" element={< Register />} />
      </Routes>
      < GlobalStyles />
    </BrowserRouter>
  );
}
