import { useEffect, useState, useContext } from "react";
import UserContext from "../../CreateContext";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TodaysHabits from "./TodaysHabits";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

export default function Today() {
	const navigate = useNavigate();
	const { loginInfo, setPercentage, percentage } = useContext(UserContext);
	const [todaysHabits, setTodaysHabits] = useState([]);
	const weekdays = [
		"Domingo",
		"Segunda-feira",
		"Terça-feira",
		"Quarta-feira",
		"Quinta-feira",
		"Sexta-feira",
		"Sábado",
	];
	const dayjs = require("dayjs");
	dayjs.locale("pt-br");

	function getTodayHabits() {
		axios
			.get(
				"https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today",
				{
					headers: {
						Authorization: `Bearer ${loginInfo.token}`,
					},
				}
			)
			.then((e) => {
				setTodaysHabits(e.data);
				setPercentage(Math.floor((100 * e.data.filter(e => e.done).length) / e.data.length));
			})
			.catch((e) => console.log(e.response.data));
	}
	useEffect(() => {
		getTodayHabits()

	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<TodayPage>
			<StyledHeader>
				<h1>TrackIt</h1>
				<img src={loginInfo.image} alt="" />
			</StyledHeader>
			<StyledMain>
				<MainTitle>
					{" "}
					{weekdays[dayjs().day()]}, {dayjs().date()}/{dayjs().month() + 1}
				</MainTitle>
				{isNaN(percentage) ? (
					<MainParagraph>Nenhum hábito concluído ainda</MainParagraph>
				) : (
					<MainParagraph>{percentage}% dos hábitos concluídos</MainParagraph>
				)}

				<HabitsList>
					{todaysHabits.map((e) => (
						<TodaysHabits
							key={e.id}
							props={e}
							getTodayHabits={getTodayHabits}
						/>
					))}
				</HabitsList>
			</StyledMain>
			<StyledFooter>
				<h1 onClick={() => navigate("/habits")}>Hábitos</h1>
				<div onClick={() => navigate("/today")}>
					<ProgressBar
						value={isNaN(percentage) ? 0 : percentage}
						text="Hoje"
						background
						backgroundPadding={6}
						styles={buildStyles({
							backgroundColor: "#3e98c7",
							textColor: "#fff",
							pathColor: "#fff",
							trailColor: "transparent",
						})}
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
const MainTitle = styled.h1`
	color: #126ba5;
	font-size: 23px;
	line-height: 29px;
	padding-top: 28px;
`;
const MainParagraph = styled.p`
	font-size: 18px;
	line-height: 22px;
	color: #bababa;
	padding-bottom: 28px;
`;
const StyledMain = styled.div`
	padding: 70px 18px;
	height: 100vh;
	background: #f2f2f2;
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
	@media (max-width: 360px) {
		justify-content: space-between;
	}
`;
const HabitsList = styled.div``;

const ProgressBar = styled(CircularProgressbar)`
	margin: 0 auto 70px auto;
	height: 100px;
	cursor: pointer;
`;
