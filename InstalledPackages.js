// import PodfileLockParser
const parsePodfileLock = require('./PodfileLockParser');
// import PodfileParser
const parsePodfile = require('./PodfileParser');

/**
 * Parses the installed packages by reading the Podfile and Podfile.lock.
 * 
 * @param {PodfileReader} podfileReader - The reader for the Podfile.
 * @param {LockfileReader} lockfileReader - The reader for the Podfile.lock.
 * @param {string[]} blacklist - The list of packages to exclude from parsing.
 * @returns {Promise<InstalledPackage[]>} - A promise that resolves to an array of installed packages.
 * @throws {Error} - If there is an error parsing the installed packages.
 */
async function parseInstalledPackages(podfileReader, lockfileReader, blacklist) {
    try {
        // Parse searchList from Podfile
        const searchList = await parsePodfile(podfileReader, blacklist);

        // Parse packages from Podfile.lock
        const installedPackages = await parsePodfileLock(lockfileReader, searchList);

        return installedPackages;
    } catch (error) {
        console.error('Error parsing installed packages:', error);
        throw error;
    }
}

// export
module.exports = parseInstalledPackages;