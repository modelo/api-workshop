function memo(fn: (...args: any[]) => any) {
  let result: any;
  return (...args: any) => {
    if (!result) {
      result = fn(...args);
    }

    return result;
  }
}

export const getVolumeData = memo((viewer: any) => {
  const heatmap = new Modelo.View.Visualize.HeatMap(viewer.getRenderScene());
  viewer.getScene().addVisualize(heatmap);

  heatmap.setParameter('width', 256);
  heatmap.setParameter('height', 256);
  heatmap.setParameter('gridSize', 32);

  let layerImageData: Float32Array[] = [];

  heatLayers.forEach((layer) => {
    heatmap.setParameter('points', layer);
    layerImageData.push(new Float32Array(heatmap.getImageData()));
  });

  const volumeRenderingData = new Float32Array(2048 * 1536);

  for (var i = 0; i < 6; i++) {
    for (var j = 0; j < 8; j++) {
      for (var ii = 0; ii < 256; ii++) {
        for (var jj = 0; jj < 256; jj++) {
          volumeRenderingData[i * 256 * 256 * 8 + ii * 256 * 8 + j * 256 + jj] = layerImageData[i * 8 + j][ii * 256 + jj];

          if (ii > 56 && ii < 200 && jj > 56 && jj < 200) {
            volumeRenderingData[i * 256 * 256 * 8 + ii * 256 * 8 + j * 256 + jj] = 0;
          }
        }
      }
    }
  }

  return volumeRenderingData;
});

export const heatLayers: { x: number; y: number; number: number }[][] = [];
let heatData: any[] = [];

for (var i = 0; i < 48; i++) {
  heatData = [];

  for (var j = 0; j < 20; j++) {
    heatData.push({
      x: Math.random(),
      y: Math.random(),
      number: Math.random() * 10,
    });
  }

  heatLayers.push(heatData);
}
