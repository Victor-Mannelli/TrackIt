import styled from "styled-components";
import { BsPlusSquareFill } from "react-icons/bs";
import { useContext, useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import UserContext from "../../CreateContext";
import { useNavigate } from "react-router-dom";
import HabitCreation from "./HabitsCreation";
import Habit from "./Habit";
import axios from "axios";

export default function Habits() {
	const { loginInfo, percentage } = useContext(UserContext);
	const navigate = useNavigate();
	const [creatingStage, setCreatingStage] = useState(false);
	const [habitsListInfo, setHabitsListInfo] = useState([]);
	const [refresh, setRefresh] = useState(false);

	useEffect(() => {
		axios
			.get(
				"https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
				{
					headers: {
						"Authorization": `Bearer ${loginInfo.token}`,
					},
				}
			)
			.then((e) => {
				setHabitsListInfo(e.data);
			})
			.catch(e => console.log(e.response.data))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [creatingStage, refresh]);

	return (
		<HabitsPage>
			<StyledHeader>
				<h1>TrackIt</h1>
				<img src={loginInfo.image} alt="" />
			</StyledHeader>
			<StyledMain>
				<MyHabitsTitle>
					<h1>Meus Hábitos</h1>
					<PlusIcon onClick={() => setCreatingStage(!creatingStage)} />
				</MyHabitsTitle>
				<MyHabits>
					{creatingStage && (
						<HabitCreation setCreatingStage={setCreatingStage} />
					)}
					{habitsListInfo.length === 0 && (
						<p>
							Você não tem nenhum hábito cadastrado ainda. Adicione um hábito
							para começar a trackear!
						</p>
					)}
					{habitsListInfo.map((e) => (
						<Habit
							key={e.id}
							id={e.id}
							title={e.name}
							days={e.days}
							setHabitsListInfo={setHabitsListInfo}
							setRefresh={setRefresh}
							refresh={refresh}
						/>
					))}
				</MyHabits>
			</StyledMain>
			<StyledFooter>
				<h1 onClick={() => navigate("/habits")}>Hábitos</h1>
				<div onClick={() => navigate("/today")}>
					<ProgressBar
						value={percentage}
						text="Hoje"
						background
						backgroundPadding={6}
						styles={buildStyles({
							backgroundColor: "#3e98c7",
							textColor: "#ffffff",
							pathColor: "#ffffff",
							trailColor: "transparent",
						})}
					/>
				</div>
				<h1 onClick={() => navigate("/history")}>Histórico</h1>
			</StyledFooter>
		</HabitsPage>
	);
}
const HabitsPage = styled.div`
	display: flex;
	flex-direction: column;
	font-family: "Lexend Deca";
`;
const StyledHeader = styled.div`
	position: fixed;
	z-index: 2;
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
	min-height: 100vh;
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

	font-size: 1.125rem;
	line-height: 22px;
	text-align: center;
	color: #52b6ff;
	h1 {
		cursor: pointer;
	}
	@media (max-width: 360px) {
		justify-content: space-between;
	}
`;
const ProgressBar = styled(CircularProgressbar)`
	width: 100px;
	height: 100px;
	margin: 0 auto 70px auto;
	cursor: pointer;
`;
const PlusIcon = styled(BsPlusSquareFill)`
	width: 40px;
	height: 35px;
	color: #52b6ff;
	cursor: pointer;
`;
const MyHabitsTitle = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
	height: 85px;
	color: #126ba5;

	@media (max-width: 360px) {
		justify-content: space-between;
	}
`;
const MyHabits = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-bottom: 30px;
	p {
		width: 70vw;
		text-align: center;
		font-size: 18px;
		line-height: 27px;
		color: #666666;
	}

	@media (max-width: 360px) {
		p {
			width: 100%;
			text-align: start;
		}
	}
`;
