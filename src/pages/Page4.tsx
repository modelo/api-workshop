import React from 'react';
import { RouteComponentProps } from '@reach/router';
import useModelEffects from '../hooks/use-model-effects';
import { heatLayers, getVolumeData } from '../data/volume-rendering';
import palette from '../assets/palette/heatmap-palette.png';

type Props = RouteComponentProps<{}>;

const camera = {
  fov: 46,
  distance: 51812.60347197601,
  phi: 0.6587396679731714,
  theta: 1.6646682622456475,
  at: [14042.609374999995, -23713.28320312501, -25975.97851562499],
};

let volume: any;

function addVolumeRendering(viewer: any) {
  if (volume) {
    volume.setEnabled(true);
    return;
  }

  const volumeData = getVolumeData(viewer);

  volume = new Modelo.View.Visualize.MultiLayerVolume(viewer.getRenderScene());
  viewer.getScene().addVisualize(volume);

  volume.setParameter('gridSize', [8, 6]);
  volume.setParameter('paletteImage', palette);
  volume.setParameter('data', { data: volumeData, width: 2048, height: 1536 });
  volume.setParameter('layers', 48);
  volume.setScaling([155, 155, 1020]);
  volume.setPosition([11103, 10530, 550]);
  volume.setRotation([0, 0, 1], -0.25);
  volume.setEnabled(true);
}

function removeVolumeRendering(viewer: any) {
  volume.setEnabled(false);
}

function Page4(props: Props) {
  useModelEffects({
    enter: [(viewer) => viewer.getTool('Comment').activate({ camera }), addVolumeRendering],
    leave: [removeVolumeRendering],
  });

  return <div className="Page4"></div>;
}

export default Page4;
