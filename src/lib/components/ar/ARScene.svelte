<script>
  import { onMount } from 'svelte';

  onMount(async () => {
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    try {
      await loadScript('https://aframe.io/releases/1.0.4/aframe.min.js');
      await loadScript('https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js');
      await loadScript('https://raw.githack.com/AR-js-org/studio-backend/master/src/modules/marker/tools/gesture-detector.js');
      await loadScript('https://raw.githack.com/AR-js-org/studio-backend/master/src/modules/marker/tools/gesture-handler.js');
    } catch (error) {
      console.error('Failed to load scripts:', error);
    }
  });
</script>

<div style="margin: 0; overflow: hidden; height: 100vh; width: 100vw;">
  <a-scene
    vr-mode-ui="enabled: false;"
    loading-screen="enabled: false;"
    arjs="trackingMethod: best; sourceType: webcam; debugUIEnabled: false;"
    id="scene"
    embedded
    gesture-detector
  >
    <a-marker
      id="animated-marker"
      type="pattern"
      preset="custom"
      url="assets/marker.patt"
      raycaster="objects: .clickable"
      emitevents="true"
      cursor="fuse: false; rayOrigin: mouse;"
    >
      <a-image
        src="assets/asset.jpeg"
        scale="1 1 1"
        class="clickable"
        rotation="-90 0 0"
        gesture-handler
      ></a-image>
    </a-marker>
    <a-entity camera></a-entity>
  </a-scene>
</div>

<style>
  div {
    position: relative;
  }
</style>