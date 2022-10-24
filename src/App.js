import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import UserContext from "./CreateContext";
import Login from "./Pages/Login";
import GlobalStyles from "./GlobalStyles";
import Register from "./Pages/Register";
import Habits from "./Pages/2 - Habits Page/Habits";
import Today from "./Pages/1 - Today Page/Today";
import History from "./Pages/3 - History Page/HistoryPage";
import { ToastContainer } from "react-toastify";

export default function App() {
	const [loginInfo, setLoginInfo] = useState(localStorage.getItem("userInfo") !== null ? JSON.parse(localStorage.getItem("userInfo")) : "");
	const [habitsList, setHabitsList] = useState([]);
	const [percentage, setPercentage] = useState(0);
	const [habitWasDeleted, setHabitWasDeleted] = useState(false)
	
	return (
		<UserContext.Provider
			value={{
				loginInfo,
				setLoginInfo,
				habitsList,
				setHabitsList,
				percentage,
				setPercentage,
				habitWasDeleted,
				setHabitWasDeleted
			}}
		>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/today" element={<Today />} />
					<Route path="/habits" element={<Habits />} />
					<Route path="/history" element={<History />} />
				</Routes>
				<ToastContainer />
				<GlobalStyles />
			</BrowserRouter>
		</UserContext.Provider>
	);
}
