import React from 'react';
import { RouteComponentProps } from '@reach/router';
import useModelEffects from '../hooks/use-model-effects';

type Props = RouteComponentProps<{}>;

const camera = {
  fov: 46,
  distance: 42723.470107145455,
  phi: 0.7415329720075877,
  theta: 1.9281018780865755,
  at: [4588.740818561556, -24088.56165582493, -24440.797915246458],
};

function Page2(props: Props) {
  useModelEffects({
    enter: [(viewer) => viewer.getTool('Comment').activate({ camera })],
  });

  return <div className="Page2"></div>;
}

export default Page2;
