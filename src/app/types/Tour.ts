import {City} from './City';

export class Tour {
  private cities: City[] = [];
  private fitness = 0;
  private distance = 0;

  public generate(existingCities: City[]) {
    this.cities.push(...existingCities);
    this.shuffle(this.cities);
    console.log('Generated tour: ' + this.cities)
  }

  public setCity(position, city : City) {
    this.cities[position] = city;
    this.fitness = 0;
    this.distance = 0;
  }

  public getCitiesPairs() {
    const citiesPairs: [City, City][] = [];
    for (let i = 0; i < this.cities.length - 1; i ++) {
      citiesPairs.push([this.cities[i], this.cities[i + 1]]);
    }
    citiesPairs.push([this.cities[this.cities.length - 1], this.cities[0]]);
    console.log(citiesPairs);
    return citiesPairs;
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
