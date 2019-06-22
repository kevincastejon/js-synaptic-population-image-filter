export default class Algos {
  static negativize(colorFloatArray) {
    return [1 - colorFloatArray[0], 1 - colorFloatArray[1], 1 - colorFloatArray[2]];
  }

  static sepiaze(colorFloatArray) {
    const colors = colorFloatArray.map(c => c * 255);
    let tr = 0.393 * colors[0] + 0.769 * colors[1] + 0.189 * colors[2];
    let tg = 0.349 * colors[0] + 0.686 * colors[1] + 0.168 * colors[2];
    let tb = 0.272 * colors[0] + 0.534 * colors[1] + 0.131 * colors[2];

    if (tr > 255) {
      tr = 255;
    }
    if (tg > 255) {
      tg = 255;
    }
    if (tb > 255) {
      tb = 255;
    }

    return [tr / 255, tg / 255, tb / 255];
  }

  static greyScale(colorFloatArray) {
    const colors = colorFloatArray.map(c => c * 255);
    const val = (colors[0] + colors[1] + colors[2]) / 3;

    return [val / 255, val / 255, val / 255];
  }
}
