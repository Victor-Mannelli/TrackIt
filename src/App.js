import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import GlobalStyles from "./GlobalStyles"
import Register from "./Pages/Register";
import Habits from "./Pages/Habits Page/Habits";

export default function App() {
	return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={< Login />} />
        <Route path="/register" element={< Register />} />
        <Route path="/habits" element={< Habits />} />
      </Routes>
      < GlobalStyles />
    </BrowserRouter>
  );
}
