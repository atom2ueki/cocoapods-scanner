const axios = require('axios');
const cheerio = require('cheerio');

/**
 * Retrieves the latest version of a CocoaPod library.
 * @param {string} libraryName - The name of the library.
 * @returns {Promise<{ library: string, version: string }>} - The library name and its latest version.
 * @throws {Error} - If an error occurs during the retrieval process.
 */
async function getLatestPodVersion(libraryName) {
  try {
    // Make a request to the CocoaPods search page
    const response = await axios.get(`https://cocoapods.org/pods/${libraryName}`);
    
    // Load the HTML content into Cheerio for easier manipulation
    const $ = cheerio.load(response.data);

    // Extract the version information from the specific hierarchy
    const version = $('.container > article > div > h1 > span').first().text().trim();

    return {
      library: libraryName,
      version: version
    };

  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
}

// export
module.exports = getLatestPodVersion;