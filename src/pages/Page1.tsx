import React from 'react';
import { RouteComponentProps } from '@reach/router';
import palette from '../assets/palette/ribbon-palette.png';
import { ribbons } from '../data/ribbon';
import useModelEffects from '../hooks/use-model-effects';

type Props = RouteComponentProps<{}>;

const camera = {
  fov: 46,
  distance: 56599.763061722566,
  phi: 0.741532925199433,
  theta: 1.3530018366025507,
  at: [3873.0784703672475, -22986.132640109896, -25841.713891567062],
};

let ribbonViz: any;

function addAnimatingRibbon(viewer: any) {
  ribbonViz = new Modelo.View.Visualize.AnimatingRibbon(viewer.getRenderScene());
  ribbonViz.setEnabled(true);
  viewer.getScene().addVisualize(ribbonViz);
  ribbonViz.setParameter('width', 2);
  ribbonViz.setParameter('unitLength', 10000);
  ribbonViz.setParameter('speed', 1);
  ribbonViz.setParameter('paletteTexture', palette);

  ribbons.forEach((ribbon) => {
    ribbonViz.addRibbon(ribbon);
  });
}

function removeAnimatingRibbon(viewer: any) {
  ribbonViz.setEnabled(false);
  viewer.getRenderScene().removeVisualize(ribbonViz);
}

function Page1(props: Props) {
  useModelEffects({
    enter: [(viewer) => viewer.getTool('Comment').activate({ camera }), addAnimatingRibbon],
    leave: [removeAnimatingRibbon],
  });

  return <div className="Page1"></div>;
}

export default Page1;
