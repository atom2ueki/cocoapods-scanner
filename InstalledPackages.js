// import PodfileLockParser
const parsePodfileLock = require('./PodfileLockParser');
// import PodfileParser
const parsePodfile = require('./PodfileParser');

/**
 * Parses the installed packages by parsing the Podfile and Podfile.lock.
 * 
 * @param {string} podfilePath - The path to the Podfile.
 * @param {string} lockfilePath - The path to the Podfile.lock.
 * @returns {Promise<Array<string>>} - A promise that resolves to an array of installed packages.
 * @throws {Error} - If there is an error parsing the installed packages.
 */
async function parseInstalledPackages(podfilePath, lockfilePath) {
    try {
        // Parse searchList from Podfile
        const searchList = await parsePodfile(podfilePath, 'thirdparty_components');

        // Parse packages from Podfile.lock
        const installedPackages = await parsePodfileLock(lockfilePath, searchList);

        return installedPackages;
    } catch (error) {
        console.error('Error parsing installed packages:', error);
        throw error;
    }
}

// export
module.exports = parseInstalledPackages;