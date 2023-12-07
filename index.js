// import installed packages parser
const parseInstalledPackages = require('./InstalledPackages');
// import PublicPodFetcher
const getLatestPodVersion = require('./PublicPodFetcher');
// import compareVersions
const compareVersions = require('./CompareVersions');

class CocoapodsTracker {
    /**
     * Creates a new instance of the CocoapodsTracker class.
     * @param {string} podfilePath - The path to the Podfile.
     * @param {string} lockfilePath - The path to the Podfile.lock.
     */
    constructor(podfilePath = './Podfile', lockfilePath = './Podfile.lock') {
        this.podfilePath = podfilePath;
        this.lockfilePath = lockfilePath;
    }

    /**
     * Checks the version of a library against the latest available version.
     * @param {Object} library - The library object containing the name and version.
     * @returns {Promise<void>} - A promise that resolves once the version check is complete.
     */
    checkLibraryVersions = async function(library) {
        try {
            const latest = await getLatestPodVersion(library.name);
            const result = compareVersions(library.version, latest.version);
            console.log(`${library.name}: ${result}`);
        } catch (error) {
            console.error(`Error fetching latest version for ${library.name}: ${error.message}`);
        }
    }

    /**
     * Checks the versions of all libraries in the given array.
     * @param {Array} libraryVersions - An array of library versions to check.
     * @returns {Promise} - A promise that resolves when all library versions have been checked.
     */
    checkAllLibraryVersions = async function(libraryVersions) {
        for (const library of libraryVersions) {
            await this.checkLibraryVersions(library);
        }
    }

    /**
     * Scans the installed packages by parsing the podfile and lockfile.
     * @returns {Promise<void>} A promise that resolves when the scan is complete.
     */
    scan = function() {
        parseInstalledPackages(this.podfilePath, this.lockfilePath)
            .then((result) => {
                // JSON.stringify Print the result in beautiful format with emoji
                // console.log(JSON.stringify(result, null, 2));
                this.checkAllLibraryVersions(result);
            })
            .catch((error) => {
                // Handle errors
                console.error(error);
            });
    }
}

// export the class
module.exports = CocoapodsTracker;