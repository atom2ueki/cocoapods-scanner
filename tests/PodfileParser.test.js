// BEGIN: Test cases for parsePodfile function
describe('parsePodfile', () => {
  it('should throw an error if there is an error reading the file', async () => {
    const filePath = '/path/to/nonexistent/Podfile';
    const blockName = 'target';

    await expect(parsePodfile(filePath, blockName)).rejects.toThrowError('Error reading the file');
  });

  it('should call parsePodfileContent with the correct arguments', async () => {
    const filePath = '/path/to/Podfile';
    const blockName = 'target';

    const readFileMock = jest.spyOn(fs, 'readFile').mockResolvedValue('podfile content');
    const parsePodfileContentMock = jest.spyOn(parsePodfileContent, 'parsePodfileContent');

    await parsePodfile(filePath, blockName);

    expect(readFileMock).toHaveBeenCalledWith(filePath, 'utf-8');
    expect(parsePodfileContentMock).toHaveBeenCalledWith('podfile content', blockName);

    readFileMock.mockRestore();
    parsePodfileContentMock.mockRestore();
  });

  it('should return the result of parsePodfileContent', async () => {
    const filePath = '/path/to/Podfile';
    const blockName = 'target';
    const expectedResult = { /* expected result */ };

    jest.spyOn(fs, 'readFile').mockResolvedValue('podfile content');
    jest.spyOn(parsePodfileContent, 'parsePodfileContent').mockResolvedValue(expectedResult);

    const result = await parsePodfile(filePath, blockName);

    expect(result).toEqual(expectedResult);
  });
});
// END: Test cases for parsePodfile function