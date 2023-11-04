import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { CircularProgress, Fab } from '@mui/material';
import { Add } from '@mui/icons-material';

import { getBooks } from '../api/books';

import { BooksList, BookFormModal } from '../components/books';

export default function Home() {
	const [formModalIsOpened, setFormModalIsOpened] = useState(false);

	const {
		data = [],
		isLoading,
		isError,
		error,
		refetch,
	} = useQuery({
		queryKey: ['getBooks'],
		queryFn: getBooks,
	});

	const items = Array.isArray(data) ? data : [];

	const onAddButtonClick = () => {
		setFormModalIsOpened(true);
	};

	const onFormModalClose = (shouldRefresh = false) => {
		setFormModalIsOpened(false);

		if (shouldRefresh) {
			refetch();
		}
	};

	return (
		<section className="w-full flex flex-col p-4 md:p-10 gap-10">
			<h1 className="font-bold text-4xl text-center">Mi librería</h1>

			{isError && <p>{error}</p>}
			<div className="flex justify-center m-auto w-full max-w-lg">
				{isLoading ? <CircularProgress /> : <BooksList items={items} />}
			</div>

			<div className="fixed bottom-4 right-4">
				<Fab onClick={onAddButtonClick} color="primary">
					<Add />
				</Fab>
			</div>
			<BookFormModal
				opened={formModalIsOpened}
				onClose={onFormModalClose}
			/>
		</section>
	);
}
