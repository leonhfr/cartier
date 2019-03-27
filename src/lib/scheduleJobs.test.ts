// Internal.
import { scheduleJobs } from './scheduleJobs';

// Code.
describe('schedulePendingJobs', () => {
  it('should be defined', async () => {
    expect(scheduleJobs).toBeDefined();
  });
  it('should return the number of jobs jobsRemaining', async () => {
    // const result = await schedulePendingJobs(0);
    // expect(result).toBe(0);
  });
});

// TODO: delay the jobs with sqs
