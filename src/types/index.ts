// Definition.
export type Result<T, E> = {
  readonly ok: T;
  readonly err: E;
};
