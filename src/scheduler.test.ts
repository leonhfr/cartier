// Internal.
// import { FLICKR_API_LIMIT } from './constants';
import { main as scheduler } from './scheduler';
// import * as areas from './lib/makeJobs';
// import * as jobs from './lib/scheduleJobs';

// Code.
describe('scheduler', () => {
  it('should be defined', () => {
    expect(scheduler).toBeDefined();
  });
  // it('should call the handler functions in the correct order', async () => {
  //   const handleAreasSpy = jest
  //     .spyOn(areas, 'handleAreas')
  //     .mockImplementation(async x => ({
  //       jobsSent: x / 2,
  //       jobsScheduled: x / 2,
  //     }));
  //   const scheduleJobsSpy = jest
  //     .spyOn(jobs, 'scheduleJobs')
  //     .mockImplementation(async () => []);
  //
  //   await scheduler(
  //     {} as AWSLambda.ScheduledEvent,
  //     {} as AWSLambda.Context,
  //     (err, res) => {
  //       expect(handleAreasSpy).toHaveBeenCalledTimes(1);
  //       expect(handleAreasSpy).toHaveBeenCalledWith(FLICKR_API_LIMIT);
  //       expect(scheduleJobsSpy).toHaveBeenCalledTimes(1);
  //       expect(scheduleJobsSpy).toHaveBeenCalledWith(FLICKR_API_LIMIT);
  //       expect(err).toBeFalsy();
  //       expect(res).toBe('Done');
  //     }
  //   );
  // });
  // it('should catch errors', async () => {
  //   jest.spyOn(jobs, 'scheduleJobs').mockImplementation(async () => {
  //     throw Error('test_error');
  //   });
  //
  //   await scheduler(
  //     {} as AWSLambda.ScheduledEvent,
  //     {} as AWSLambda.Context,
  //     (err, res) => {
  //       expect(err).toBeTruthy();
  //       expect(res).toBe('Error');
  //     }
  //   );
  // });
});
