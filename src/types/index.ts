// Packages.
import * as turf from '@turf/turf';

// Definition.
export type Result<T, E> = {
  readonly ok: T;
  readonly err: E;
};

export type Area = {
  readonly id: string;
  readonly name: string;
  readonly file: string;
  readonly enabled: boolean;
  readonly lastScheduledAt: number;
};

export type Zone = {
  bbox: turf.helpers.BBox;
  zone: turf.helpers.Feature<turf.helpers.Polygon>;
};
