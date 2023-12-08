const axios = require('axios');

/**
 * Represents a file fetcher that fetches file content using Axios.
 */
class RemoteFileFetcher {
    constructor(path) {
        this.path = path;
    }

    /**
     * Fetches the file content.
     * @returns {Promise<string>} The file content.
     */
    async fetch() {
        // fetch file content using Axios
        const response = await axios.get(filePath);
        const content = response.data;
        return content;
    }
}

// export RemoteFileFetcher
module.exports = RemoteFileFetcher;