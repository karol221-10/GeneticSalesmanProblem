import {City} from './City';

export class Tour {
  private _cities: City[] = [];

  get distance(): number {
    const citiesPairs = this.getCitiesPairs();
    let distanceToCalc = 0;
    citiesPairs.forEach(cityPair => {
      const cityFrom = cityPair[0];
      const cityTo = cityPair[1];
      distanceToCalc += cityFrom.getDistance(cityTo);
    });
    return distanceToCalc;
  }

  get cities() {
    return this._cities;
  }

  get fitness(): number {
    return 1 / this.distance;
  }

  get size(): number {
    return this._cities.length;
  }

  public generate(existingCities: City[]) {
    this._cities.push(...existingCities);
    this.shuffle(this._cities);
  }

  public setCity(position, city: City) {
    this._cities[position] = city;
  }

  public getCitiesPairs() {
    const citiesPairs: [City, City][] = [];
    for (let i = 0; i < this._cities.length - 1; i ++) {
      citiesPairs.push([this._cities[i], this._cities[i + 1]]);
    }
    citiesPairs.push([this._cities[this._cities.length - 1], this._cities[0]]);
    return citiesPairs;
  }

  public contains(city: City): boolean {
    return this.cities.includes(city);
  }

  private shuffle(array) {
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;

    while (0 !== currentIndex) {

      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }
}
