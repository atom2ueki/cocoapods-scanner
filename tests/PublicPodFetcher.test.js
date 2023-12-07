// BEGIN: Test cases for getLatestPodVersion function
describe('getLatestPodVersion', () => {
  it('should return the latest version of a library', async () => {
    // Mock the axios.get function to return a response with the desired HTML content
    axios.get.mockResolvedValueOnce({ data: '<html>...</html>' });

    // Call the function with a library name
    const result = await getLatestPodVersion('libraryName');

    // Assert that the result is as expected
    expect(result).toEqual({
      library: 'libraryName',
      version: '1.0.0' // Replace with the expected version
    });
  });

  it('should throw an error if there is an error making the request', async () => {
    // Mock the axios.get function to throw an error
    axios.get.mockRejectedValueOnce(new Error('Request failed'));

    // Call the function with a library name and expect it to throw an error
    await expect(getLatestPodVersion('libraryName')).rejects.toThrowError('Request failed');
  });
});
// END: Test cases for getLatestPodVersion function