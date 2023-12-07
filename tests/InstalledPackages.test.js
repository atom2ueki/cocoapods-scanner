// Import the necessary dependencies and modules
const { parseInstalledPackages } = require('../InstalledPackages');
const { parsePodfile, parsePodfileLock } = require('../parser');

// Mock the dependencies
jest.mock('../parser', () => ({
  parsePodfile: jest.fn(),
  parsePodfileLock: jest.fn()
}));

describe('parseInstalledPackages', () => {
  it('should parse installed packages correctly', async () => {
    // Mock the dependencies' return values
    const podfilePath = '/path/to/Podfile';
    const lockfilePath = '/path/to/Podfile.lock';
    const searchList = ['package1', 'package2'];
    const installedPackages = ['package1@1.0.0', 'package2@2.0.0'];

    parsePodfile.mockResolvedValueOnce(searchList);
    parsePodfileLock.mockResolvedValueOnce(installedPackages);

    // Call the function
    const result = await parseInstalledPackages(podfilePath, lockfilePath);

    // Assert that the result is as expected
    expect(result).toEqual(installedPackages);

    // Assert that the dependencies were called with the correct arguments
    expect(parsePodfile).toHaveBeenCalledWith(podfilePath, 'thirdparty_components');
    expect(parsePodfileLock).toHaveBeenCalledWith(lockfilePath, searchList);
  });

  it('should throw an error if there is an error parsing the packages', async () => {
    // Mock the dependencies to throw an error
    const podfilePath = '/path/to/Podfile';
    const lockfilePath = '/path/to/Podfile.lock';
    const error = new Error('Parsing failed');

    parsePodfile.mockRejectedValueOnce(error);

    // Call the function and expect it to throw an error
    await expect(parseInstalledPackages(podfilePath, lockfilePath)).rejects.toThrowError(error);

    // Assert that the dependencies were called with the correct arguments
    expect(parsePodfile).toHaveBeenCalledWith(podfilePath, 'thirdparty_components');
    expect(parsePodfileLock).not.toHaveBeenCalled();
  });
});