export function runModelEffect(fn: (viewer: any) => any) {
  return function (viewer: any) {
    if (!viewer) return;

    fn(viewer);
  }
}
