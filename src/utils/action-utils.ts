export interface Action<T extends string> {
  type: T;
}

export interface ActionWithPayload<T extends string, P> extends Action<T> {
  payload: P;
}

export type ActionCreator<T extends string = string> = (...args: any[]) => Action<T> | ActionWithPayload<T, any>;

export type ActionsUnion<A extends any> = ReturnType<
  A[{ [K in keyof A]: A[K] extends ActionCreator ? K : never }[keyof A]]
>;

export function createAction<T extends string>(type: T): Action<T>;
export function createAction<T extends string, P>(type: T, payload: P): ActionWithPayload<T, P>;
export function createAction<T extends string, P>(type: T, payload?: P) {
  return payload === undefined ? { type, payload: null } : { type, payload };
}

export function bindActions(dispatch: any, actions: any) {
  return mapObj((action) => (...args: any[]) => dispatch(action(...args)), actions);
}

function mapObj<T>(fn: (v: any, k: string) => void, obj: any) {
  return Object.keys(obj).reduce((acc, k) => ((acc[k] = fn(obj[k], k)), acc), {} as any);
}
