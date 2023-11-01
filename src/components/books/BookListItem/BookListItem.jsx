import {
	Avatar,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Tooltip,
} from '@mui/material';

import { CheckCircle, Cancel } from '@mui/icons-material';

import BookListItemActionsButton from '../BookListItemActionsButton';

export default function BookListItem({ data }) {
	const { available, title, author, code } = data;

	return (
		<ListItem
			secondaryAction={
				<BookListItemActionsButton
					data={data}
					edge="end"
					aria-label="delete"
				/>
			}
		>
			<ListItemAvatar>
				<Tooltip
					title={available ? 'Libro disponible' : 'Libro agotado'}
				>
					<Avatar sx={{ background: 'none' }}>
						{available ? (
							<CheckCircle color="success" />
						) : (
							<Cancel color="error" />
						)}
					</Avatar>
				</Tooltip>
			</ListItemAvatar>
			<ListItemText primary={title} secondary={author} />
			<Tooltip title="Código">
				<small className="text-neutral-500">{code}</small>
			</Tooltip>
		</ListItem>
	);
}
