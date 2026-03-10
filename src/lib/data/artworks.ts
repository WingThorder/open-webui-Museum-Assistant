export type Artwork = {
	id: string;
	title: string;
	imageUrl: string;
	span: number;
	description?: string;
	angles?: string[];
};

/** Artwork images: files in static/artworks/ are served at /artworks/ (e.g. artwork01.jpg → /artworks/artwork01.jpg) */
export const ARTWORKS_STATIC_BASE = '/artworks';
export const ARTWORK_PLACEHOLDER = `${ARTWORKS_STATIC_BASE}/placeholder.svg`;

function artworkImageUrl(id: string): string {
	const num = id.padStart(2, '0');
	return `${ARTWORKS_STATIC_BASE}/artwork${num}.jpg`;
}

export const artworks: Artwork[] = [
	{ id: '1', title: 'Portrait', imageUrl: artworkImageUrl('1'), span: 1, description: 'A classical portrait capturing expression and light.' },
	{ id: '2', title: 'Landscape', imageUrl: artworkImageUrl('2'), span: 2, description: 'Vast horizons and natural beauty in every brushstroke.' },
	{ id: '3', title: 'Still Life', imageUrl: artworkImageUrl('3'), span: 1, description: 'Composition of objects revealing texture and form.' },
	{ id: '4', title: 'Abstract', imageUrl: artworkImageUrl('4'), span: 2, description: 'Colour and shape beyond the literal.' },
	{ id: '5', title: 'Classical', imageUrl: artworkImageUrl('5'), span: 1, description: 'Timeless themes and traditional technique.' },
	{ id: '6', title: 'Nature', imageUrl: artworkImageUrl('6'), span: 2, description: 'The natural world rendered in fine detail.' },
	{ id: '7', title: 'Modern', imageUrl: artworkImageUrl('7'), span: 1, description: 'Contemporary vision and bold choices.' },
	{ id: '8', title: 'The Statue of Hathor', imageUrl: artworkImageUrl('8'), span: 1, description: 'Then as now, this giant statue reflects the power and richness of King Ramesses II. It originally stood outside the main temple of god Ptah at Memphis, guarding its sacred space and welcoming worshippers.' },
	{ id: '9', title: 'Mosaic', imageUrl: artworkImageUrl('9'), span: 2, description: 'Countless tesserae forming a single image.' },
	{ id: '10', title: 'Impression', imageUrl: artworkImageUrl('10'), span: 1, description: 'Light and movement in fleeting moments.' },
	{ id: '11', title: 'Heritage', imageUrl: artworkImageUrl('11'), span: 2, description: 'Cultural heritage preserved in art.' },
	{ id: '12', title: 'Detail', imageUrl: artworkImageUrl('12'), span: 1, description: 'Fine details that reward closer viewing.' }
];

export function getArtworkById(id: string): Artwork | undefined {
	return artworks.find((a) => a.id === id);
}
