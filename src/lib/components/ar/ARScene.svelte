<script>
  import { onMount, onDestroy } from 'svelte';

  let sceneElement;
  let isLoaded = false;

  onMount(async () => {
    // Check if A-Frame is already loaded
    if (window.AFRAME) {
      initARScene();
      return;
    }

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
      
      // Wait a bit for AR.js to initialize
      await new Promise(resolve => setTimeout(resolve, 100));
      
      initARScene();
    } catch (error) {
      console.error('Failed to load AR scripts:', error);
      // Fallback: try to initialize even if scripts fail
      initARScene();
    }
  });

  const initARScene = () => {
    if (isLoaded) return;
    
    // Create the AR scene dynamically (matching your working HTML)
    const scene = document.createElement('a-scene');
    scene.setAttribute('vr-mode-ui', 'enabled: false');
    scene.setAttribute('loading-screen', 'enabled: false');
    scene.setAttribute('arjs', 'trackingMethod: best; sourceType: webcam; debugUIEnabled: false');
    scene.setAttribute('id', 'scene');
    scene.setAttribute('embedded', '');
    scene.setAttribute('gesture-detector', '');
    
    // Create marker (matching your working HTML)
    const marker = document.createElement('a-marker');
    marker.setAttribute('id', 'animated-marker');
    marker.setAttribute('type', 'pattern');
    marker.setAttribute('preset', 'custom');
    marker.setAttribute('url', 'assets/marker.patt');
    marker.setAttribute('raycaster', 'objects: .clickable');
    marker.setAttribute('emitevents', 'true');
    marker.setAttribute('cursor', 'fuse: false; rayOrigin: mouse');
    marker.setAttribute('id', 'markerA');
    
    // Add error handling for marker loading
    marker.addEventListener('error', () => {
      console.warn('Failed to load marker.patt, using default marker');
      marker.setAttribute('type', 'hiro'); // Use default Hiro marker as fallback
    });
    
    // Create image (matching your working HTML)
    const image = document.createElement('a-image');
    image.setAttribute('src', 'assets/asset.jpeg');
    image.setAttribute('scale', '1 1 1');
    image.setAttribute('class', 'clickable');
    image.setAttribute('rotation', '-90 0 0');
    image.setAttribute('gesture-handler', '');
    
    // Add error handling for image loading
    image.addEventListener('error', () => {
      console.warn('Failed to load asset.jpeg, using fallback');
      image.setAttribute('src', 'https://via.placeholder.com/500x500/00ff00/000000?text=AR+Image');
    });
    
    marker.appendChild(image);
    scene.appendChild(marker);
    
    // Create camera (matching your working HTML)
    const camera = document.createElement('a-entity');
    camera.setAttribute('camera', '');
    scene.appendChild(camera);
    
    // Append to the scene element
    if (sceneElement) {
      sceneElement.appendChild(scene);
      isLoaded = true;
      
      // Add a loading indicator
      const loadingDiv = document.createElement('div');
      loadingDiv.innerHTML = `
        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: white; font-size: 24px; text-align: center; z-index: 10000;">
          <div style="margin-bottom: 20px;">Initializing AR Scene...</div>
          <div style="width: 40px; height: 40px; border: 4px solid #f3f3f3; border-top: 4px solid #3498db; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto;"></div>
        </div>
        <style>
          @keyframes spin {
            0% { transform: translate(-50%, -50%) rotate(0deg); }
            100% { transform: translate(-50%, -50%) rotate(360deg); }
          }
        </style>
      `;
      sceneElement.appendChild(loadingDiv);
      
      // Remove loading indicator after a short delay
      setTimeout(() => {
        if (loadingDiv.parentNode) {
          loadingDiv.parentNode.removeChild(loadingDiv);
        }
      }, 2000);
      
      // Add debug information
      const debugDiv = document.createElement('div');
      debugDiv.innerHTML = `
        <div style="position: absolute; bottom: 20px; left: 20px; color: white; font-size: 14px; z-index: 10000; background: rgba(0,0,0,0.5); padding: 10px; border-radius: 5px;">
          <div>AR Scene Status: Initialized</div>
          <div>Camera: ${navigator.mediaDevices ? 'Available' : 'Not Available'}</div>
          <div>WebGL: ${window.WebGLRenderingContext ? 'Supported' : 'Not Supported'}</div>
          <div style="margin-top: 10px; font-size: 12px; color: #ccc;">
            If you see this text, the AR scene is working but may need a marker to display content.
          </div>
        </div>
      `;
      sceneElement.appendChild(debugDiv);
      
      // Add camera preview debug
      const cameraPreviewDiv = document.createElement('div');
      cameraPreviewDiv.innerHTML = `
        <div style="position: absolute; top: 20px; right: 20px; color: white; font-size: 12px; z-index: 10000; background: rgba(0,0,0,0.8); padding: 10px; border-radius: 5px; border: 2px solid #00ff00;">
          <div style="font-weight: bold; margin-bottom: 5px;">Camera Preview</div>
          <div>Testing camera access...</div>
        </div>
      `;
      sceneElement.appendChild(cameraPreviewDiv);
      
      // Test camera access
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
          .then(stream => {
            const video = document.createElement('video');
            video.srcObject = stream;
            video.autoplay = true;
            video.muted = true;
            video.style.width = '200px';
            video.style.height = 'auto';
            video.style.border = '2px solid #00ff00';
            video.style.borderRadius = '5px';
            
            cameraPreviewDiv.innerHTML = `
              <div style="position: absolute; top: 20px; right: 20px; color: white; font-size: 12px; z-index: 10000; background: rgba(0,0,0,0.8); padding: 10px; border-radius: 5px; border: 2px solid #00ff00;">
                <div style="font-weight: bold; margin-bottom: 5px;">Camera Preview</div>
                <div style="color: #00ff00;">Camera Access: GRANTED</div>
                <div style="margin-top: 5px; font-size: 11px; color: #ccc;">Stream active</div>
              </div>
            `;
            
            // Add video element to show actual camera feed
            const videoContainer = document.createElement('div');
            videoContainer.style.position = 'absolute';
            videoContainer.style.top = '60px';
            videoContainer.style.right = '20px';
            videoContainer.style.zIndex = '10001';
            videoContainer.style.border = '2px solid #00ff00';
            videoContainer.style.borderRadius = '5px';
            videoContainer.style.overflow = 'hidden';
            videoContainer.appendChild(video);
            sceneElement.appendChild(videoContainer);
            
            // Keep the camera stream active for the duration of the AR scene
            // Store reference to stop it when component is destroyed
            window.currentARStream = stream;
          })
          .catch(err => {
            cameraPreviewDiv.innerHTML = `
              <div style="position: absolute; top: 20px; right: 20px; color: white; font-size: 12px; z-index: 10000; background: rgba(0,0,0,0.8); padding: 10px; border-radius: 5px; border: 2px solid #ff0000;">
                <div style="font-weight: bold; margin-bottom: 5px;">Camera Preview</div>
                <div style="color: #ff0000;">Camera Access: DENIED</div>
                <div style="margin-top: 5px; font-size: 11px; color: #ccc;">Error: ${err.message}</div>
              </div>
            `;
          });
      } else {
        cameraPreviewDiv.innerHTML = `
          <div style="position: absolute; top: 20px; right: 20px; color: white; font-size: 12px; z-index: 10000; background: rgba(0,0,0,0.8); padding: 10px; border-radius: 5px; border: 2px solid #ff0000;">
            <div style="font-weight: bold; margin-bottom: 5px;">Camera Preview</div>
            <div style="color: #ff0000;">Camera API: NOT SUPPORTED</div>
            <div style="margin-top: 5px; font-size: 11px; color: #ccc;">navigator.mediaDevices not available</div>
          </div>
        `;
      }
    }
  };

  onDestroy(() => {
    // Clean up when component is destroyed
    if (sceneElement && sceneElement.firstChild) {
      sceneElement.removeChild(sceneElement.firstChild);
    }
    
    // Stop camera stream if it exists
    if (window.currentARStream) {
      window.currentARStream.getTracks().forEach(track => track.stop());
      window.currentARStream = null;
    }
  });
</script>

<div bind:this={sceneElement} style="margin: 0; overflow: hidden; height: 100vh; width: 100vw; position: fixed; top: 0; left: 0; z-index: 9999; background: #000;">
  <!-- AR scene will be injected here -->
</div>

<style>
  div {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 9999;
    background: #000;
  }
  
  a-scene {
    width: 100%;
    height: 100%;
  }
  
  /* Add some basic styles for the AR scene */
  a-scene {
    background-color: #000;
  }
  
  a-marker {
    background-color: transparent;
  }
  
  a-image {
    background-color: transparent;
  }
</style>
