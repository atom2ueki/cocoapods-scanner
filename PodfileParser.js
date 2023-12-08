
/**
 * Parses the content of a Podfile and returns the parsed result.
 * @param {Object} reader - The reader object used to fetch the Podfile content.
 * @param {Array} blacklist - The list of items to be blacklisted.
 * @returns {Promise} - A promise that resolves to the parsed result of the Podfile.
 * @throws {Error} - If there is an error reading the file.
 */
async function parsePodfile(reader, blacklist) {
    try {
        const podfileContent = await reader.fetch();
        return parsePodfileContent(podfileContent, blacklist);
    } catch (error) {
        console.error('Error reading the file:', error);
        throw error;
    }
}

/**
 * Parses the content of a Podfile and extracts the dependencies.
 * 
 * @param {string} podfileContent - The content of the Podfile.
 * @param {string[]} blacklist - An array of dependencies to exclude from the result.
 * @returns {string[]} - An array of dependencies extracted from the Podfile, excluding those in the blacklist.
 */
function parsePodfileContent(podfileContent, blacklist) {
    const dependencies = new Set();
    const podRegex = /pod\s+['"]([^'"]+)['"]/g;

    let match;

    // Iterate over all 'pod' statements
    while ((match = podRegex.exec(podfileContent)) !== null) {
        const fullName = match[1];
        const parts = fullName.split('/');

        if (parts.length === 1) {
            // If there is no slash, it's a top-level dependency
            dependencies.add(parts[0]);
        }
    }

    // Convert Set to an array and exclude entries found in the blacklist
    const result = Array.from(dependencies).filter(dependency => !blacklist.includes(dependency));

    return result;
}

module.exports = parsePodfile;