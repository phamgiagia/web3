import { defineConfig } from 'vite'
import { resolve } from 'path'
import * as glob from 'glob'
import HtmlTransformPlugin from './html-transform-plugin.js';

// Plugin to truncate console logs
const consoleTruncatePlugin = () => {
    return {
      name: 'vite-plugin-console-truncate',
      transform(code, id) {
        // Only transform JavaScript/TypeScript files
        if (!/\.(js|ts|jsx|tsx)$/.test(id)) {
          return null;
        }
  
        // Replace console.log statements with truncated versions
        const transformedCode = code.replace(
          /console\.log\((.*?)\)/g,
          (match, args) => {
            return `console.log(${args}.toString().substring(0, 500))`; // Truncate to 500 characters
          }
        );
  
        return {
          code: transformedCode,
          map: null
        };
      }
    };
  };

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


// // Vite configuration
// export default defineConfig({
//     plugins: [
//       HtmlTransformPlugin.vite(),
//       consoleTruncatePlugin()
//     ],
//     build: {
//       rollupOptions: {
//         input: generateInputEntries(),
//       },
//     },
//     // Add console output configuration
//     logger: {
//       // Limit console output length
//       maxLength: 500,
//       // Optional: Customize which console methods to truncate
//       filter: {
//         include: ['log', 'info', 'warn', 'error'],
//         exclude: ['debug', 'trace']
//       }
//     }
//   });