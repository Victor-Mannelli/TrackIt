import logo from "./1 - Pages Files/Logo.png";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
	const [registrationEmail, setRegistrationEmail] = useState("");
	const [registrationPassword, setRegistrationPassword] = useState("");
	const [registrationName, setRegistrationName] = useState("");
	const [registrationPicture, setRegistrationPicture] = useState("");
	const navigate = useNavigate();

	function handleSubmit(event) {
		event.preventDefault();
		const registration = {
			email: registrationEmail,
			name: registrationName,
			image: registrationPicture,
			password: registrationPassword,
		};
		axios
			.post(
				"https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up",
				registration
			)
			.then(() => navigate("/"))
			.catch((e)=> console.log(e))
	}

	return (
		<RegisterPage>
			<img src={logo} alt=" " />
			<SyledForm onSubmit={handleSubmit}>
				<input
					required
					placeholder="email"
					type="e-mail"
					onChange={(e) => setRegistrationEmail(e)}
				/>
				<input
					required
					placeholder="senha"
					type="password"
					onChange={(e) => setRegistrationPassword(e)}
				/>
				<input
					required
					placeholder="nome"
					type="text"
					onChange={(e) => setRegistrationName(e)}
				/>
				<input
					required
					placeholder="foto"
					type="url"
					onChange={(e) => setRegistrationPicture(e)}
				/>
				<button type="submit">Cadastrar</button>
			</SyledForm>
			<p onClick={() => navigate("/")}>Já tem uma conta? Faça login!</p>
		</RegisterPage>
	);
}
const RegisterPage = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100vh;
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
		width: 300px;
		height: 45px;
		margin: 3px 3px 25px 3px;
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
