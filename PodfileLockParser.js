/**
 * Parses the content of a Podfile.lock using the provided reader and search list.
 * @param {object} reader - The reader object used to fetch the content of the file.
 * @param {Array} searchList - The list of items to search for in the Podfile.lock.
 * @returns {Promise} - A promise that resolves to the parsed result of the Podfile.lock.
 * @throws {Error} - If there is an error reading the file.
 */
async function parsePodfileLock(reader, searchList) {
    try {
        const content = await reader.fetch();
        return parsePodfileLockContent(content, searchList);
    } catch (error) {
        console.error('Error reading the file:', error);
        throw error;
    }
}

// create parsePodfileLockContent function
function parsePodfileLockContent(podfileLockContent, searchList) {
    const regex = /(\w+)\s+\(([\d.]+)\)/g;
    const parsedPackages = [];

    let match;
    while ((match = regex.exec(podfileLockContent)) !== null) {
        const name = match[1];
        const version = match[2];

        if (searchList.includes(name)) {
            parsedPackages.push({ name, version });
        }
    }

    return parsedPackages;
}

module.exports = parsePodfileLock;