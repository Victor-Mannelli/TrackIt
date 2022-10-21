import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import UserContext from "./CreateContext";
import Login from "./Pages/Login";
import GlobalStyles from "./GlobalStyles";
import Register from "./Pages/Register";
import Habits from "./Pages/Habits Page/Habits";
import Today from "./Pages/Today Page/Today";
import { ToastContainer } from "react-toastify";

export default function App() {
	const [loginInfo, setLoginInfo] = useState("");

	return (
		<UserContext.Provider value={{ loginInfo, setLoginInfo }}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/today" element={<Today />} />
					<Route path="/habits" element={<Habits />} />
				</Routes>
				<ToastContainer />
				<GlobalStyles />
			</BrowserRouter>
		</UserContext.Provider>
	);
}
