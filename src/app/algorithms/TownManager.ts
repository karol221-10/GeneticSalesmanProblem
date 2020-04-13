import {City} from '../types/City';

export class TownManager {
  private cities: City[] = [];

  public generateCities(numberOfCities: number, maxWidth: number, maxHeight: number) : City[]{
    for (let i = 0; i < numberOfCities; i++) {
      const xPosition = Math.round(Math.random() * maxWidth);
      const yPosition = Math.round(Math.random() * maxHeight);
      const city = new City(xPosition, yPosition);
      this.cities.push(city);
    }
    return this.cities;
  }

  public clear() {
    this.cities.splice(0, this.cities.length);
  }
}
