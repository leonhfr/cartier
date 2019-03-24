// Internal.
import { FLICKR_API_LIMIT } from './constants';
import { main as scheduler } from './scheduler';
import * as areas from './lib/handleAreas';
import * as jobs from './lib/schedulePendingJobs';

// Code.
describe('scheduler', () => {
  it('should be defined', () => {
    expect(scheduler).toBeDefined();
  });
  it('should call the handler functions in the correct order', async () => {
    const handleAreasSpy = jest
      .spyOn(areas, 'handleAreas')
      .mockImplementation(async x => ({
        jobsSent: x / 2,
        jobsScheduled: x / 2,
      }));
    const handlePendingJobsSpy = jest
      .spyOn(jobs, 'schedulePendingJobs')
      .mockImplementation(async () => 0);

    await scheduler(
      {} as AWSLambda.ScheduledEvent,
      {} as AWSLambda.Context,
      (err, res) => {
        expect(handleAreasSpy).toHaveBeenCalledTimes(1);
        expect(handleAreasSpy).toHaveBeenCalledWith(FLICKR_API_LIMIT);
        expect(handlePendingJobsSpy).toHaveBeenCalledTimes(1);
        expect(handlePendingJobsSpy).toHaveBeenCalledWith(FLICKR_API_LIMIT);
        expect(err).toBeFalsy();
        expect(res).toBe('Done');
      }
    );
  });
  it('should catch errors', async () => {
    jest.spyOn(jobs, 'schedulePendingJobs').mockImplementation(async () => {
      throw Error('test_error');
    });

    await scheduler(
      {} as AWSLambda.ScheduledEvent,
      {} as AWSLambda.Context,
      (err, res) => {
        expect(err).toBeTruthy();
        expect(res).toBe('Error');
      }
    );
  });
});
