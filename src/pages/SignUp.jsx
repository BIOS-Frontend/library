import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';

import { TextField, Button } from '@mui/material';

import { register } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function SignUp() {
	const [formState, setFormState] = useState({
		email: '',
		name: '',
		password: '123445678',
	});

	const navigate = useNavigate();

	const { mutate, isLoading } = useMutation({
		mutationFn: register,
		onSuccess: () => navigate('/'),
	});

	const handleChange = ({ target }) => {
		setFormState((prevState) => ({
			...prevState,
			[target.name]: target.value,
		}));
	};

	const onRegisterButtonClick = () => {
		mutate(formState);
	};

	return (
		<div className="bg-gray-100 w-full h-screen flex items-center justify-center">
			<div className="bg-white flex flex-col gap-4 w-full items-center max-w-md shadow rounded p-10">
				<h1 className="text-4xl font-bold text-center mb-10">
					Regístrate
				</h1>
				<TextField
					label="Nombre"
					name="name"
					type="text"
					value={formState.name}
					required
					fullWidth
					onChange={handleChange}
				/>
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
					onClick={onRegisterButtonClick}
					disabled={isLoading}
					variant="contained"
					fullWidth
				>
					{isLoading ? 'Cargando...' : 'Crear cuenta'}
				</Button>

				<Link to="/login">
					<span className="font-bold text-sky-500 hover:text-sky-800">
						Iniciar sesión
					</span>
				</Link>
			</div>
		</div>
	);
}
