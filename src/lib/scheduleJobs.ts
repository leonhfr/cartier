// Packages.
import * as AWS from 'aws-sdk';
import * as _ from 'lodash';
import * as debug from 'debug';
import { Eratosthenes } from '@scenicroutes/eratosthenes';

// Internal.
import Config from './Config';

// Code.
const debugError = debug('cartier:error:fetchAreas');
// const debugVerbose = debug('cartier:verbose:fetchAreas');

export const schedulePendingJobs = async (
  maximumJobs: number
): Promise<number> => {
  const errors: Array<Error> = [];

  const jobs = await Eratosthenes.JobModel.list(maximumJobs);

  if (jobs instanceof Error) {
    throw jobs;
  }

  errors.push(...jobs.err);

  const jobChunks = _.chunk(jobs.ok, 10);

  const url = `https://sqs.${Config.region}.amazonaws.com/${
    Config.account
  }/job-scheduling`;

  const chunkResponses = await Promise.all(
    jobChunks.map(jobs => Eratosthenes.JobModel.publish(url, jobs))
  );

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

  const deleteResults = await Promise.all(
    batchResults.map(result => Eratosthenes.JobModel.delete(result.Id))
  );

  const deleteErrors = _.filter(
    deleteResults,
    result => result instanceof Error
  ) as Array<Error>;

  errors.push(...deleteErrors);

  for (const error of errors) {
    debugError(`Error: %o`, error);
  }

  return batchResults.length;
};
