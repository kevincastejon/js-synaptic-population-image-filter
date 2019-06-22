import * as PIXI from 'pixi.js';

export default class Button extends PIXI.Container {
  constructor(label) {
    super();
    this.background = new PIXI.Graphics();
    this.background.beginFill(0xd6d6d6, 0.3);
    this.background.drawRoundedRect(0, 0, 400, 100, 50);
    this.addChild(this.background);
    this.label = new PIXI.Text(label, {
      fill: 'white',
      fontFamily: 'Arial Black',
      fontSize: 35,
      strokeThickness: 4,
    });
    this.addChild(this.label);
    this.label.y = 25;
    this.label.x = 50;
    this.interactive = true;
    this.buttonMode = true;
    this.defaultCursor = 'pointer';
  }
}
