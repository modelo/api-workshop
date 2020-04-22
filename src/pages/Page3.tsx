import React from 'react';
import { RouteComponentProps } from '@reach/router';
import useModelEffects from '../hooks/use-model-effects';
import { heatData } from '../data/heatmap';
import palette from '../assets/palette/heatmap-palette.png';

type Props = RouteComponentProps<{}>;

const camera = {
  fov: 46,
  distance: 45256.56062000062,
  phi: 0.630832987693175,
  theta: 0.9777018106828356,
  at: [4588.740722656247, -24088.56249999999, -24440.79882812501],
};

let heightMap: any;

function addHeatmap(viewer: any) {
  const heatmap = new Modelo.View.Visualize.HeatMap(viewer.getRenderScene());
  // viewer.getScene().addVisualize(heatmap);

  const width = 2550;
  const height = 1650;

  const data = heatData.map((d) => ({ ...d, x: d.x / width, y: d.y / height }));

  heatmap.setParameter('points', data);
  heatmap.setParameter('width', 256);
  heatmap.setParameter('height', 256);
  heatmap.setParameter('gridSize', 32);
  // heatmap.setParameter('paletteImage', palette);
  // heatmap.setScaling([125, 75, 0]);
  // heatmap.setPosition([23475, 3725, 100]);
  // heatmap.setRotation([0, 0, 1], 0.625);
  // heatmap.setEnabled(true);

  heightMap = new Modelo.View.Visualize.HeightMap(viewer.getRenderScene());
  viewer.getScene().addVisualize(heightMap);

  heightMap.setParameter('xres', 1024);
  heightMap.setParameter('yres', 1024);
  heightMap.setParameter('dataTexture', heatmap.getTexture());
  heightMap.setParameter('paletteImage', palette);
  heightMap.setScaling([125, 75, 0]);
  heightMap.setPosition([23475, 3725, 100]);
  heightMap.setEnabled(true);
  heightMap.setRotation([0, 0, 1], 0.625);
}

function removeHeatmap(viewer: any) {
  heightMap.setEnabled(false);
  viewer.getRenderScene().removeVisualize(heightMap);
}

function Page3(props: Props) {
  useModelEffects({
    enter: [(viewer) => viewer.getTool('Comment').activate({ camera }), addHeatmap],
    leave: [removeHeatmap],
  });

  return <div className="Page3"></div>;
}

export default Page3;
