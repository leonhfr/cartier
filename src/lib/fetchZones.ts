// Packages.
import * as _ from 'lodash';
import * as debug from 'debug';
import { Eratosthenes } from '@scenicroutes/eratosthenes';
import * as Wittgenstein from '@scenicroutes/wittgenstein';

// Internal.
import * as Types from '../types';

// Code.
const debugError = debug('cartier:error:fetchZones');
const debugVerbose = debug('cartier:verbose:fetchZones');

export const fetchZones = async (
  areas: Array<Wittgenstein.Area>
): Promise<Array<Types.TimedZone>> => {
  debugVerbose(`areas: %o`, areas);

  const response = await Promise.all(
    areas.map(async area => {
      const zones = await Eratosthenes.ZoneModel.query(area.id);

      if (zones instanceof Error) {
        debugError(`zone query failed: %o`, zones);
        return [];
      }

      const { ok, err } = zones;

      for (const error of err) {
        debugError(`zone internal error: %o`, error);
      }

      return ok.map(zone => ({ lastUpdate: area.lastScheduledAt, zone }));
    })
  );

  const output = _.flatten(response);

  return output;
};
