import React from 'react';
import { RouteComponentProps } from '@reach/router';
import useModelEffects from '../hooks/use-model-effects';

type Props = RouteComponentProps<{}>;

const camera = {
  fov: 46,
  distance: 51812.60347197601,
  phi: 0.6587396679731714,
  theta: 1.6646682622456475,
  at: [14042.609374999995, -23713.28320312501, -25975.97851562499],
};

function Page4(props: Props) {
  useModelEffects({
    enter: [(viewer) => viewer.getTool('Comment').activate({ camera })],
  });

  return <div className="Page4"></div>;
}

export default Page4;
