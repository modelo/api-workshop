import { createAction } from '../../utils/action-utils';

export const modelActionTypes = {
  UPDATE_MODEL_LOADING_PROCESS: '@model/update-model-loading-process'
};

export const updateModelLoadingProcess = (progress: number) =>
  createAction(modelActionTypes.UPDATE_MODEL_LOADING_PROCESS, { progress });

export default {
  updateModelLoadingProcess
};
