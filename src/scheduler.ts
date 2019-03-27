// Packages.
import * as AWSLambda from 'aws-lambda';
import * as debug from 'debug';

// Internal.
import Config from './lib/Config';
import { FLICKR_API_LIMIT } from './constants';
import { fetchAreas } from './lib/fetchAreas';
import { fetchJobs } from './lib/fetchJobs';
import { fetchZones } from './lib/fetchZones';
import { makeJobs } from './lib/makeJobs';
import { postponeJobs } from './lib/postponeJobs';
import { scheduleJobs } from './lib/scheduleJobs';
import * as Types from './types';

// Code.
const debugError = debug('cartier:error:scheduler');
const debugVerbose = debug('cartier:verbose:scheduler');

export const main = async (
  event: AWSLambda.ScheduledEvent,
  context: AWSLambda.Context,
  callback: AWSLambda.Callback
) => {
  try {
    debugVerbose(`event: %j`, event);
    debugVerbose(`context: %j`, context);

    // Lambda executed every (RATE), throttling to avoid exceeding the API limit
    const maximumJobs = Config.flickrLimit || FLICKR_API_LIMIT;

    debugVerbose(`API limit: %d jobs`, maximumJobs);

    // We fetch any pending jobs
    const pendingJobs = await fetchJobs(maximumJobs);
    debugVerbose(`pending jobs: %o`, pendingJobs);

    // If there are pending jobs, we schedule them first
    if (pendingJobs.length) {
      const scheduleResponse = await scheduleJobs(pendingJobs);
      debugVerbose(`schedule response: %o`, scheduleResponse);
    }

    const remainingJobs = maximumJobs - pendingJobs.length;

    // If we can't schedule more jobs, we exit early
    if (remainingJobs === 0) {
      debugVerbose(`maximum jobs scheduled, exiting early...`);

      return callback(undefined, 'Done');
    }

    // We define the time until when to update as now
    const now = Math.floor(Date.now() / 1000);
    debugVerbose(`now: %d`, now);

    // We get the areas that have to be updated
    const areas = await fetchAreas(now);
    debugVerbose(`areas: %o`, areas);

    // We get the zones of the areas that have to be updated
    // We also receive the last time the area was scheduled at
    const timedZones = await fetchZones(areas);
    debugVerbose(`timedZones: %o`, timedZones);

    // We generate the jobs
    const makeJobsInput: Array<Types.MakeJobInput> = timedZones.map(
      timedZone => ({
        minUploadDate: timedZone.lastUpdate,
        maxUploadDate: now,
        page: 1,
        zone: timedZone.zone,
      })
    );
    const jobs = makeJobs(makeJobsInput);
    debugVerbose(`jobs: %o`, jobs);

    // We schedule as much as possible, and postpone the rest
    const jobsToSchedule = jobs.slice(0, remainingJobs);
    const jobsToPostpone = jobs.slice(remainingJobs);

    await scheduleJobs(jobsToSchedule);
    await postponeJobs(jobsToPostpone);

    return callback(undefined, 'Done');
  } catch (err) {
    debugError(err);
    return callback(err, 'Error');
  }
};
