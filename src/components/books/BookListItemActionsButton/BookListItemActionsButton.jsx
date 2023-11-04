import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';

import { Alert, IconButton, Menu, MenuItem, Snackbar } from '@mui/material';

import { MoreVert } from '@mui/icons-material';

import { deleteBook } from '../../../api/books';

import ConfirmAlert from '../../common/ConfirmAlert/ConfirmAlert';

import { queryClient } from '../../../routing/App';
import BookFormModal from '../BookFormModal/BookFormModal';

export default function BookListItemActionsButton({ data, ...props }) {
	const [anchorEl, setAnchorEl] = useState(null);
	const [confirmIsOpen, setConfirmIsOpen] = useState(false);
	const [formModalIsOpened, setFormModalIsOpened] = useState(false);

	const {
		reset,
		mutate,
		isError,
		isSuccess,
		data: message,
		error,
	} = useMutation({
		mutationFn: deleteBook,
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: ['getBooks'] }),
	});

	const open = Boolean(anchorEl);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const onDeleteItemClick = () => {
		setAnchorEl(null);
		setConfirmIsOpen(true);
	};

	const onEditItemClick = () => {
		setAnchorEl(null);
		setFormModalIsOpened(true);
	};

	const onConfirmClose = (confirm) => {
		setConfirmIsOpen(false);
		if (!confirm) return;
		mutate({ id: data._id });
	};

	const onSnackbarClose = () => {
		reset();
	};

	const onFormModalClose = (shouldRefresh = false) => {
		setFormModalIsOpened(false);

		if (shouldRefresh) {
			queryClient.invalidateQueries({ queryKey: ['getBooks'] });
		}
	};

	return (
		<>
			<IconButton onClick={handleClick} {...props}>
				<MoreVert />
			</IconButton>
			<Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
				<MenuItem onClick={onDeleteItemClick}>Eliminar</MenuItem>
				<MenuItem onClick={onEditItemClick}>Editar</MenuItem>
			</Menu>
			<ConfirmAlert onClose={onConfirmClose} opened={confirmIsOpen} />
			<Snackbar
				open={isError || isSuccess}
				autoHideDuration={6000}
				onClose={onSnackbarClose}
			>
				<Alert
					onClose={handleClose}
					severity={isError ? 'error' : 'success'}
					sx={{ width: '100%' }}
				>
					{message || error}
				</Alert>
			</Snackbar>
			{formModalIsOpened && (
				<BookFormModal
					title="Editar Libro"
					opened={formModalIsOpened}
					onClose={onFormModalClose}
					data={data}
					submitButtonText="Editar"
				/>
			)}
		</>
	);
}
