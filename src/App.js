import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import UserContext from "./CreateContext";
import Login from "./Pages/Login";
import GlobalStyles from "./GlobalStyles";
import Register from "./Pages/Register";
import Habits from "./Pages/Habits Page/Habits";
import Today from "./Pages/Today Page/Today";
import History from "./Pages/History";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";

export default function App() {
	const [loginInfo, setLoginInfo] = useState("");
	const [habitsList, setHabitsList] = useState([]);
	const [percentage, setPercentage] = useState(0);

	useEffect(() => {
		if (localStorage.getItem("userInfo") !== null ){
			setLoginInfo(JSON.parse(localStorage.getItem("userInfo")));
		}
	}, [])
	
	return (
		<UserContext.Provider
			value={{
				loginInfo,
				setLoginInfo,
				habitsList,
				setHabitsList,
				percentage,
				setPercentage,
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
