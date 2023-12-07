/**
 * Compares two version strings and determines if a new version is available.
 * @param {string} currentVersion - The current version string.
 * @param {string} latestVersion - The latest version string to compare against.
 * @returns {string} - A message indicating if a new version is available or if the library is up to date.
 */
function compareVersions(currentVersion, latestVersion) {
    // Compare logic here (you can use a library like semver for more advanced version comparison)
    // For simplicity, let's assume version strings are in the format major.minor.patch
    const currentParts = currentVersion.split('.').map(Number);
    const latestParts = latestVersion.split('.').map(Number);

    for (let i = 0; i < currentParts.length; i++) {
        if (latestParts[i] > currentParts[i]) {
            return `New version available: ${latestVersion}`;
        } else if (latestParts[i] < currentParts[i]) {
            return `Library is up to date: ${currentVersion}`;
        }
    }

    return `Library is up to date: ${currentVersion}`;
}

// export
module.exports = compareVersions;