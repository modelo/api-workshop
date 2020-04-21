import { useEffect, useContext } from 'react';
import { modelContext } from '../contexts/model-context';
import { runModelEffect } from '../utils/model-utils';

type ModelEffect = (viewer: any) => any;

function useModelEffects(effects: { enter?: ModelEffect[]; leave?: ModelEffect[] }) {
  const { viewer } = useContext(modelContext);

  useEffect(() => {
    (effects.enter || []).forEach((effect) => {
      runModelEffect(effect)(viewer);
    });

    return () => {
      (effects.leave || []).forEach((effect) => {
        runModelEffect(effect)(viewer);
      });
    };
  }, [viewer]);
}

export default useModelEffects;
