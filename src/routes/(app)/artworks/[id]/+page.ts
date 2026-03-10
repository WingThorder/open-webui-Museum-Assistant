import type { PageLoad } from './$types';
import { artworks } from '$lib/data/artworks';

export const prerender = true;
export const entries = () => artworks.map((a) => ({ id: a.id }));

export const load: PageLoad = ({ params }) => {
	return { id: params.id ?? '' };
};
