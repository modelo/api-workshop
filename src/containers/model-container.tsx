import React, { useReducer, useState, useEffect } from 'react';
import {
  ModelProvider,
  modelReducer,
  modelInitialState,
  modelActions,
  modelInitialContext,
  modelEventTypes,
} from '../contexts/model-context';
import { bindActions } from '../utils/action-utils';
import './model-container.css';
import ModelViewer from '../components/model-viewer';
import Loading from '../components/loading';

type Props = {
  modelId: string;
  children?: React.ReactNode;
};

function initViewer(viewer: any) {
  viewer.addInput(new Modelo.View.Input.Mouse(viewer));
  viewer.setBackgroundColor([26.0 / 255.0, 26.0 / 255.0, 55.0 / 255.0, 1.0]);
  viewer.getCamera().setSensitivity({ mouseZoom: 0.01, mousePan: 0.05, mouseRotate: 0.05 });

  const commentTool = new Modelo.View.Tool.Comment(viewer);
  viewer.addTool(commentTool);
  commentTool.setEnabled(true);

  const selectElementsTool = new Modelo.View.Tool.SelectElements(viewer);
  viewer.addTool(selectElementsTool);
  selectElementsTool.setEnabled(true);
  selectElementsTool.setCloseUpEnabled(false);
  selectElementsTool.setHighlightEnabled(false);

  viewer.getEventEmitter().on('onElementSelected', (elements: any[]) => {
    console.log('selected elements', elements)
  });
  viewer.getEventEmitter().on('onPointPicked', (point: any) => {
    console.log('clicked at', point);
  });

  (window as any).viewer = viewer;
}

function ModelContainer(props: Props) {
  const { modelId, children } = props;
  const [state, dispatch] = useReducer(modelReducer, modelInitialState);
  const actions = bindActions(dispatch, modelActions);
  const [viewer, setViewer] = useState<any>(null);

  const context = { ...modelInitialContext, state, dispatch, actions, viewer, setViewer };
  const { eventEmitter } = context;

  useEffect(() => {
    eventEmitter.on(modelEventTypes.MODEL_LOADED, initViewer);
    return () => eventEmitter.clearAll();
  }, []);

  return (
    <ModelProvider value={context}>
      <Loading progress={state.loadingProgress} />
      <div className="model-container-wrapper">
        <ModelViewer modelId={modelId} />
        {children}
      </div>
    </ModelProvider>
  );
}

export default ModelContainer;
