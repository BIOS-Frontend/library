import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';

import { TextField, Button } from '@mui/material';

import { login } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Login() {
	const [formState, setFormState] = useState({
		email: 'fedePelanda@email.com',
		password: '123445678',
	});

	const navigate = useNavigate();

	const { mutate, isLoading } = useMutation({
		mutationFn: login,
		onSuccess: () => navigate('/'),
	});

	const handleChange = ({ target }) => {
		setFormState((prevState) => ({
			...prevState,
			[target.name]: target.value,
		}));
	};

	const onLoginButtonClick = () => {
		mutate(formState);
	};

	return (
		<div className="bg-gray-100 w-full h-screen flex items-center justify-center">
			<div className="bg-white flex flex-col items-center gap-4 w-full max-w-md shadow rounded p-10">
				<h1 className="text-4xl font-bold text-center mb-10">
					Iniciar Sesión
				</h1>
				<TextField
					label="Correo electrónico"
					name="email"
					type="email"
					value={formState.email}
					required
					fullWidth
					onChange={handleChange}
				/>
				<TextField
					label="Contraseña"
					name="email"
					value={formState.password}
					required
					fullWidth
					type="password"
					onChange={handleChange}
				/>

				<Button
					onClick={onLoginButtonClick}
					disabled={isLoading}
					variant="contained"
					fullWidth
				>
					{isLoading ? 'Cargando...' : 'Iniciar Sesión'}
				</Button>

				<Link to="/register">
					<span className="font-bold text-sky-500 hover:text-sky-800">
						Crea una cuenta
					</span>
				</Link>
			</div>
		</div>
	);
}
