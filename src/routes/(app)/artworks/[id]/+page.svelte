<script lang="ts">
	import { goto } from '$app/navigation';
	import ArtworkViewer from '$lib/components/artworks/ArtworkViewer.svelte';
	import { getArtworkById } from '$lib/data/artworks';
	import type { PageData } from './$types';

	export let data: PageData;

	$: artwork = getArtworkById(data?.id ?? '');
	let audioProgress = 0.4;
	let isPlaying = false;
</script>

<svelte:head>
	<title>{artwork ? artwork.title : 'Artwork'} – Museum Assistant</title>
</svelte:head>

{#if artwork}
	<div class="detail-page">
		<div class="detail-page-inner">
			<a href="/artworks" class="detail-back" on:click|preventDefault={() => goto('/artworks')}>
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-5"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
				Back to Gallery
			</a>
			<div class="detail-viewer-wrap">
				<ArtworkViewer
					imageUrl={artwork.imageUrl}
					angles={artwork.angles || []}
					alt={artwork.title}
				/>
			</div>
			<div class="detail-info-card">
			<h1 class="detail-title">{artwork.title.toUpperCase()}</h1>
			<p class="detail-desc">{artwork.description || 'Explore this artwork from different angles.'}</p>
			<div class="detail-audio">
				<button type="button" class="audio-btn" aria-label="Info">?</button>
				<button type="button" class="audio-btn" aria-label="Previous">⏮</button>
				<button type="button" class="audio-btn audio-play" aria-label={isPlaying ? 'Pause' : 'Play'} on:click={() => (isPlaying = !isPlaying)}>
					{#if isPlaying}
						<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" class="size-5"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>
					{:else}
						<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" class="size-5"><path d="M8 5v14l11-7z" /></svg>
					{/if}
				</button>
				<button type="button" class="audio-btn" aria-label="Next">⏭</button>
				<div class="audio-progress-wrap">
					<div class="audio-progress-bar" style="width: {audioProgress * 100}%"></div>
				</div>
				<span class="audio-time">1:03 / 3:12</span>
			</div>
		</div>
		</div>
	</div>
{:else}
	<div class="detail-page detail-page-error">
		<p>Artwork not found.</p>
		<a href="/artworks" on:click|preventDefault={() => goto('/artworks')}>Back to Gallery</a>
	</div>
{/if}

<style>
	.detail-page {
		min-height: 100%;
		background: #0d0d0d;
		padding: 1rem 1.25rem 2rem;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.detail-page-inner {
		width: 100%;
		max-width: 420px;
	}

	.detail-back {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		color: rgba(255, 255, 255, 0.8);
		text-decoration: none;
		font-size: 0.875rem;
		margin-bottom: 1rem;
		transition: color 0.2s;
	}
	.detail-back:hover {
		color: #fff;
	}

	.detail-viewer-wrap {
		margin-bottom: 1rem;
	}

	.detail-info-card {
		background: #111;
		border-radius: 1rem;
		padding: 1.25rem 1rem 1.5rem;
		color: #fff;
	}

	.detail-title {
		font-size: 1rem;
		font-weight: 700;
		letter-spacing: 0.05em;
		margin: 0 0 0.5rem 0;
	}

	.detail-desc {
		font-size: 0.8125rem;
		line-height: 1.5;
		color: rgba(255, 255, 255, 0.85);
		margin: 0 0 1rem 0;
	}

	.detail-audio {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	.audio-btn {
		width: 2.5rem;
		height: 2.5rem;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.1);
		border: none;
		color: #fff;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.875rem;
		transition: background 0.2s;
	}
	.audio-btn:hover {
		background: rgba(255, 255, 255, 0.2);
	}
	.audio-play {
		background: rgba(255, 255, 255, 0.2);
		width: 2.75rem;
		height: 2.75rem;
	}

	.audio-progress-wrap {
		flex: 1;
		min-width: 80px;
		height: 4px;
		background: rgba(255, 255, 255, 0.2);
		border-radius: 2px;
		overflow: hidden;
	}

	.audio-progress-bar {
		height: 100%;
		background: #2dd4bf;
		border-radius: 2px;
		transition: width 0.2s;
	}

	.audio-time {
		font-size: 0.75rem;
		color: rgba(255, 255, 255, 0.6);
		white-space: nowrap;
	}

	.detail-page-error {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		color: rgba(255, 255, 255, 0.8);
	}
	.detail-page-error a {
		color: #2dd4bf;
		text-decoration: none;
	}
</style>
