// Tried to make this specific to our stuff, but typescript is wonk.
export type ConstructorOf<T = {}> = new (...args: any[]) => T;
