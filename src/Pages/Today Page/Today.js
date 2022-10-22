import { useContext, useEffect, useState } from "react";
import UserContext from "../../CreateContext";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TodaysHabits from "./TodaysHabitList";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

export default function Today() {
	const navigate = useNavigate();
	const { loginInfo } = useContext(UserContext);
	const [habitList, setHabitList] = useState([]);
	const [percentage, setPercentage] = useState(0);

	console.log(loginInfo);
	useEffect(() => {
		axios
			.get(
				"https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today",
				{
					headers: {
						Authorization: `Bearer ${loginInfo.token}`,
					},
				}
			)
			.then((e) => setHabitList(e.data));
	}, [loginInfo.token]);

	return (
		<TodayPage>
			<StyledHeader>
				<h1>TrackIt</h1>
				<img src={loginInfo.image} alt="" />
			</StyledHeader>
			<StyledMain>
				<h1>Segunda, 24/10</h1>
				<p>Nenhum hábito concluído ainda</p>
				<HabitsList>
					{habitList.map((e) => (
						<TodaysHabits props={e} />
					))}
				</HabitsList>
			</StyledMain>
			<StyledFooter>
				<h1 onClick={() => navigate("/habits")}>Hábitos</h1>
				<div>
				<ProgressBar
						value={percentage}
						text="Hoje"
						background
						backgroundPadding={6}
						styles={buildStyles({
							backgroundColor: "#3e98c7",
							textColor: "#fff",
							pathColor: "#fff",
							trailColor: "transparent",
						})}
						onClick={() => navigate("/today")}
					/>
				</div>
				<h1 onClick={() => navigate("/history")}>Histórico</h1>
			</StyledFooter>
		</TodayPage>
	);
}
const TodayPage = styled.div`
	display: flex;
	flex-direction: column;
	font-family: "Lexend Deca";
`;
const StyledHeader = styled.div`
	position: fixed;
	top: 0;
	left: 0;

	display: flex;
	justify-content: space-around;
	align-items: center;

	width: 100%;
	height: 70px;
	padding: 0 20px;
	background: #126ba5;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);

	h1 {
		font-family: "Playball", cursive;
		color: white;
		font-size: 40px;
		line-height: 49px;
	}
	img {
		width: 51px;
		height: 51px;
		border-radius: 25px;
	}

	@media (max-width: 360px) {
		justify-content: space-between;
	}
`;
const StyledMain = styled.div`
	padding: 70px 18px;
	height: 100vh;
	background: #f2f2f2;
	h1 {
		color: #126ba5;
		font-size: 23px;
		line-height: 29px;
		padding-top: 28px;
	}
	p {
		font-size: 18px;
		line-height: 22px;
		color: #bababa;
		padding-bottom: 28px;
	}
`;
const StyledFooter = styled.div`
	position: fixed;
	bottom: 0;
	left: 0;

	display: flex;
	justify-content: space-around;
	align-items: center;

	width: 100%;
	height: 70px;
	padding: 0 30px;
	background: #ffffff;

	h1 {
		font-size: 18px;
		line-height: 22px;
		text-align: center;
		color: #52b6ff;
		cursor: pointer;
	}
	div {
		position: absolute;
		cursor: pointer;
	}
	@media (max-width: 360px) {
		justify-content: space-between;
	}
`;
const HabitsList = styled.div``;

const ProgressBar = styled(CircularProgressbar)`
	position: relative;
	bottom: 30px;
	width: 100px;
	height: 100px;
`;
