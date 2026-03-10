<script lang="ts">
	import { artworks, ARTWORK_PLACEHOLDER } from '$lib/data/artworks';

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
		{#each artworks as item}
			<div class="artworks-item" class:span-2={item.span === 2}>
				<a href="/artworks/{item.id}" class="artworks-card">
					<img src={item.imageUrl} alt={item.title} loading="lazy" on:error={(e) => { const el = e.currentTarget; if (el && el.getAttribute('src') !== ARTWORK_PLACEHOLDER) el.setAttribute('src', ARTWORK_PLACEHOLDER); }} />
				</a>
			</div>
		{/each}
	</div>

	<p class="artworks-cta">Explore art culture and stories</p>
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
		background: linear-gradient(165deg, #d4a574 0%, #b8956e 25%, #a67c52 50%, #8b6914 75%, #6b5344 100%);
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
		color: #fff;
		text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
		margin: 0;
	}

	.artworks-filter-btn {
		width: 2.5rem;
		height: 2.5rem;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.25);
		border: none;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: background 0.2s;
	}
	.artworks-filter-btn:hover {
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


	.artworks-cta {
		position: absolute;
		bottom: 2rem;
		right: 1.25rem;
		color: rgba(255, 255, 255, 0.95);
		font-size: 0.9rem;
		text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
		margin: 0;
		pointer-events: none;
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
