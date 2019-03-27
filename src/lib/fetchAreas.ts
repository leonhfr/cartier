// Packages.
import * as _ from 'lodash';
import * as debug from 'debug';
import { Eratosthenes } from '@scenicroutes/eratosthenes';
import * as Wittgenstein from '@scenicroutes/wittgenstein';

// Internal.

// Code.
const debugError = debug('cartier:error:fetchAreas');
const debugVerbose = debug('cartier:verbose:fetchAreas');

export const fetchAreas = async (
  now: number
): Promise<Array<Wittgenstein.Area>> => {
  // Retrieve areas from DynamoDB
  const areasList = await Eratosthenes.AreaModel.list();

  debugVerbose(`scan response: %j`, areasList);

  if (areasList instanceof Error) {
    throw areasList;
  }

  const areas = _.filter(
    areasList.ok,
    area =>
      area.enabled &&
      area.zonesComputed &&
      now - area.lastScheduledAt > area.refreshRate
  );

  areasList.err.forEach(err => {
    debugError(`error with area: %o`, err);
  });

  debugVerbose(`areas to schedule: %j`, areas);

  if (!areas.length) {
    return [];
  }

  // Updating last scheduling time on DynamoDB
  await Promise.all(
    areas.map(area => Eratosthenes.AreaModel.updateItem(area.id, now))
  );

  return areas;
};
