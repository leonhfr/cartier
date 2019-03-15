// Packages.
import * as debug from 'debug';
import * as turf from '@turf/turf';

// Internal.
import { GEOJSON_ZONES_DEFAULT_PRECISION } from '../constants';

// Code.
const debugVerbose = debug('cartier:verbose:areaDivider');

export const areaDivider = (
  area: turf.helpers.Feature<turf.helpers.Polygon>,
  precision: number = GEOJSON_ZONES_DEFAULT_PRECISION
): Array<turf.helpers.Feature<turf.helpers.Polygon>> => {
  debugVerbose(`area (%d): %j`, precision, area);

  const zones: Array<turf.helpers.Feature<turf.helpers.Polygon>> = [];

  // Computing bounding box
  const digits = (precision
    .toString()
    .split('.')
    .pop() as string).length;

  const boundingBox = turf.bbox(area);

  const [minX, minY, maxX, maxY] = boundingBox.map(x =>
    Number((Math.floor(x / precision) * precision).toFixed(digits))
  );

  debugVerbose(`boundingBox: %j`, [minX, minY, maxX, maxY]);

  // Computing zones
  for (let x = minX; x < maxX + precision; x += precision) {
    for (let y = minY; y < maxY + precision; y += precision) {
      const mask = turf.polygon([
        [
          [x, y],
          [x + precision, y],
          [x + precision, y + precision],
          [x, y + precision],
          [x, y],
        ],
      ]);

      const zone = turf.intersect(area, mask);

      debugVerbose(`intersection with mask %j: %j`, mask, zone);

      // No intersection
      if (!zone) {
        continue;
      }

      const type = turf.getType(zone);

      if (type === 'Polygon') {
        zones.push(zone);
      }

      if (type === 'MultiPolygon') {
        const { coordinates } = zone.geometry as turf.helpers.MultiPolygon;
        for (const coords of coordinates) {
          zones.push(turf.polygon(coords));
        }
      }
    }
  }

  debugVerbose(`zones: %j`, zones);

  return zones;
};
