import { StringBuilder } from "typescript-string-operations";

export class Utilities {

  public static getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);

    const number = Math.floor(Math.random() * (max - min + 1)) + min;

    console.log(number);

    return number;
  }

  // public static GetRandomStentence(wordCount: number) {
  //   let words = ["wheeledToLotusCourt", "motorToLotusCourt", "vehicleTopTen", "transportingToLotusCourt", "passengersLotusCourt", "LotusCourtpassengers", "engineLotusCourt"]
  //   let builder = new StringBuilder();
  //   for (let index = 0; index < wordCount; index++) {
  //     builder.Append(words[Math.random()])
  //   }

  //   let sentence = builder.ToString().trim() + ". ";

  //   sentence =Char
  // }
}