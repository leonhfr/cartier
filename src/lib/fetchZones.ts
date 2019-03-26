// Packages.
import * as _ from 'lodash';
import * as debug from 'debug';
// import { Eratosthenes } from '@scenicroutes/eratosthenes';
import * as Wittgenstein from '@scenicroutes/wittgenstein';

// Internal.
import * as Types from '../types';

// Code.
// const debugError = debug('cartier:error:fetchZones');
const debugVerbose = debug('cartier:verbose:fetchZones');

export const fetchZones = async (
  areas: Array<Wittgenstein.Area>
): Promise<Array<Types.TimedZone>> => {
  // Retrieve areas from DynamoDB
  debugVerbose(`areas: %o`, areas);

  // TODO: FETCH ZONES

  return [];
};
