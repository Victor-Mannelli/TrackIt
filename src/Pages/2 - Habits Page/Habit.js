import styled from "styled-components";
import { useState, useContext } from "react";
import { BsTrash } from "react-icons/bs";
import axios from "axios";
import UserContext from "../../CreateContext";

export default function Habit({ title, days, id, getHabits }) {
	const { loginInfo, habitWasDeleted, setHabitWasDeleted } = useContext(UserContext);
	const weekdays = ["D", "S", "T", "Q", "Q", "S", "S"];
	const [deleting, setDeleting] = useState(false);

	function Delete(id) {
		setHabitWasDeleted(!habitWasDeleted)
		axios.delete(
			`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`,
			{
				headers: {
					"Authorization": `Bearer ${loginInfo.token}`,
				},
			}
		)
		.then(() => getHabits())
		.catch(e => console.log(e.response.data))
	}
	return (
		<StyledHabit>
			<h1> {title} </h1>
			<WeekDays>
				{weekdays.map((e, i) => (
					<Weekday key={i} index={i} days={days}>
						{e}
					</Weekday>
				))}
			</WeekDays>
			{deleting ? (
				<button onClick={() => Delete(id)}> Confirmar Exclusão </button>
			) : (
				<Trash onClick={() => setDeleting(true)} />
			)}
		</StyledHabit>
	);
}
const StyledHabit = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 70vw;
	padding: 25px 18px;
	margin: 5px 18px;
	background-color: white;
	border-radius: 5px;
	h1 {
		font-size: 19.976px;
		line-height: 25px;
		color: #666666;
	}
	button {
		position: absolute;
		top: 10px;
		right: 10px;

		width: 84px;
		height: 35px;
		border-radius: 5px;
		border: none;
		font-family: "Lexend Deca";

		color: white;
		background: red;
	}
	@media (max-width: 360px) {
		width: 80vw;
		align-items: flex-start;
	}
`;
const WeekDays = styled.div`
	display: flex;
	flex-direction: row;
`;
const Weekday = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;

	width: 30px;
	height: 30px;
	margin: 8px 4px 0 0;
	padding-bottom: 2px;
	border: 1px solid #d5d5d5;
	border-radius: 5px;
	background-color: ${(props) =>
		props.days.includes(props.index) ? "#cfcfcf" : "#ffffff"};
	cursor: default;

	color: ${(props) =>
		props.days.includes(props.index) ? "#ffffff" : "#dbdbdb"};
	font-family: "Lexend Deca";
	font-size: 20px;
	line-height: 25px;
`;
const Trash = styled(BsTrash)`
	position: absolute;
	top: 10px;
	right: 8px;
	cursor: pointer;
`;