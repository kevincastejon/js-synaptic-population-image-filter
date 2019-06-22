import * as PIXI from 'pixi.js';
import Population from 'neural-evolving-population';
import Jimp from 'jimp';
import Globals from '../Globals';
import IA from './IA';
import Source from './Source';
import Goal from './Goal';
import Algos from './Algos';
import Button from './Button';

export default class Game extends PIXI.Container {
  constructor() {
    super();
    Jimp.read('./imageSourceSm2.png').then((img) => {
      this.jimpImage = img;
      this.negButton = new Button('Negative filter');
      this.sepiaButton = new Button('Sepia filter');
      this.greyButton = new Button('Greyscale filter');
      this.addChild(this.negButton);
      this.negButton.x = 200;
      this.negButton.y = 25;
      this.addChild(this.sepiaButton);
      this.sepiaButton.x = 800;
      this.sepiaButton.y = 25;
      this.addChild(this.greyButton);
      this.greyButton.x = 1400;
      this.greyButton.y = 25;
      this.negButton.on('click', () => this.startNegative());
      this.sepiaButton.on('click', () => this.startSepia());
      this.greyButton.on('click', () => this.startGrey());
      this.generation = 0;
      this.generationText = new PIXI.Text('Generation 0', {
        fill: 'white',
        fontFamily: 'Arial Black',
        fontSize: 35,
        strokeThickness: 4,
      });
      this.imageSource = new Source();
      this.imageSource.x = (0 % 3) * 600 + 300;
      this.imageSource.y = 150;
      this.addChild(this.imageSource);
      this.imageSource.updateImage(img.clone());
      this.goal = new Goal();
      this.goal.x = (1 % 3) * 600 + 300;
      this.goal.y = 150;
      this.addChild(this.goal);
      this.population = new Population({
        demography: 9,
        eliteDemography: 3,
        inputs: 3,
        outputs: 3,
      });
      this.population.start();
      this.ias = [];
      for (let i = 0; i < this.population.demography; i += 1) {
        this.ias.push(new IA(this.population.getBrain(i)));
        this.ias[i].x = (i % 3) * 600;
        this.ias[i].y = Number.parseInt(i / 3, 10) * 250 + 450;
        this.addChild(this.ias[i]);
        this.ias[i].updateImage(img.clone());
      }
      this.generationText.y = 50;
      this.correctOutputs = [];
    });
  }

  clearButtons() {
    this.removeChild(this.negButton);
    this.removeChild(this.sepiaButton);
    this.removeChild(this.greyButton);
  }

  startNegative() {
    Globals.FILTERTYPE = Globals.FILTERTYPES.negative;
    this.clearButtons();
    this.generateFilteredImage();
  }

  startSepia() {
    Globals.FILTERTYPE = Globals.FILTERTYPES.sepia;
    this.clearButtons();
    this.generateFilteredImage();
  }

  startGrey() {
    Globals.FILTERTYPE = Globals.FILTERTYPES.greyScale;
    this.clearButtons();
    this.generateFilteredImage();
  }

  generateFilteredImage() {
    const goalImage = this.jimpImage.clone();
    goalImage.scan(0, 0, goalImage.bitmap.width, goalImage.bitmap.height,
      (x, y, idx) => {
        const r = goalImage.bitmap.data[idx + 0];
        const g = goalImage.bitmap.data[idx + 1];
        const b = goalImage.bitmap.data[idx + 2];
        const inputs = [r / 255, g / 255, b / 255];
        if (Globals.FILTERTYPE === 0) {
          this.correctOutputs.push(Algos.negativize(inputs));
        } else if (Globals.FILTERTYPE === 1) {
          this.correctOutputs.push(Algos.sepiaze(inputs));
        } else if (Globals.FILTERTYPE === 2) {
          this.correctOutputs.push(Algos.greyScale(inputs));
        }
        goalImage.setPixelColor(
          Jimp.rgbaToInt(
            this.correctOutputs[this.correctOutputs.length - 1][0] * 255,
            this.correctOutputs[this.correctOutputs.length - 1][1] * 255,
            this.correctOutputs[this.correctOutputs.length - 1][2] * 255,
            255,
          ), x, y,
        );
      });
    this.goal.updateImage(goalImage).then(() => {
      this.addChild(this.generationText);
      this.startIAFiltering();
    });
  }

  startIAFiltering() {
    Promise.all(this.ias.map(ia => ia.tryToFilter(this.correctOutputs))).then(() => {
      this.generation += 1;
      this.generationText.text = `Generation ${this.generation}`;
      let mutationCap = false;
      this.ias.concat().sort((a, b) => a.brain.fitness < b.brain.fitness).forEach((ia) => {
        if (ia.brain.fitness >= 0.9) {
          mutationCap = true;
        }
      });
      if (mutationCap) {
        this.population.mutateRate = 0.01;
      }
      this.population.evolve();
      for (let i = 0; i < this.ias.length; i += 1) {
        this.ias[i].giveRank(i);
        this.ias[i].brain = this.population.getBrain(i);
        // this.ias[i].setScore(this.ias[i].brain.fitness);
      }
      setTimeout(() => {
        this.startIAFiltering();
      }, 25);
    });
  }

  static wait(time) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, time);
    });
  }
}
