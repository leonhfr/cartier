// Packages.
import * as debug from 'debug';
import { S3Driver } from '@scenicroutes/eratosthenes';
import * as turf from '@turf/turf';

// Internal.
import Config from './Config';
import { areaDivider } from './areaDivider';
import * as Types from '../types';

// Code.
const debugError = debug('cartier:error:generateZones');
const debugVerbose = debug('cartier:verbose:generateZones');

export const generateZones = async (
  area: Types.Area
): Promise<Array<Types.Zone> | null> => {
  // TODO: Cache the zones on S3

  const response = await S3Driver.getObject({
    Key: `${area.file}.geo.json`,
    Bucket: Config.bucket,
  });
  debugVerbose(`area %s response: %j`, area.name, response);

  if (!response.Body) {
    return null;
  }

  const areaJson = response.Body.toString();
  let polygon: turf.helpers.Feature<turf.helpers.Polygon>;

  try {
    polygon = JSON.parse(areaJson) as turf.helpers.Feature<
      turf.helpers.Polygon
    >;
  } catch (err) {
    debugError(`could not parse s3 file for %s: %j`, area.name, err);
    return null;
  }

  const zones = areaDivider(polygon);

  // TODO: save resources by making zone optional if bbox is enough

  return zones.map(zone => ({ bbox: turf.bbox(zone), zone }));
};
