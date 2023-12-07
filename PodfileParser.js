const fs = require('fs').promises;

/**
 * Parses a Podfile and returns the content of a specific block.
 *
 * @param {string} filePath - The path to the Podfile.
 * @param {string} blockName - The name of the block to filter by.
 * @returns {Promise<any>} - A promise that resolves with the content of the specified block.
 * @throws {Error} - If there is an error reading the file.
 */
async function parsePodfile(filePath, blockName) {
    try {
        // Read file content
        const podfileContent = await fs.readFile(filePath, 'utf-8');

        // Call the existing parsePodfileContent function with the option to filter by blockName
        return parsePodfileContent(podfileContent, blockName);
    } catch (error) {
        console.error('Error reading the file:', error);
        throw error;
    }
}

/**
 * Parses the content of a Podfile and extracts the dependencies within the specified block.
 * @param {string} podfileContent - The content of the Podfile.
 * @param {string} blockName - The name of the block to extract dependencies from.
 * @returns {string[]} An array of dependencies extracted from the Podfile block.
 */
function parsePodfileContent(podfileContent, blockName) {
    const dependencies = new Set();

    // Construct regex to match pod entries within the specified block
    const blockRegex = new RegExp(`def\\s+${blockName}[^]*?end`, 'g');
    const podRegex = /pod\s+['"]([^'"]+)['"]/g;

    let match;
    let blockMatch = blockRegex.exec(podfileContent);
    if (blockMatch) {
        // If the block is found, extract dependencies within the block
        while ((match = podRegex.exec(blockMatch[0])) !== null) {
            const fullName = match[1];
            const parts = fullName.split('/');

            if (parts.length === 1) {
                // If there is no slash, it's a top-level dependency
                dependencies.add(parts[0]);
            }
        }
    }

    return Array.from(dependencies);
}

module.exports = parsePodfile;