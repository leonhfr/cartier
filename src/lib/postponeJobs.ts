// Packages.
import * as _ from 'lodash';
import * as debug from 'debug';
import { Eratosthenes } from '@scenicroutes/eratosthenes';
import * as Wittgenstein from '@scenicroutes/wittgenstein';

// Internal.

// Code.
const debugVerbose = debug('cartier:verbose:scheduleJobs');

export const postponeJobs = async (jobs: Array<Wittgenstein.Job>) => {
  debugVerbose(`jobs: %o`, jobs);

  const response = await Promise.all(
    jobs.map(job => Eratosthenes.JobModel.put(job))
  );

  return response;
};
