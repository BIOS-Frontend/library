import { useQuery } from '@tanstack/react-query';

import { getBooks } from '../api/books';

import BooksList from '../components/books/BooksList';
import { CircularProgress } from '@mui/material';

export default function Home() {
	const { data = [], isLoading } = useQuery({
		queryKey: ['getBooks'],
		queryFn: getBooks,
	});

	return (
		<section className="w-full flex flex-col p-4 md:p-10 gap-10">
			<h1 className="font-bold text-4xl text-center">Mi librería</h1>
			<div className="flex justify-center m-auto w-full max-w-lg">
				{isLoading ? <CircularProgress /> : <BooksList items={data} />}
			</div>
		</section>
	);
}
