// Packages.
// import * as AWS from 'aws-sdk';
import * as _ from 'lodash';
import * as debug from 'debug';
// import { Eratosthenes } from '@scenicroutes/eratosthenes';
import * as Wittgenstein from '@scenicroutes/wittgenstein';

// Internal.
// import Config from './Config';

// Code.
// const debugError = debug('cartier:error:scheduleJobs');
const debugVerbose = debug('cartier:verbose:scheduleJobs');

export const postponeJobs = async (jobs: Array<Wittgenstein.Job>) => {
  debugVerbose(`jobs: %o`, jobs);
};
