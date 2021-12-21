export class Utilities {

  public static getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);

    const number = Math.floor(Math.random() * (max - min + 1)) + min;

    console.log(number);

    return number;
  }
}