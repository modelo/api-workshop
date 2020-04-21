import { useEffect, useContext, useRef } from 'react';
import { modelContext, modelEventTypes } from '../contexts/model-context';

Modelo.init({
  endpoint: 'https://build-portal.modeloapp.com',
  appToken:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUzLCJ1c2VybmFtZSI6Ik1vZGVsbyIsImlzUGVybWFuZW50Ijp0cnVlLCJpYXQiOjE1Njc1NjI0MTksImV4cCI6MzMxMDM1NjI0MTl9.EbW_cSPca4kWLedgNtfrGguog_o-3CCM5WhM7fFi0GA',
});

function useModel(modelId: string, cb?: (viewer: any) => void) {
  const viewerRef = useRef<any>();
  const ctx = useContext(modelContext);
  const { actions, containerId, eventEmitter, setViewer, viewer } = ctx;

  // updates on new model id
  useEffect(() => {
    // destroy current viewer
    destroyViewer(viewerRef);
    // destroy viewer reference in context
    setViewer(null);
  }, [modelId]);

  useEffect(() => {
    if (viewer) {
      // emit load event after initialization of utils
      eventEmitter.emit(modelEventTypes.MODEL_LOADED, viewerRef.current);

      if (cb) cb(viewer);
    } else {
      viewerRef.current = new Modelo.View.Viewer3D(containerId);

      viewerRef.current.loadModel(modelId, actions.updateModelLoadingProcess).then(() => {
        setViewer(viewerRef.current);
      });
    }
  }, [viewer]);

  // unload model viewer
  useEffect(() => () => void destroyViewer(viewerRef), []);
}

function destroyViewer(viewerRef: React.MutableRefObject<any>) {
  viewerRef.current && viewerRef.current.destroy();
  viewerRef.current = null;
}

export default useModel;
