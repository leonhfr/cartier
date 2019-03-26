// Packages.
import * as _ from 'lodash';
import * as debug from 'debug';
// import { Eratosthenes } from '@scenicroutes/eratosthenes';
import * as Wittgenstein from '@scenicroutes/wittgenstein';

// Internal.
// import { handleJob } from './handleJob';
import * as Types from '../types';

// Code.
// const debugError = debug('cartier:error:makeJobs');
const debugVerbose = debug('cartier:verbose:makeJobs');

export const makeJobs = async (
  jobsInput: Array<Types.MakeJobInput>
): Promise<Array<Wittgenstein.Job>> => {
  debugVerbose(`jobsInput: %j`, jobsInput);

  return [];
};
