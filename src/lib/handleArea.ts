// Packages.
import * as _ from 'lodash';
import * as debug from 'debug';
import { Eratosthenes } from '@scenicroutes/eratosthenes';
import * as Wittgenstein from '@scenicroutes/wittgenstein';

// Internal.
// import { handleJob } from './handleJob';

// Code.
// const debugError = debug('cartier:error:handleAreas');
const debugVerbose = debug('cartier:verbose:handleAreas');

export const handleAreas = async (
  area: Wittgenstein.Area,
  jobsRemaining: number
): Promise<{ jobsSent: number; jobsScheduled: number }> => {
  debugVerbose(`jobsRemaining: %j`, jobsRemaining);

  const zones = await Eratosthenes.ZoneModel.query(area.id);

  if (zones instanceof Error) {
    throw zones;
  }

  // Get zones from DynamoDB
  // const zones

  // Send first jobs remaining zones to job scheduler and await response

  // Send the others as jobs with page 0

  // Send the responses

  return { jobsSent: 0, jobsScheduled: 0 };
};
