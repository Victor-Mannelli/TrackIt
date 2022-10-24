import axios from "axios";
import { useContext, useState } from "react";
import styled from "styled-components";
import UserContext from "../../CreateContext";
import Weekday from "./Weekday";

export default function HabitCreation({ setCreatingStage }) {
	const weekdays = ["D", "S", "T", "Q", "Q", "S", "S"];
	const { loginInfo } = useContext(UserContext);
	const [weekdayIndexList, setWeekdayIndexList] = useState([]);
	const [habitName, SetHabitName] = useState("")
	const [state, setState] = useState(false)

	function HandleSubmit(e) {
		e.preventDefault();
		setState(true)
		axios
			.post(
				"https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
				{
					name: habitName,
					days: weekdayIndexList,
				},
				{
					headers: {
						"Authorization": `Bearer ${loginInfo.token}`,
					},
				}
			)
			.then(() => setCreatingStage(false))
			.catch(e => console.log(e.response.data))
	}
	return (
		<HabitCreationWindow>
			<form onSubmit={HandleSubmit}>
				<input
					placeholder="nome do hábito" 
					required
					disabled={state}
					type="text"
					onChange={(e) => SetHabitName(e.target.value)}
				/>
				<WeekDays>
					{weekdays.map((e, i) => (
						<Weekday
							key={i}
							e={e}
							index={i}
							state={state}
							weekdayIndexList={weekdayIndexList}
							setWeekdayIndexList={setWeekdayIndexList}
						/>
					))}
				</WeekDays>
				<Save type="submit">Salvar</Save>
			</form>
			<Cancel onClick={() => setCreatingStage(false)}>Cancelar</Cancel>
		</HabitCreationWindow>
	);
}
const HabitCreationWindow = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;

	width: 70vw;
	height: 180px;
	background: white;
	padding: 18px;
	margin-bottom: 20px;
	border-radius: 10px;

	input {
		background: #ffffff;
		border: 1px solid #d5d5d5;
		border-radius: 5px;
		width: 100%;
		height: 45px;
		padding: 0 10px;
		outline: none;

		font-family: "Lexend Deca";
		font-size: 20px;
		line-height: 25px;
		color: #666666;

		::placeholder {
			color: #dbdbdb;
		}
	}
	button {
		width: 84px;
		height: 35px;
		border-radius: 5px;
		border: none;
		font-family: "Lexend Deca";
	}
	@media (max-width: 360px) {
		width: 80vw;
	}
`;
const WeekDays = styled.div`
	display: flex;
	flex-direction: row;
`;
const Cancel = styled.button`
	position: absolute;
	bottom: 18px;
	right: 120px;

	color: #52b6ff;
	background: white;
`;
const Save = styled.button`
	position: absolute;
	bottom: 18px;
	right: 18px;

	color: white;
	background: #52b6ff;
`;
