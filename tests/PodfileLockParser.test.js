// BEGIN: Test cases for parsePodfileLock function
describe('parsePodfileLock', () => {
  it('should return an empty array if no packages are found in the Podfile.lock', async () => {
    const filePath = '/path/to/Podfile.lock';
    const searchList = ['package1', 'package2'];

    const result = await parsePodfileLock(filePath, searchList);

    expect(result).toEqual([]);
  });

  it('should return an empty array if the search list is empty', async () => {
    const filePath = '/path/to/Podfile.lock';
    const searchList = [];

    const result = await parsePodfileLock(filePath, searchList);

    expect(result).toEqual([]);
  });

  it('should return an empty array if the Podfile.lock file is empty', async () => {
    const filePath = '/path/to/empty/Podfile.lock';
    const searchList = ['package1', 'package2'];

    const result = await parsePodfileLock(filePath, searchList);

    expect(result).toEqual([]);
  });

  it('should return an array of parsed packages that match the search list', async () => {
    const filePath = '/path/to/Podfile.lock';
    const searchList = ['package1', 'package2'];

    const result = await parsePodfileLock(filePath, searchList);

    expect(result).toEqual([
      { name: 'package1', version: '1.0.0' },
      { name: 'package2', version: '2.0.0' },
    ]);
  });

  it('should ignore packages that are not in the search list', async () => {
    const filePath = '/path/to/Podfile.lock';
    const searchList = ['package1'];

    const result = await parsePodfileLock(filePath, searchList);

    expect(result).toEqual([{ name: 'package1', version: '1.0.0' }]);
  });
});
// END: Test cases for parsePodfileLock function