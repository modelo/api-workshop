import React, { useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import useModelEffects from '../hooks/use-model-effects';

type Props = RouteComponentProps<{}>;

type Point = [number, number];

const camera = {
  fov: 46,
  distance: 42723.470107145455,
  phi: 0.7415329720075877,
  theta: 1.9281018780865755,
  at: [4588.740818561556, -24088.56165582493, -24440.797915246458],
};

function add3dPoints(setPoints: React.Dispatch<React.SetStateAction<Point[]>>) {
  return function (viewer: any) {
    const original3dPoints = [
      [-5584.98828125, 523.0385131835938, 887.468505859375],
      [-3446.7880859375, 2516.74462890625, 482.15289306640625],
    ];
    viewer.setUpdateCallback(() => {
      const screenPoints = original3dPoints.map((point) => {
        const projected = viewer.getCamera().project(point);
        return [projected[0], projected[1]];
      });

      setPoints(screenPoints as Point[]);
    });
  };
}

function remove3dPoints(viewer: any) {
  viewer.setUpdateCallback(null);
}

function Page2(props: Props) {
  const [points, setPoints] = useState<Point[]>([]);

  useModelEffects({
    enter: [(viewer) => viewer.getTool('Comment').activate({ camera }), add3dPoints(setPoints)],
    leave: [remove3dPoints],
  });

  return (
    <div
      className="Page2"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {points.map((point, i) => {
        return <Panel key={i} point={point} />;
      })}
    </div>
  );
}

function Panel(props: { point: Point }) {
  const { point } = props;

  return (
    <div
      className="panel"
      style={{
        position: 'absolute',
        top: point[1],
        left: point[0],
        padding: '6px',
        width: '160px',
        height: '90px',
        background: 'rgba(255, 255, 255, 0.7)',
        pointerEvents: 'none',
        transform: 'translate(-50%, -50%)'
      }}
    >
      Anchor Panel
      <div>
        x: {point[0].toFixed(0)} - y: {point[1].toFixed(0)}
      </div>
    </div>
  );
}

export default Page2;
