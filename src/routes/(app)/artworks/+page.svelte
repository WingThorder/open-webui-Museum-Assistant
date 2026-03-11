<script lang="ts">
	import { getArtworksForGallery, ARTWORK_PLACEHOLDER } from '$lib/data/artworks';
	import { childMode } from '$lib/stores';

	$: displayArtworks = getArtworksForGallery($childMode);
	let showFilterMenu = false;
</script>

<svelte:head>
	<title>Gallery – Museum Assistant</title>
</svelte:head>

<div class="artworks-page">
	<header class="artworks-header">
		<h1 class="artworks-title" style="margin-left:auto;">Gallery</h1>
		<!--
		<button
			class="artworks-filter-btn"
			aria-label="Filter or sort"
			on:click={() => (showFilterMenu = !showFilterMenu)}
		>
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
				<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
			</svg>
		</button>
		-->
	</header>

	<div class="artworks-masonry">
		{#each displayArtworks as item}
			<div class="artworks-item" class:span-2={item.span === 2}>
				<a href="/artworks/{item.id}" class="artworks-card">
					<img src={item.imageUrl} alt={item.title} loading="lazy" on:error={(e) => { const el = e.currentTarget; if (el && el.getAttribute('src') !== ARTWORK_PLACEHOLDER) el.setAttribute('src', ARTWORK_PLACEHOLDER); }} />
				</a>
				<div class="artworks-caption">
					<div class="artworks-caption-title">{item.title}</div>
					{#if item.artist}
						<div class="artworks-caption-artist">{item.artist}</div>
					{/if}
				</div>
			</div>
		{/each}
	</div>
</div>

{#if showFilterMenu}
	<div class="artworks-filter-overlay" role="button" tabindex="-1" on:click={() => (showFilterMenu = false)} on:keydown={(e) => e.key === 'Escape' && (showFilterMenu = false)}></div>
	<div class="artworks-filter-dropdown">
		<button on:click={() => (showFilterMenu = false)}>Sort by date</button>
		<button on:click={() => (showFilterMenu = false)}>Sort by name</button>
		<button on:click={() => (showFilterMenu = false)}>Filter by category</button>
	</div>
{/if}

<style>
	.artworks-page {
		min-height: 100%;
		background-attachment: fixed;
		padding: 1.5rem 1.25rem 5rem;
		position: relative;
	}

	.artworks-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 1.25rem;
	}

	.artworks-title {
		font-size: 1.75rem;
		font-weight: 700;
		color: #111;
		text-shadow: none;
		margin: 0;
	}
	:global(.dark) .artworks-title {
		color: #fff;
		text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
	}

	.artworks-filter-btn {
		width: 2.5rem;
		height: 2.5rem;
		border-radius: 50%;
		background: rgba(0, 0, 0, 0.08);
		border: none;
		color: #111;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: background 0.2s;
	}
	.artworks-filter-btn:hover {
		background: rgba(0, 0, 0, 0.12);
	}
	:global(.dark) .artworks-filter-btn {
		background: rgba(255, 255, 255, 0.25);
		color: #fff;
	}
	:global(.dark) .artworks-filter-btn:hover {
		background: rgba(255, 255, 255, 0.4);
	}

	/* Masonry with columns */
	.artworks-masonry {
		column-count: 2;
		column-gap: 0.75rem;
	}
	@media (min-width: 640px) {
		.artworks-masonry {
			column-count: 3;
			column-gap: 1rem;
		}
	}
	@media (min-width: 1024px) {
		.artworks-masonry {
			column-count: 4;
			column-gap: 1rem;
		}
	}

	.artworks-item {
		break-inside: avoid;
		margin-bottom: 0.75rem;
	}
	@media (min-width: 640px) {
		.artworks-item {
			margin-bottom: 1rem;
		}
	}

	.artworks-item.span-2 .artworks-card img {
		min-height: 220px;
	}

	.artworks-card {
		display: block;
		width: 100%;
		text-decoration: none;
		color: inherit;
		border-radius: 1rem;
		overflow: hidden;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
		transition: transform 0.2s, box-shadow 0.2s;
	}
	.artworks-card:hover {
		transform: scale(1.02);
		box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
	}

	.artworks-card img {
		width: 100%;
		height: auto;
		vertical-align: middle;
		object-fit: cover;
	}

	.artworks-caption {
		padding: 0.5rem 0.25rem 0;
		color: #1f2937;
		text-shadow: none;
	}
	:global(.dark) .artworks-caption {
		color: rgba(255, 255, 255, 0.95);
		text-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
	}
	.artworks-caption-title {
		font-weight: 600;
		font-size: 0.875rem;
		margin-bottom: 0.125rem;
	}
	.artworks-caption-artist {
		font-size: 0.75rem;
		opacity: 0.9;
	}

	.artworks-cta {
		position: absolute;
		bottom: 2rem;
		right: 1.25rem;
		color: #374151;
		font-size: 0.9rem;
		text-shadow: none;
		margin: 0;
		pointer-events: none;
	}
	:global(.dark) .artworks-cta {
		color: rgba(255, 255, 255, 0.95);
		text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
	}

	.artworks-filter-overlay {
		position: fixed;
		inset: 0;
		z-index: 40;
		background: transparent;
	}

	.artworks-filter-dropdown {
		position: fixed;
		top: 4.5rem;
		right: 1.25rem;
		z-index: 50;
		background: rgba(255, 255, 255, 0.95);
		backdrop-filter: blur(8px);
		border-radius: 0.75rem;
		box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
		padding: 0.5rem;
		min-width: 10rem;
	}
	.artworks-filter-dropdown button {
		display: block;
		width: 100%;
		text-align: left;
		padding: 0.5rem 0.75rem;
		border: none;
		background: none;
		border-radius: 0.5rem;
		cursor: pointer;
		color: #374151;
		font-size: 0.875rem;
	}
	.artworks-filter-dropdown button:hover {
		background: rgba(0, 0, 0, 0.06);
	}
</style>
