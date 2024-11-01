import { defineConfig } from 'vite'
import { resolve } from 'path'
import * as glob from 'glob'
import HtmlTransformPlugin from './html-transform-plugin.js';

// Function to automatically generate input entries
function generateInputEntries() {
    const pattern = './**/index.html';
    const files = glob.sync(pattern, { absolute: true });

    const entries = {};
    files.forEach(file => {
        const normalizedPath = file.replace(/\\/g, '/'); // Normalize path for Windows compatibility

        // Skip files in any '/dist/' directory
        if (!normalizedPath.includes('/dist/')) {
            const pathSegments = normalizedPath.split('/');
            // Create a key for the entries object using directory names just above 'index.html'
            const name = pathSegments.slice(-3, -1).join('-'); // Customize this slicing as needed

            // Ensure to resolve the file path correctly
            entries[name] = resolve(file);
        }
    });

    return entries;
}

export default defineConfig({
    plugins: [HtmlTransformPlugin.vite()],
    build: {
        rollupOptions: {
            input: generateInputEntries(),
        },
    },
})
