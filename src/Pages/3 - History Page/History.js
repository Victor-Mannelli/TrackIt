import styled from "styled-components";
import { BsFillCheckSquareFill } from "react-icons/bs";

export default function History({ props }) {
    const weekdays = ["D", "S", "T", "Q", "Q", "S", "S"];
	return (
		<HistoryHabits>
			<h1> {props.name} </h1>
			<WeekDays>
				{weekdays.map((e, i) => (
					<Weekday key={i} index={i} days={props.weekDay}>
						{e}
					</Weekday>
				))}
			</WeekDays>
            <CheckIcon isDone={props.done}/>
		</HistoryHabits>
	);
}
const CheckIcon = styled(BsFillCheckSquareFill)`
    position: absolute;
    top: 15px;
    right: 15px;
    width: 25px;
    height: 25px;
    color: ${props => props.isDone ? "#8FC549" : "#cfcfcf"};
`
const HistoryHabits = styled.div`
    position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 75vw;
	padding: 25px 18px;
	margin: 5px 18px;
	background-color: white;
	border-radius: 5px;
	cursor: default;
	h1 {
		font-size: 19.976px;
		line-height: 25px;
        color: #666666;
	}
	@media (max-width: 360px){
		width: 80vw;
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
	cursor: default; 
    color: ${props =>props.days === props.index ? "#ffffff" : "#dbdbdb"};
    background-color: ${props =>props.days === props.index ? "#cfcfcf" : "#ffffff"};

	font-family: "Lexend Deca";
	font-size: 20px;
	line-height: 25px;
`;
