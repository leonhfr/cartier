// Packages.
import * as Wittgenstein from '@scenicroutes/wittgenstein';
import * as turfHelpers from '@turf/helpers';

// Definition.
export type Result<T, E> = {
  readonly ok: T;
  readonly err: E;
};

export type SearchOptions = {
  bbox: turfHelpers.BBox;
  min_upload_date: number;
  max_upload_date: number;
  page: number;
};

export type PhotoProperties = {
  zoneId: string;
  inside: boolean;
};

export type TimedZone = {
  lastUpdate: number;
  zone: Wittgenstein.Zone;
};

export type MakeJobInput = {
  minUploadDate: number;
  maxUploadDate: number;
  pageFrom: number;
  pageTo?: number;
  zone: Wittgenstein.Zone;
};
