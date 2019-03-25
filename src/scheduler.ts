// Packages.
import * as AWSLambda from 'aws-lambda';
import * as debug from 'debug';

// Internal.
import Config from './lib/Config';
import { FLICKR_API_LIMIT } from './constants';
import { handleAreas } from './lib/makeJobs';
import { schedulePendingJobs } from './lib/scheduleJobs';

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

    // If there are pending jobs, we schedule them first
    const pendingJobsScheduled = await schedulePendingJobs(maximumJobs);
    debugVerbose(`%d pending jobs sent`, pendingJobsScheduled);

    // Otherwise, proceed to handling the areas
    const { jobsSent, jobsScheduled } = await handleAreas(
      maximumJobs - pendingJobsScheduled
    );
    debugVerbose(
      `%d jobs sent, %d pending jobs scheduled`,
      jobsSent,
      jobsScheduled
    );

    return callback(undefined, 'Done');
  } catch (err) {
    debugError(err);
    return callback(err, 'Error');
  }
};
