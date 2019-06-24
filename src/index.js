import './index.css';
import * as PIXI from 'pixi.js';
import Game from './game/Game';
import Globals from './Globals';

PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;

const app = new PIXI.Application({
  width: Globals.WIDTH,
  height: Globals.HEIGHT,
  antialias: false,
  resolution: window.devicePixelRatio || 1,
  backgroundColor: 0,
});
let game = null;

function resizeHandler() {
  const scaleFactor = (window.innerWidth / window.innerHeight) > (Globals.WIDTH / Globals.HEIGHT)
    ? window.innerHeight / Globals.HEIGHT
    : window.innerWidth / Globals.WIDTH;
  app.view.style.left = `${window.innerWidth / 2 - (Globals.WIDTH * scaleFactor) / 2}px`;
  app.view.style.top = `${window.innerHeight / 2 - (Globals.HEIGHT * scaleFactor) / 2}px`;
  app.view.style.width = `${Globals.WIDTH * scaleFactor}px`;
  app.view.style.height = `${Globals.HEIGHT * scaleFactor}px`;
}

app.loader.add('ia', 'ia.png')
  .add('image', 'image.png')
  .add('goal', 'goal.png')
  .add('gold', 'gold.png')
  .add('silver', 'silver.png')
  .add('bronze', 'bronze.png')
  .load((loader, resources) => {
    Globals.RESOURCES = resources;
    game = new Game();
    app.view.id = 'gameCanvas';
    app.view.style.position = 'absolute';
    app.stage.addChild(game);
    document.body.appendChild(app.view);
    window.addEventListener('resize', resizeHandler);
    resizeHandler();
  });
