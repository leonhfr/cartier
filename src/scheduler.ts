// Packages.
import * as AWSLambda from 'aws-lambda';
import * as debug from 'debug';

// Internal.
import { FLICKR_API_LIMIT } from './constants';
import { handleAreas } from './lib/handleAreas';
import { handlePendingJobs } from './lib/handlePendingJobs';

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

    // Lambda executed every hour (RATE), throttling to avoid exceeding the API limit
    let jobsRemaining = FLICKR_API_LIMIT;
    debugVerbose(`API limit: %d jobs`, jobsRemaining);

    // If there are pending jobs, we schedule them first
    const pendingJobsScheduled = await handlePendingJobs(jobsRemaining);
    jobsRemaining -= pendingJobsScheduled;
    debugVerbose(`%d pending jobs sent`, pendingJobsScheduled);

    // Otherwise, proceed to handling the areas
    const { jobsSent, jobsScheduled } = await handleAreas(jobsRemaining);
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
