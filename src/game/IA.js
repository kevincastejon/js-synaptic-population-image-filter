import * as PIXI from 'pixi.js';
import Jimp from 'jimp';
import Actor from './Actor';
import Globals from '../Globals';

export default class IA extends Actor {
  constructor(brain) {
    super(new PIXI.Sprite(Globals.RESOURCES.ia.texture));
    this.brain = brain;
    this.addChild(this.scoreText);
    this.scoreText.y = 100;
    this.goldMedal = new PIXI.Sprite(Globals.RESOURCES.gold.texture);
    this.silverMedal = new PIXI.Sprite(Globals.RESOURCES.silver.texture);
    this.bronzeMedal = new PIXI.Sprite(Globals.RESOURCES.bronze.texture);
  }

  giveRank(rank) {
    this.removeChild(this.goldMedal);
    this.removeChild(this.silverMedal);
    this.removeChild(this.bronzeMedal);
    if (rank === 0) {
      this.addChild(this.goldMedal);
    } else if (rank === 1) {
      this.addChild(this.silverMedal);
    } else if (rank === 2) {
      this.addChild(this.bronzeMedal);
    }
  }

  updateImage(newJimpImage) {
    return new Promise(async (resolve) => {
      if (this.image) {
        this.removeChild(this.image);
      }
      if (this.jimpImage === null) {
        this.jimpImage = newJimpImage;
      }
      const b64 = await newJimpImage.getBase64Async(Jimp.MIME_PNG);
      this.image = PIXI.Sprite.from(b64);
      this.addChild(this.image);
      this.image.width = 393;
      this.image.height = 233;
      this.image.x = 183;
      this.image.y = 6;
      resolve();
    });
  }

  tryToFilter(correctOutputs) {
    return new Promise((resolve) => {
      const newJimpImg = this.jimpImage.clone();
      let average = 0;
      let it = 0;
      newJimpImg.scan(0, 0, newJimpImg.bitmap.width, newJimpImg.bitmap.height,
        (x, y, idx) => {
          const r = newJimpImg.bitmap.data[idx + 0];
          const g = newJimpImg.bitmap.data[idx + 1];
          const b = newJimpImg.bitmap.data[idx + 2];
          const inputs = [r / 255, g / 255, b / 255];
          const outputs = this.brain.activate(inputs);
          // Calculate the difference between expected output and real output
          const scores = outputs.map((output, i) => (output > correctOutputs[it][i]
            ? 1 - (output - correctOutputs[it][i])
            : 1 - (correctOutputs[it][i] - output)));
          // Calculate the score
          const score = scores.reduce((acc, scr) => acc + scr, 0) / scores.length;
          average += score;
          newJimpImg.setPixelColor(
            Jimp.rgbaToInt(
              outputs[0] * 255,
              outputs[1] * 255,
              outputs[2] * 255,
              255,
            ), x, y,
          );
          it += 1;
        });
      average /= (newJimpImg.bitmap.width * newJimpImg.bitmap.height);
      this.brain.fitness = average;
      this.setScore(average);
      this.updateImage(newJimpImg).then(() => {
        resolve();
      });
    });
  }
}
