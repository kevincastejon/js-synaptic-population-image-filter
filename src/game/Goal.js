import * as PIXI from 'pixi.js';
import Actor from './Actor';
import Globals from '../Globals';

export default class Goal extends Actor {
  constructor() {
    super(new PIXI.Sprite(Globals.RESOURCES.goal.texture));
  }

  setScore(score) {
    this.scoreText.text = Number.parseInt(score, 10).toString();
    this.scoreText.x = -this.scoreText.width / 2;
    this.scoreText.y = -this.scoreText.height / 2;
  }
}
