// unplugin-html-transform.js
import { createUnplugin } from 'unplugin';

const HtmlTransformPlugin = createUnplugin(() => ({
    name: 'html-transform',
    enforce: 'pre',
    transformInclude(id) {
        return id.endsWith('.html');
    },
    transform(code) {
        const updatedCode = code.replace(/src="https:\/\/raw\.githubusercontent\.com\/[^/]+\/[^/]+\/[^/]+\/[^"]+"/g, (match) => {
            return match.replace(/https:\/\/raw\.githubusercontent\.com\/[^/]+\/[^/]+\/[^/]+\//, '../../');
        });
        return {
            code: updatedCode,
            map: null
        };
    }
}));

export default HtmlTransformPlugin;
