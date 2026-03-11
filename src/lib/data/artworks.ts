export type Artwork = {
	id: string;
	title: string;
	imageUrl: string;
	span: number;
	/** Artist name – shown in gallery under the title. */
	artist?: string;
	/** Full description – shown only on the detail page. */
	description?: string;
	angles?: string[];
	/** When true (default), shown when "Child-friendly" filter is on. Set false for artwork that may be uncomfortable for young visitors. */
	childFriendly?: boolean;
};

/** Artwork images: files in static/artworks/ are served at /artworks/ (e.g. artwork01.jpg → /artworks/artwork01.jpg) */
export const ARTWORKS_STATIC_BASE = '/artworks';
export const ARTWORK_PLACEHOLDER = `${ARTWORKS_STATIC_BASE}/placeholder.svg`;

function artworkImageUrl(id: string): string {
	const num = id.padStart(2, '0');
	return `${ARTWORKS_STATIC_BASE}/artwork${num}.jpg`;
}

/** Gallery data: title + artist shown in gallery; description only on detail page. Set childFriendly: false to hide in Child-friendly mode. */
export const artworks: Artwork[] = [
	{ id: '1', title: 'Autumn Mountains Everlasting', imageUrl: artworkImageUrl('1'), span: 1, artist: 'Artist Name', description: 'A classical portrait capturing expression and light.', childFriendly: true },
	{ id: '2', title: 'Patchwork Robe', imageUrl: artworkImageUrl('2'), span: 2, artist: 'Wu Guanzhong', description: '“Patchwork” depicts the artist’s impression of patched-up clothes worn by the poor, and the emotions brought on by everyday life and experiences.', childFriendly: true },
	{ id: '3', title: 'Mona Lisa', imageUrl: artworkImageUrl('3'), span: 1, artist: 'Leonardo da Vinci', description: 'Leonardo da Vinci’s Mona Lisa (Italian: La Gioconda), painted in the early 16th century, is widely regarded as the most famous portrait in Western art. ', childFriendly: true },
	{ id: '4', title: 'Starry Night', imageUrl: artworkImageUrl('4'), span: 2, artist: 'Vincent van Gogh', description: 'Vincent van Gogh’s The Starry Night (1889) is one of the most recognizable paintings in the world, celebrated for its swirling sky, luminous stars, and emotional intensity.', childFriendly: true },
	{ id: '5', title: 'Sister No. 4', imageUrl: artworkImageUrl('5'), span: 1, artist: 'Duan Jianyu', description: '"Sister No. 4" is an oil painting depicting modern humans and animals (such as tigers, zebras, and gorillas) walking.', childFriendly: true },
	{ id: '6', title: 'Banqiao 1962', imageUrl: artworkImageUrl('6'), span: 2, artist: 'Chang Chao-Tang', description: '"Banqiao 1962" comes from experimental photographic works from 1962 to 1965, a series that made Chang Chao-Tang famous.', childFriendly: false },
	{ id: '7', title: 'Battle Scenes of Pacifying Yunnan and Guizhou', imageUrl: artworkImageUrl('7'), span: 1, artist: 'Qing Kuan', description: "The painting depicts after the Qing army entered Dali city, blowing up enemy camp watchtowers and wooden barriers, Yang Yuke's ambush capturing the artillery tower outside the earth city, and Cen Yuying leading troops to attack.", childFriendly: true },
	{ id: '8', title: 'The Statue of Hathor', imageUrl: artworkImageUrl('8'), span: 1, artist: 'Artist Name', description: 'Then as now, this giant statue reflects the power and richness of King Ramesses II. It originally stood outside the main temple of god Ptah at Memphis, guarding its sacred space and welcoming worshippers.', childFriendly: true },
];

export function getArtworkById(id: string): Artwork | undefined {
	return artworks.find((a) => a.id === id);
}

/** Returns artworks to show in gallery: when childMode is true, only childFriendly (or unset) items. */
export function getArtworksForGallery(childMode: boolean): Artwork[] {
	if (!childMode) return artworks;
	return artworks.filter((a) => a.childFriendly !== false);
}
