// Packages.
import * as AWS from 'aws-sdk';
import * as _ from 'lodash';
import * as debug from 'debug';
import { Eratosthenes } from '@scenicroutes/eratosthenes';
import * as Wittgenstein from '@scenicroutes/wittgenstein';

// Internal.
import Config from './Config';
import { MAXIMUM_BATCH_PUBLISH } from '../constants';

// Code.
const debugError = debug('cartier:error:scheduleJobs');
const debugVerbose = debug('cartier:verbose:scheduleJobs');

export const scheduleJobs = async (jobs: Array<Wittgenstein.Job>) => {
  const url = `https://sqs.${Config.region}.amazonaws.com/${
    Config.account
  }/job-scheduling`;

  const jobChunks = _.chunk(jobs, MAXIMUM_BATCH_PUBLISH);

  const chunkResponses = await Promise.all(
    jobChunks.map(jobs => Eratosthenes.JobModel.publish(url, jobs))
  );

  debugVerbose(`chunkResponses: %o`, chunkResponses);

  const errors: Array<Error> = [];
  const batchErrors: Array<AWS.SQS.BatchResultErrorEntry> = [];
  const batchResults: Array<AWS.SQS.SendMessageBatchResultEntry> = [];

  for (const response of chunkResponses) {
    if (response instanceof Error) {
      errors.push(response);
    } else {
      batchErrors.push(...response.err);
      batchResults.push(...response.ok);
    }
  }

  errors.push(
    ...batchErrors.map(
      e =>
        new Error(
          `Publish error (sender fault: ${e.SenderFault}): ${e.Code}: ${
            e.Message
          }`
        )
    )
  );

  for (const error of errors) {
    debugError(`Error: %o`, error);
  }

  return batchResults;
};
