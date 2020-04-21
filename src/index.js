window.onload = run;

function run() {
  const modelId = 'q8ZjpB8a';
  const buttons = getButtons(modelId);

  initModeloAPI();

  loadModelViewer(modelId).then((viewer) => {
    window.viewer = viewer;

    const mouse = new Modelo.View.Input.Mouse(viewer);
    const selectElementsTool = new Modelo.View.Tool.SelectElements(viewer);
    const commentTool = new Modelo.View.Tool.Comment(viewer);

    selectElementsTool.setEnabled(true);
    commentTool.setEnabled(true);

    viewer.addInput(mouse);
    viewer.addTool(selectElementsTool);
    viewer.addTool(commentTool);

    let lastSelectedElements = [];
    viewer.getEventEmitter().on('onElementSelected', (elements) => {
      viewer.getRenderScene().getEffect('Glow').removeElements(lastSelectedElements);
      viewer.getScene().setElementsColor(lastSelectedElements, null);

      viewer.getScene().setElementsColor(elements, [1.0, 0.0, 0.0]);
      viewer.setEffectParameter('Glow', 'intensity', 0.5);
      viewer
        .getRenderScene()
        .getEffect('Glow')
        .addElements(elements, {
          emissiveColor: [1.0, 1.0, 0.0],
        });

      lastSelectedElements = elements;
    });

    buttons.topView.addEventListener('click', () => {
      viewer.getCamera().switchToView(Modelo.View.ViewAngle.TOP);
    });

    buttons.activateView.addEventListener('click', () => {
      const treeView = {
        fov: 46,
        distance: 42.646155619253484,
        phi: 0.36893292519943144,
        theta: -0.4694981633974478,
        at: [56.45891952514646, -135.3876762390136, 10.728969573974604],
      };

      commentTool.activate({ camera: treeView });
    });

    buttons.sketch.addEventListener('click', () => {
      viewer.setEffectEnabled('Sketch', true);
    });

    buttons.glow.addEventListener('click', () => {
      viewer.setEffectEnabled('Glow', true);
    });
  });
}

function initModeloAPI() {
  const appToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUzLCJ1c2VybmFtZSI6Ik1vZGVsbyIsImlzUGVybWFuZW50Ijp0cnVlLCJpYXQiOjE1Njc1NjI0MTksImV4cCI6MzMxMDM1NjI0MTl9.EbW_cSPca4kWLedgNtfrGguog_o-3CCM5WhM7fFi0GA';
  Modelo.init({ endpoint: 'https://build-portal.modeloapp.com', appToken });
}

function loadModelViewer(modelId) {
  const viewer = new Modelo.View.Viewer3D('model-viewer');

  return viewer
    .loadModel(modelId, (progress) => {
      console.log('model loading progress:', progress);
    })
    .then(() => viewer);
}

function getButtons() {
  const buttons = document.querySelectorAll('.button');
  const [glow, sketch, activateView, topView] = buttons;

  return {
    glow,
    sketch,
    activateView,
    topView,
  };
}
