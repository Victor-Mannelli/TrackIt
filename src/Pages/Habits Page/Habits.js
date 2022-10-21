import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { BsPlusSquareFill } from "react-icons/bs";
import { useState } from "react";
import Habit from "./Habit";

export default function Habits() {
	const statesReceived = useLocation();
	console.log(statesReceived);
    const [habitsList, setHabitsList] = useState([]);
    function AddingHabits(){
        setHabitsList()
    }
	return (
		<HabitsPage>
			<StyledHeader>
				<h1>TrackIt</h1>
				<img src="" alt="" />
			</StyledHeader>
			<StyledMain>
				<MyHabits>
					<h1>Meus Hábitos</h1>
					<PlusIcon onClick={() => AddingHabits()}/>
				</MyHabits>
				{habitsList.length === 0 
                    ? <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>
                    : habitsList.map(e => <Habit props={e} />)
                }
			</StyledMain>
			<StyledFooter>
				<h1>Hábitos</h1>
				<h1>Histórico</h1>
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
    p {
        font-size: 18px;
        line-height: 27px;
        color: #666666;
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

	font-size: 18px;
	line-height: 22px;
	text-align: center;
	color: #52b6ff;

	@media (max-width: 360px) {
		justify-content: space-between;
	}
`;
const MyHabits = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
	height: 85px;
    color: #126BA5;

	@media (max-width: 360px) {
		justify-content: space-between;
	}
`;
const PlusIcon = styled(BsPlusSquareFill)`
	width: 40px;
	height: 35px;
	color: #52b6ff;
    cursor: pointer;
`;
