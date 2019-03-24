// Internal.
import Config from './Config';

// Code.
describe('Config', () => {
  it('should return the expected defaults', () => {
    expect(Config.account).toBe(0);
    expect(Config.bucket).toBe('');
    expect(Config.flickrKey).toBe('');
    expect(Config.timeout).toBe(0);
  });
});
