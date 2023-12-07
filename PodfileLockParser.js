const fs = require('fs').promises;

/**
 * Parses the contents of a Podfile.lock file and returns an array of packages that match the search list.
 * @param {string} filePath - The path to the Podfile.lock file.
 * @param {string[]} searchList - The list of package names to search for.
 * @returns {Promise<{ name: string, version: string }[]>} - A promise that resolves to an array of parsed packages.
 * @throws {Error} - If there is an error reading the Podfile.lock file.
 */
async function parsePodfileLock(filePath, searchList) {
    try {
        // Read the contents of the Podfile.lock file asynchronously
        const fileContent = await fs.readFile(filePath, 'utf-8');

        // Regular expression to match pod entries
        const regex = /(\w+)\s+\(([\d.]+)\)/g;

        // Array to store parsed packages
        const parsedPackages = [];

        // Iterate over matches in the file content
        let match;
        while ((match = regex.exec(fileContent)) !== null) {
            const name = match[1];
            const version = match[2];

            // Check if the current pod is in the search list
            if (searchList.includes(name)) {
                // Store the result in the specified format
                parsedPackages.push({ name, version });
            }
        }

        // Return the parsed packages
        return parsedPackages;
    } catch (err) {
        // Handle file read errors
        console.error('Error reading Podfile.lock:', err.message);
        throw err;
    }
}

module.exports = parsePodfileLock;