// Packages.
import * as AWS from 'aws-sdk';
import * as debug from 'debug';
import { DynamoDbDriver } from '@scenicroutes/eratosthenes';
// import * as turf from '@turf/turf';

// Internal.
import { AREA_REFRESH_RATE } from '../constants';
import { generateZones } from './generateZones';
import * as Types from '../types';

// Code.
// const debugError = debug('cartier:error:handleAreas');
const debugVerbose = debug('cartier:verbose:handleAreas');

export const handleAreas = async (
  jobsRemaining: number
): Promise<{ jobsSent: number; jobsScheduled: number }> => {
  debugVerbose(`jobsRemaining: %j`, jobsRemaining);

  // Retrieve areas from DynamoDB
  const scanRequest: AWS.DynamoDB.DocumentClient.ScanInput = {
    TableName: 'area',
  };

  // TODO: scan only for enabled areas

  const scanResponse = await DynamoDbDriver.scan<Types.Area>(scanRequest);
  debugVerbose(`scan response: %j`, scanResponse);

  if (!scanResponse.Items) {
    return { jobsSent: 0, jobsScheduled: 0 };
  }

  const now = Date.now();

  // If last update time > AREA_REFRESH_RATE, schedule area
  const areas = scanResponse.Items.filter(
    area => now - area.lastScheduledAt > AREA_REFRESH_RATE
  );
  debugVerbose(`areas to schedule: %j`, areas);

  if (!areas.length) {
    return { jobsSent: 0, jobsScheduled: 0 };
  }

  const dividedAreas = await Promise.all(
    areas.map(async area => await generateZones(area))
  );

  debugVerbose(`divided areas: %j`, dividedAreas);

  // update dynamo db for date (not for nulls)

  // Request to know the number of pages and send jobs
  // If only one page, handled directly by consumer
  // Actually save requests by always using first page

  // Store any excess to dynamodb
  return { jobsSent: 0, jobsScheduled: 0 };
};
