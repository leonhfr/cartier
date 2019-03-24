// Packages.
import * as _ from 'lodash';
import * as debug from 'debug';
import { Eratosthenes } from '@scenicroutes/eratosthenes';

// Internal.

// Code.
// const debugError = debug('cartier:error:handleAreas');
const debugVerbose = debug('cartier:verbose:handleAreas');

export const handleAreas = async (
  jobsRemaining: number
): Promise<{ jobsSent: number; jobsScheduled: number }> => {
  debugVerbose(`jobsRemaining: %j`, jobsRemaining);

  // Retrieve areas from DynamoDB
  const areasList = await Eratosthenes.AreaModel.list();
  debugVerbose(`scan response: %j`, areasList);

  if (areasList instanceof Error) {
    throw areasList;
  }

  const now = Date.now();

  const areas = _.filter(
    areasList.ok,
    area =>
      area.enabled &&
      area.zonesComputed &&
      now - area.lastScheduledAt > area.refreshRate
  );
  debugVerbose(`areas to schedule: %j`, areas);

  if (!areas.length) {
    return { jobsSent: 0, jobsScheduled: 0 };
  }

  // update dynamo db for date (not for nulls)

  // Request to know the number of pages and send jobs
  // If only one page, handled directly by consumer

  // send all jobs possible to handle zones,
  // schedule the first zones query that exceeds capacity to dynamodb

  // Actually save requests by always using first page

  // Store any excess to dynamodb
  return { jobsSent: 0, jobsScheduled: 0 };
};
