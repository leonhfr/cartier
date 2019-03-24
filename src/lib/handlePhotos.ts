// Packages.
import * as debug from 'debug';
import { Eratosthenes } from '@scenicroutes/eratosthenes';
import * as Wittgenstein from '@scenicroutes/wittgenstein';
import pointInPolygon from '@turf/boolean-point-in-polygon';
import * as turfHelpers from '@turf/helpers';

// Internal.

// Code.
const debugError = debug('cartier:error:handlePhotos');

export const handlePhotos = async (
  photos: Array<Wittgenstein.Photo>,
  zone: Wittgenstein.Zone
) =>
  Promise.all(
    photos.map(async photo => {
      if (!zone.zone) {
        return await Eratosthenes.PhotoModel.put(photo);
      }

      const location = turfHelpers.point([photo.longitude, photo.latitude]);
      const inside = pointInPolygon(location, zone.zone);

      if (inside === photo.inside) {
        return await Eratosthenes.PhotoModel.put(photo);
      }

      const newPhoto = Wittgenstein.Photo.create({ ...photo, inside });

      if (newPhoto instanceof Error) {
        debugError(`this is not supposed to happen, like never`);
        return newPhoto;
      }

      return await Eratosthenes.PhotoModel.put(newPhoto);
    })
  );
