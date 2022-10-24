import { useNavigate } from "react-router-dom";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { useContext, useState, useEffect } from "react";
import UserContext from "../../CreateContext";
import styled from "styled-components";
import axios from "axios";
import History from "./History";

export default function HistoryScreen() {
	const navigate = useNavigate();
	const { loginInfo, percentage } = useContext(UserContext);
	const [historyList, setHistoryList] = useState([]);

	useEffect(() => {
		axios
			.get(
				"https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/history/daily",
				{
					headers: {
						Authorization: `Bearer ${loginInfo.token}`,
					},
				}
			)
			.then((e) => e.data.length !== 0 && setHistoryList(e.data[0].habits))
			.catch((e) => console.log(e.response.data));

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<HistoryPage>
			<StyledHeader>
				<h1>TrackIt</h1>
				<img src={loginInfo.image} alt="" />
			</StyledHeader>
			<StyledMain>
				<StyledMainH1>Histórico</StyledMainH1>
				{historyList.length === 0 && (
					<p>Em breve você poderá ver o histórico dos seus hábitos aqui!</p>
				)}
				{historyList.map((e) => (
					<History props={e} key={e.id} />
				))}
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
		</HistoryPage>
	);
}
const HistoryPage = styled.div`
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
const StyledMainH1 = styled.h1`
	color: #126ba5;
	font-size: 23px;
	line-height: 29px;
	padding: 28px 0;
	cursor: default;
`;
const StyledMain = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	padding: 70px 18px;
	height: 100vh;
	background: #f2f2f2;

	p {
		font-size: 18px;
		line-height: 22px;
		color: #666666;
		padding-bottom: 28px;
	}
	@media (max-width: 360px){
		align-items: flex-start;
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
	@media (max-width: 360px) {
		justify-content: space-between;
	}
`;
const ProgressBar = styled(CircularProgressbar)`
	margin: 0 auto 70px auto;
	height: 100px;
	cursor: pointer;
`;
