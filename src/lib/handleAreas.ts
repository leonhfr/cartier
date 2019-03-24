// Packages.
import * as _ from 'lodash';
import * as debug from 'debug';
// import { Eratosthenes } from '@scenicroutes/eratosthenes';

// Internal.

// Code.
// const debugError = debug('cartier:error:handleAreas');
const debugVerbose = debug('cartier:verbose:handleAreas');

export const handleAreas = async (
  jobsRemaining: number
): Promise<{ jobsSent: number; jobsScheduled: number }> => {
  debugVerbose(`jobsRemaining: %j`, jobsRemaining);

  // Get zones from DynamoDB
  // const zones

  // Send first jobs remaining zones to job scheduler and await response

  // Send the others as jobs with page 0

  // Send the responses

  return { jobsSent: 0, jobsScheduled: 0 };
};
