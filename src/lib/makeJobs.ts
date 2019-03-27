// Packages.
import * as _ from 'lodash';
import * as debug from 'debug';
import * as Wittgenstein from '@scenicroutes/wittgenstein';
import { v4 as uuid } from 'uuid';

// Internal.
import * as Types from '../types';

// Code.
const debugError = debug('cartier:error:makeJobs');
const debugVerbose = debug('cartier:verbose:makeJobs');

export const makeJobs = (
  jobsInput: Array<Types.MakeJobInput>
): Array<Wittgenstein.Job> => {
  debugVerbose(`jobsInput: %j`, jobsInput);

  const jobs = jobsInput.map(input =>
    Wittgenstein.Job.create({
      id: uuid(),
      minUploadDate: input.minUploadDate,
      maxUploadDate: input.maxUploadDate,
      page: input.page,
      zone: input.zone,
    })
  );

  return jobs.filter(job => {
    if (job instanceof Error) {
      debugError(`error creating job: %o,job`);
      return false;
    }
    return true;
  }) as Array<Wittgenstein.Job>;
};
