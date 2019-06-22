import * as PIXI from 'pixi.js';
import Jimp from 'jimp';

export default class Actor extends PIXI.Container {
  constructor(background) {
    super();
    this.background = background;
    this.addChild(this.background);
    this.scoreText = new PIXI.Text('0 %', {
      fill: 'white',
      fontFamily: 'Arial Black',
      fontSize: 35,
      strokeThickness: 4,
    });
    this.image = null;
    this.jimpImage = null;
  }

  setScore(score) {
    this.scoreText.text = `${Number.parseFloat(score, 10).toFixed(2).toString()} %`;
  }

  updateImage(newJimpImage) {
    return new Promise(async (resolve) => {
      if (this.image) {
        this.removeChild(this.image);
      }
      this.jimpImage = newJimpImage;
      const b64 = await this.jimpImage.getBase64Async(Jimp.MIME_PNG);
      this.image = PIXI.Sprite.from(b64);
      this.addChild(this.image);
      this.image.width = 393;
      this.image.height = 233;
      this.image.x = 183;
      this.image.y = 6;
      resolve();
    });
  }

  setImagePixel(x, y, color) {
    this.jimpImage.setPixelColor(color, x, y);
  }
}
