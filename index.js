// import installed packages parser
const parseInstalledPackages = require('./InstalledPackages');
// import PublicPodFetcher
const getLatestPodVersion = require('./PublicPodFetcher');
// import compareVersions
const compareVersions = require('./CompareVersions');

/**
 * Creates an enum object with the given values.
 * @param {...any} values - The values to be included in the enum.
 * @returns {Object} - The enum object.
 */
function createEnum(...values) {
    return Object.freeze(
        values.reduce((acc, value) => {
            acc[value] = value;
            return acc;
        }, {})
    );
}

/**
 * Enum representing the types of content readers.
 * @enum {string}
 * @readonly
 * @memberof module:ContentReader
 */
const ContentReaderType = createEnum(
    'file', 'url', 'github'
);

const { promisify } = require('util');
const fs = require('fs');
const readFileAsync = promisify(fs.readFile);
// import GithubFetcher
const GithubFetcher = require('./GithubFetcher')
// import RemoteFileFetcher
const RemoteFileFetcher = require('./RemoteFileFetcher');

/**
 * Represents a content reader that fetches content from different sources.
 */
class ContentReader {
    /**
     * Creates a new instance of the class.
     * @param {string} type - The type of reader.
     * @param {Object} request - The request object containing the path, owner, and repo.
     */
    constructor(type, request) {
        this.type = type;
        this.request = request;
    }

    /**
     * Fetches the content based on the type of reader.
     * If the type is URL, it fetches the content from a remote file.
     * If the type is GitHub, it fetches the content from a GitHub repository.
     * Otherwise, it reads the content from a local file.
     * @returns {Promise<string>} The fetched content.
     */
    async fetch() {
        // check if it's a URL or local file
        if (this.type === ContentReaderType.url) {
            // general remote file fetcher
            let fetcher = new RemoteFileFetcher(this.request.path)
            const content = await fetcher.fetch()
            return content;
        } else if (this.type === ContentReaderType.github) {
            // github file fetcher
            let fetcher = new GithubFetcher({
                owner: this.request.owner,
                repo: this.request.repo,
                path: this.request.path
            })
            const content = await fetcher.fetch()
            return content;
        } else {
            // Read local file content
            const content = await readFileAsync(this.request.path, 'utf-8');
            return content;
        }
    }
}

class CocoapodsScanner {
    /**
     * Creates a new instance of the CocoapodsScanner.
     * @param {PodfileReader} podfileReader - The reader for the Podfile.
     * @param {LockfileReader} lockfileReader - The reader for the Lockfile.
     * @param {string[]} blacklist - The list of blacklisted pods.
     */
    constructor(podfileReader, lockfileReader, blacklist) {
        this.podfileReader = podfileReader;
        this.lockfileReader = lockfileReader;
        this.blacklist = blacklist;
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
        parseInstalledPackages(this.podfileReader, this.lockfileReader, this.blacklist)
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

// export the CocoapodsScanner & ContentReader
module.exports = {
    CocoapodsScanner,
    ContentReader,
    ContentReaderType
};