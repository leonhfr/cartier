// Packages.
import * as debug from 'debug';
import { Eratosthenes } from '@scenicroutes/eratosthenes';
import * as Wittgenstein from '@scenicroutes/wittgenstein';

// Internal.

// Code.
const debugError = debug('cartier:error:fetchJobs');
const debugVerbose = debug('cartier:verbose:fetchJobs');

export const fetchJobs = async (
  maximumJobs: number
): Promise<Array<Wittgenstein.Job>> => {
  const jobs = await Eratosthenes.JobModel.list(maximumJobs);

  debugVerbose(`jobs: %o`, jobs);

  if (jobs instanceof Error) {
    throw jobs;
  }

  const deleteResponses = await Promise.all(
    jobs.ok.map(job => Eratosthenes.JobModel.delete(job.id))
  );

  debugVerbose(`deleteResponses: %o`, deleteResponses);

  const deleteErrors = deleteResponses.filter(
    response => response instanceof Error
  ) as Array<Error>;

  const errors: Array<Error> = [...jobs.err, ...deleteErrors];

  errors.push(...jobs.err);

  for (const error of errors) {
    debugError(`Error: %o`, error);
  }

  return jobs.ok;
};
