import React from 'react';
import { RouteComponentProps } from '@reach/router';
import useModelEffects from '../hooks/use-model-effects';

type Props = RouteComponentProps<{}>;

const camera = {
  fov: 46,
  distance: 56599.763061722566,
  phi: 0.741532925199433,
  theta: 1.3530018366025507,
  at: [3873.0784703672475, -22986.132640109896, -25841.713891567062],
};

function Page1(props: Props) {
  useModelEffects({
    enter: [(viewer) => viewer.getTool('Comment').activate({ camera })],
  });

  return <div className="Page1"></div>;
}

export default Page1;
