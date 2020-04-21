import React, { useContext } from 'react';
import useModel from '../hooks/use-model';
import { modelContext } from '../contexts/model-context';

type Props = {
  modelId: string;
};

function ModelViewer(props: Props) {
  const { containerId } = useContext(modelContext);
  const { modelId } = props;

  useModel(modelId);

  return (
    <div
      id={containerId}
      style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1 }}
    />
  );
}

export default ModelViewer;
