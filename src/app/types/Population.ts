import {Tour} from './Tour';
import {City} from './City';

export class Population {
  private _tours: Tour[] = [];

  get tours() {
    return this._tours;
  }
  get size() {
    return this._tours.length;
  }

  constructor(populationSize: string) {
    this._tours = new Array(parseInt(populationSize, 10)).fill(null);
  }
  public init(citiesList: City[]) {
    for (let i = 0; i < this._tours.length; i++) {
      const newTour: Tour = new Tour();
      newTour.generate(citiesList);
      this.saveTour(i, newTour);
    }
  }

  public initFromImport(tourList: Tour[]) {
    this._tours = tourList;
  }

  public saveTour(index: number, tour: Tour) {
    this._tours[index] = tour;
  }

  public getFittiest(): Tour {
    return this._tours.reduce((prev, current) => {
      return (prev.fitness > current.fitness) ? prev : current
    });
  }
}
