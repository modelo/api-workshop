import * as modelActions from './model-actions';
import { ActionsUnion } from '../../utils/action-utils';

export type ModelActions = ActionsUnion<typeof modelActions>;
export { modelActionTypes } from './model-actions';
