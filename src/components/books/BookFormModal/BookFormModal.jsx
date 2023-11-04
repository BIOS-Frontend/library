import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { setBook } from '../../../api/books';

const fields = [
	{
		name: 'title',
		label: 'Título',
	},
	{
		name: 'author',
		label: 'Autor',
	},
	{
		name: 'code',
		label: 'Código',
	},
	{
		name: 'description',
		label: 'Descripción',
	},
];

const entries = fields.map((field) => {
	const value = field.value || '';
	return [field.name, value];
});

// [['title', ''], ['author', ''], ['code', ''], ['description', '']]

const defaultValues = Object.fromEntries(entries);

// { title: '', author: '', code: '', description: '' }

export default function BookFormModal({
	opened = false,
	onClose,
	title = 'Crear Libro',
	data = {},
	submitButtonText = 'Crear',
}) {
	const [formValues, setFormValues] = useState({
		...defaultValues,
		...data,
	});

	const { mutate, isLoading } = useMutation({
		mutationFn: setBook,
		onSuccess: () => {
			setFormValues(data || defaultValues);
			onClose(true);
		},
	});

	const formIsCompleted = () => {
		const values = Object.values(formValues); // ['', '', '', '']
		return values.every((value) => value !== '');
	};

	const onSubmitButtonClick = () => {
		if (!formIsCompleted()) return;

		mutate({ data: formValues, id: data?._id });
	};

	const onFieldChange = (e) => {
		setFormValues({
			...formValues,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<Dialog open={opened} onClose={() => onClose(false)}>
			<DialogTitle>{title}</DialogTitle>
			<DialogContent>
				<form action="" className="w-96 flex flex-col gap-4 pt-2">
					{fields?.map(({ name, label }) => (
						<TextField
							name={name}
							key={name}
							label={label}
							value={formValues[name]}
							fullWidth
							onChange={onFieldChange}
							required
						/>
					))}
				</form>
			</DialogContent>
			<DialogActions>
				<Button onClick={() => onClose(false)}>Cancelar</Button>
				<Button
					disabled={isLoading}
					variant="contained"
					onClick={onSubmitButtonClick}
				>
					{isLoading ? 'Cargando...' : submitButtonText}
				</Button>
			</DialogActions>
		</Dialog>
	);
}
