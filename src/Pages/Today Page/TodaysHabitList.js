import { BsFillCheckSquareFill } from "react-icons/bs";
import styled from "styled-components";
export default function TodaysHabits({ props }) {
	return (
		<TodayHabit>
			<Description>
				<h1> Titulo do Habito </h1>
				<p> Sequência atual: <span> 3 dias </span> </p>
				<p> Seu recorde: <span> 5 dias </span> </p>
			</Description>
			<CheckIcon />
		</TodayHabit>
	);
}
const TodayHabit = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	height: 94px;
	padding: 18px;
	background-color: white;
`;
const CheckIcon = styled(BsFillCheckSquareFill)`
	width: 70px;
	height: 70px;
`;
// color: ${ props => props.done ? #E7E7E7 : #8FC549}
const Description = styled.div`
	display: flex;
	flex-direction: column;
	h1 {
		font-size: 20px;
		line-height: 25px;
		padding-bottom: 8px;
		color: #666666;
	}
	p {
		font-size: 13px;
		line-height: 16px;
		color: #666666;
	}
	span {
		color: #8FC549;
	}
`;
