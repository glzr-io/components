/**
 * Merges two types, returning a merged type with the members of the second
 * overriding members of the first.
 *
 * @example
 * WithOverride<{ a: number }, { a: string }>
 */
export type WithOverride<T, R> = Omit<T, keyof R> & R;
