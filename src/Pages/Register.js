import logo from "./0 - Pages Files/Logo.png";
import styled from "styled-components";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";

export default function Register() {
	const navigate = useNavigate();

	const [registrationEmail, setRegistrationEmail] = useState("");
	const [registrationPassword, setRegistrationPassword] = useState("");
	const [registrationName, setRegistrationName] = useState("");
	const [registrationPicture, setRegistrationPicture] = useState("");
	const [loading, setLoading] = useState(false);

	function HandleSubmit(event) {
		event.preventDefault();
		setLoading(true);
		const registration = {
			email: registrationEmail,
			name: registrationName,
			image: registrationPicture,
			password: registrationPassword
		}
		axios
			.post(
				"https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up",
				registration
			)
			.then(() => navigate("/"))
			.catch((e) => {
				setLoading(false)
				toast.error(e.response.data.message, { position: "top-center" });
			});
	}
	return (
		<RegisterPage>
			<img src={logo} alt="" />
			<SyledForm onSubmit={HandleSubmit}>
				<input
					required
					placeholder="email"
					type="e-mail"
					disabled={loading}
					onChange={(e) => setRegistrationEmail(e.target.value)}
				/>
				<input
					required
					placeholder="senha"
					type="password"
					disabled={loading}
					onChange={(e) => setRegistrationPassword(e.target.value)}
				/>
				<input
					required
					placeholder="nome"
					type="text"
					disabled={loading}
					onChange={(e) => setRegistrationName(e.target.value)}
				/>
				<input
					required
					placeholder="foto"
					type="url"
					disabled={loading}
					onChange={(e) => setRegistrationPicture(e.target.value)}
				/>
				<FormButton disabled={loading} type="submit">
					{loading ? <ThreeDots color="white" /> : "Cadastrar"}
				</FormButton>
			</SyledForm>
			<p onClick={() => !loading && navigate("/")}>
				Já tem uma conta? Faça login!
			</p>
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
	background-color: var(--light-mode);
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
	h1 {
		text-align: center;
		color: red;
	}
	@media (max-width: 360px) {
		input {
			width: 80vw;
		}
	}
`;
const FormButton = styled.button`
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
	opacity: ${(props) => (props.disabled ? 0.8 : 1)};

	@media (max-width: 360px) {
		button {
			width: 80vw;
		}
	}
`;
