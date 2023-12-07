// BEGIN: Test cases for compareVersions function
describe('compareVersions', () => {
  it('should return "New version available" if latest version is greater than current version', () => {
    const currentVersion = '1.2.3';
    const latestVersion = '2.0.0';

    const result = compareVersions(currentVersion, latestVersion);

    expect(result).toBe('New version available: 2.0.0');
  });

  it('should return "Library is up to date" if latest version is less than current version', () => {
    const currentVersion = '2.0.0';
    const latestVersion = '1.2.3';

    const result = compareVersions(currentVersion, latestVersion);

    expect(result).toBe('Library is up to date: 2.0.0');
  });

  it('should return "Library is up to date" if latest version is equal to current version', () => {
    const currentVersion = '1.2.3';
    const latestVersion = '1.2.3';

    const result = compareVersions(currentVersion, latestVersion);

    expect(result).toBe('Library is up to date: 1.2.3');
  });
});
// END: Test cases for compareVersions function