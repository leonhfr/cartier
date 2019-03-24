// Internal.
import { schedulePendingJobs } from './schedulePendingJobs';

// Code.
describe('schedulePendingJobs', () => {
  it('should return the number of jobs jobsRemaining', async () => {
    const result = await schedulePendingJobs(0);
    expect(result).toBe(0);
  });
});
