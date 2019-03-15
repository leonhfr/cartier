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
  readonly zonesComputed: boolean;
  readonly lastScheduledAt: number;
};
