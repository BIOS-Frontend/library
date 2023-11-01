import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from '@mui/material';

export default function ConfirmAlert({
	opened = false,
	onClose,
	title = '¿Estás seguro/a?',
	description = 'Esta acción puede ser irreversible.',
}) {
	return (
		<Dialog open={opened} onClose={() => onClose(false)}>
			<DialogTitle>{title}</DialogTitle>
			<DialogContent>
				<DialogContentText>{description}</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={() => onClose(false)}>Cancelar</Button>
				<Button variant="contained" onClick={() => onClose(true)}>
					Confirmar
				</Button>
			</DialogActions>
		</Dialog>
	);
}
