import { useState } from "react";
import styled from "styled-components";
export default function Weekday({ e, index, weekdayIndexList, setWeekdayIndexList, state}) {
	const [selected, setSelected] = useState(false);
	return (
		<WeekdayBox
			selected={selected}
			state={state}
			required
			onClick={() => {
				selected === true ? setSelected(false) : setSelected(true);

                weekdayIndexList.includes(index) 
                ? setWeekdayIndexList(weekdayIndexList.filter(e => e !== index))
                : setWeekdayIndexList([...weekdayIndexList, index])
			}}
		>
			{e}
		</WeekdayBox>
	);
}
const WeekdayBox = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;

	width: 30px;
	height: 30px;
	margin: 8px 4px 0 0;
	padding-bottom: 3px;
	background-color: ${(props) => (props.selected ? "#cfcfcf" : "#ffffff")};
	border: 1px solid #d5d5d5;
	border-radius: 5px;
    cursor: pointer;
	pointer-events: ${props => props.state ? "none" : "initial"};

	font-family: "Lexend Deca";
	font-size: 20px;
	line-height: 25px;
	color: ${(props) => (props.selected ? "#ffffff" : "#dbdbdb")};
`;