// Internal.
import { handlePendingJobs } from './handlePendingJobs';

// Code.
describe('handlePendingJobs', () => {
  it('should return the number of jobs jobsRemaining', async () => {
    const result = await handlePendingJobs(0);
    expect(result).toBe(0);
  });
});
