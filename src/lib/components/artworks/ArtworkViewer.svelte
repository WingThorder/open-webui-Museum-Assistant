<script lang="ts">
	export let imageUrl: string;
	/** Optional: multiple image URLs for real 360° sequence; if provided, drag cycles through these */
	export let angles: string[] = [];
	export let alt = 'Artwork';
	/** Fallback image when the main image fails to load */
	export let placeholderUrl = '/artworks/placeholder.svg';

	let rotateX = 0;
	let rotateY = 0;
	let isDragging = false;
	let startX = 0;
	let startY = 0;
	let startRotateX = 0;
	let startRotateY = 0;

	// Multi-angle: current frame index
	let frameIndex = 0;
	let totalFrames = 0;
	let useMultiAngle = false;
	let currentImageUrl = imageUrl;
	$: totalFrames = angles?.length || 0;
	$: useMultiAngle = totalFrames > 1;
	$: currentImageUrl = useMultiAngle ? angles[frameIndex] : imageUrl;

	function handlePointerDown(e: PointerEvent) {
		isDragging = true;
		startX = e.clientX;
		startY = e.clientY;
		startRotateX = rotateX;
		startRotateY = rotateY;
		(e.target as HTMLElement).setPointerCapture?.(e.pointerId);
	}

	function handlePointerMove(e: PointerEvent) {
		if (!isDragging) return;
		const dx = e.clientX - startX;
		const dy = e.clientY - startY;
		if (useMultiAngle) {
			// Each ~40px drag = next/prev frame
			const delta = Math.floor((startX - e.clientX) / 40);
			const next = (frameIndex + delta) % totalFrames;
			frameIndex = next < 0 ? totalFrames + next : next;
			startX = e.clientX;
		} else {
			rotateY = startRotateY + dx * 0.6;
			rotateX = Math.max(-20, Math.min(20, startRotateX - dy * 0.3));
		}
	}

	function handlePointerUp(e: PointerEvent) {
		isDragging = false;
		(e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
	}

	function rotateLeft() {
		if (useMultiAngle) {
			frameIndex = (frameIndex - 1 + totalFrames) % totalFrames;
		} else {
			rotateY -= 25;
		}
	}

	function rotateRight() {
		if (useMultiAngle) {
			frameIndex = (frameIndex + 1) % totalFrames;
		} else {
			rotateY += 25;
		}
	}
</script>

<div
	class="viewer"
	role="region"
	aria-label="Rotate to view from different angles"
	on:pointerdown={handlePointerDown}
	on:pointermove={handlePointerMove}
	on:pointerup={handlePointerUp}
	on:pointerleave={handlePointerUp}
	on:keydown={(e) => {
		if (e.key === 'ArrowLeft') {
			e.preventDefault();
			rotateLeft();
		} else if (e.key === 'ArrowRight') {
			e.preventDefault();
			rotateRight();
		}
	}}
	tabindex="0"
>
	<!-- Curved arrow hint: left -->
	<div class="arrow-hint arrow-left" aria-hidden="true">
		<svg viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M 10 30 Q 40 10, 70 30"
				stroke="rgba(255,255,255,0.8)"
				stroke-width="2"
				stroke-dasharray="4 4"
				stroke-linecap="round"
				fill="none"
			/>
			<path d="M 65 22 L 70 30 L 65 38" stroke="rgba(255,255,255,0.9)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none" />
		</svg>
	</div>
	<!-- Curved arrow hint: right -->
	<div class="arrow-hint arrow-right" aria-hidden="true">
		<svg viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M 70 30 Q 40 50, 10 30"
				stroke="rgba(255,255,255,0.8)"
				stroke-width="2"
				stroke-dasharray="4 4"
				stroke-linecap="round"
				fill="none"
			/>
			<path d="M 15 38 L 10 30 L 15 22" stroke="rgba(255,255,255,0.9)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none" />
		</svg>
	</div>

	<div
		class="viewer-inner"
		style="transform: perspective(1200px) rotateX({rotateX}deg) rotateY({rotateY}deg);"
	>
		<img src={currentImageUrl} alt={alt} class="viewer-img" draggable="false" on:error={(e) => { const el = e.currentTarget; if (el && el.getAttribute('src') !== placeholderUrl) el.setAttribute('src', placeholderUrl); }} />
	</div>

	<button type="button" class="rotate-btn rotate-btn-left" aria-label="View from left" on:click|stopPropagation={rotateLeft}>
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-5"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" /></svg>
	</button>
	<button type="button" class="rotate-btn rotate-btn-right" aria-label="View from right" on:click|stopPropagation={rotateRight}>
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
	</button>
</div>

<style>
	.viewer {
		position: relative;
		width: 100%;
		aspect-ratio: 4 / 5;
		max-height: 55vh;
		max-width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: grab;
		touch-action: none;
		border-radius: 1rem;
		overflow: hidden;
		background: linear-gradient(180deg, #1a1a1a 0%, #0d0d0d 100%);
	}
	@media (min-width: 640px) {
		.viewer {
			max-height: 70vh;
			max-width: min(420px, 100%);
		}
	}
	.viewer:active {
		cursor: grabbing;
	}

	.arrow-hint {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		width: 5rem;
		height: 4rem;
		pointer-events: none;
		z-index: 2;
	}
	.arrow-left {
		left: 0.5rem;
	}
	.arrow-right {
		right: 0.5rem;
	}
	.arrow-right svg {
		transform: scaleX(-1);
	}

	.viewer-inner {
		width: 85%;
		height: 85%;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: transform 0.1s ease-out;
		will-change: transform;
	}

	.viewer-img {
		max-width: 100%;
		max-height: 100%;
		object-fit: contain;
		user-select: none;
		pointer-events: none;
		border-radius: 0.5rem;
	}

	.rotate-btn {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		width: 2.5rem;
		height: 2.5rem;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.15);
		border: 1px solid rgba(255, 255, 255, 0.3);
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		z-index: 3;
		transition: background 0.2s;
	}
	.rotate-btn:hover {
		background: rgba(255, 255, 255, 0.25);
	}
	.rotate-btn-left {
		left: 0.75rem;
	}
	.rotate-btn-right {
		right: 0.75rem;
	}
</style>
