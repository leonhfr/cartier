// import * as turf from '@turf/turf';

// Definition.
export type Result<T, E> = {
  readonly ok: T;
  readonly err: E;
};

// export type AreaPayload = {
//   readonly areaPolygon: number[][][];
//   readonly boundingBox: number[];
// };
//
// export type Area = turf.helpers.Polygon;
//
// export type Zone = turf.helpers.Polygon;

export type Area = {
  readonly id: string;
  readonly name: string;
  readonly file: string;
  readonly enabled: boolean;
  readonly zonesComputed: boolean;
  readonly lastScheduledAt: number;
};
