import { List } from '@mui/material';

import BookListItem from '../BookListItem';

export default function BooksList({ items = [] }) {
	return (
		<List className="w-full">
			{items?.map((item) => (
				<BookListItem key={item._id} data={item} />
			))}
		</List>
	);
}
