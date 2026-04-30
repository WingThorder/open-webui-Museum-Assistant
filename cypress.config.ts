import { defineConfig } from 'cypress';

export default defineConfig({
	e2e: {
		baseUrl: 'http://muse-ar.ddns.net:8080'
	},
	video: true
});
