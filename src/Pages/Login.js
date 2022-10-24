import logo from "./0 - Pages Files/Logo.png";
import styled from "styled-components";
import axios from "axios";
import UserContext from "../CreateContext";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";

export default function Login() {
	const navigate = useNavigate();
	const { setLoginInfo } = useContext(UserContext);
	const [loginEmail, setLoginEmail] = useState("");
	const [loginPassword, setLoginPassword] = useState("");
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		localStorage.getItem("userInfo") !== null && navigate("/today")

	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	function HandleSubmit(event) {
		event.preventDefault();
		setLoading(true);
		axios
			.post(
				"https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login",
				{
					email: loginEmail,
					password: loginPassword,
				}
			)
			.then(({ data }) => {
				localStorage.setItem("userInfo", JSON.stringify(data))
				setLoginInfo(data)
				navigate("/today");
			})
			.catch((e) => {
				setLoading(false);
				e.response.data.message === 'Usuário e/ou senha inválidos!' 
				? toast.error(e.response.data.message, { position: "top-center" })
				: toast.error(e.response.data.details[0], { position: "top-center" });
			});
	}
	return (
		<LoginPage>
			<img src={logo} alt="" />
			<SyledForm onSubmit={HandleSubmit}>
				<input
					required
					disabled={loading}
					placeholder="email"
					type="email"
					onChange={(e) => setLoginEmail(e.target.value)}
				/>
				<input
					required
					disabled={loading}
					placeholder="senha"
					type="password"
					onChange={(e) => setLoginPassword(e.target.value)}
				/>
				<button type="submit">
					{loading ? <ThreeDots color="white" /> : "Entrar"}
				</button>
			</SyledForm>
			<p onClick={() => !loading && navigate("/register")}>
				Não tem uma conta? Cadastre-se!
			</p>
		</LoginPage>
	);
}
const LoginPage = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100vh;
	background-color: var(--dark-mode);
	font-family: "Lexend Deca";
	img {
		width: 250px;
		height: 250px;
		margin-bottom: 25px;
	}
	p {
		font-size: 13.976px;
		line-height: 17px;
		text-align: center;
		text-decoration-line: underline;
		color: #52b6ff;
		cursor: pointer;
	}
	@media (max-width: 360px) {
		img {
			width: 180px;
			height: 180px;
		}
	}
`;
const SyledForm = styled.form`
	display: flex;
	flex-direction: column;
	margin-bottom: 25px;
	h2 {
		font-size: 13.976px;
		line-height: 17px;
		text-align: center;
		color: red;
	}
	input {
		height: 45px;
		width: 300px;
		background: #ffffff;
		border: 1px solid #d4d4d4;
		border-radius: 5px;
		margin: 3px;
		padding: 0 15px;
		color: gray;
		font-size: 19.976px;
		line-height: 25px;
		outline: none;

		::placeholder {
			color: #dbdbdb;
			font-size: 19.976px;
			line-height: 25px;
		}
	}
	button {
		display: flex;
		justify-content: center;
		align-items: center;

		width: 300px;
		height: 45px;
		margin: 3px;
		background: #52b6ff;
		border-radius: 4.63636px;
		border: none;

		color: #ffffff;
		font-size: 20.976px;
		line-height: 26px;
	}
	@media (max-width: 360px) {
		input,
		button {
			width: 80vw;
		}
	}
`;
