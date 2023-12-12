/**
 * Compare two version strings.
 * @param {string} currentVersion - The current version string.
 * @param {string} latestVersion - The latest version string.
 * @returns {boolean} - True if the latest version is greater than the current version, false otherwise.
 */
function compareVersions(currentVersion, latestVersion) {
    const currentParts = currentVersion.split('.').map(Number);
    const latestParts = latestVersion.split('.').map(Number);

    for (let i = 0; i < currentParts.length; i++) {
        if (latestParts[i] > currentParts[i]) {
            return true;
        } else if (latestParts[i] < currentParts[i]) {
            return false;
        }
    }

    return false;
}

// export
module.exports = compareVersions;