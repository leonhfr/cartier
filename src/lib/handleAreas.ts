// Packages.
import * as AWS from 'aws-sdk';
import * as debug from 'debug';
import { DynamoDbDriver } from '@scenicroutes/eratosthenes';

// Internal.
import * as Types from '../types';

// Code.
const debugVerbose = debug('cartier:verbose:scheduler');

// ignoring while it is in development
// TODO: remove ignore
/* istanbul ignore next */
export const handleAreas = async (
  jobsRemaining: number
): Promise<{ jobsSent: number; jobsScheduled: number }> => {
  debugVerbose(`jobsRemaining: %j`, jobsRemaining);
  // Retrieve areas from DynamoDB
  const request: AWS.DynamoDB.DocumentClient.ScanInput = {
    TableName: 'area',
  };
  const response = await DynamoDbDriver.scan<Types.Area>(request);
  debugVerbose(`scan response: %j`, response);

  // If last update time > 24h, run jobs
  // If never updated, generate divided areas and store to s3
  // update dynamo
  // retrieve divided area from s3

  // If only one page, handled directly by consumer

  // Never do the last page

  // Request to know the number of pages and send jobs
  // Only send number of jobs allowed per hour (flickr requests)

  // Store any excess to dynamodb
  return { jobsSent: 0, jobsScheduled: 0 };
};
