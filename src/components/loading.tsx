import React from 'react';
import './loading.css';

type Props = {
  progress: number;
};

function Loading(props: Props) {
  const { progress } = props;

  if (progress == 1) return null;

  return <div className="loading">
    Loading - {Math.round(progress * 100)} %
  </div>
}

export default Loading;
