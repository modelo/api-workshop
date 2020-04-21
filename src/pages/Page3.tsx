import React from 'react';
import { RouteComponentProps } from '@reach/router';
import useModelEffects from '../hooks/use-model-effects';

type Props = RouteComponentProps<{}>;

const camera = {
  fov: 46,
  distance: 45256.56062000062,
  phi: 0.630832987693175,
  theta: 0.9777018106828356,
  at: [4588.740722656247, -24088.56249999999, -24440.79882812501],
};

function Page3(props: Props) {
  useModelEffects({
    enter: [(viewer) => viewer.getTool('Comment').activate({ camera })],
  });

  return <div className="Page3"></div>;
}

export default Page3;
