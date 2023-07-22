import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},

	server: {
		// Set `host: true` if inside GitHub Codespaces to listen on all addresses,
		// see https://vitejs.dev/config/server-options.html#server-host
		host: !!process.env.CODESPACES,
	  },
});
