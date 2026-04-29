import { defineConfig } from 'cypress';

export default defineConfig({
	e2e: {
		baseUrl: 'http://49.130.248.249:8080'
	},
	video: true
});
