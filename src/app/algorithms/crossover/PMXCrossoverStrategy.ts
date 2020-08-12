import {CrossoverStrategy} from './CrossoverStrategy';
import { Tour } from '../../types/Tour';
import {City} from '../../types/City';


export class PMXCrossoverStrategy implements CrossoverStrategy {

  private _x1: number;
  private _x2: number;


  get x1(): number {
    return this._x1;
  }

  set x1(value: number) {
    this._x1 = value;
  }

  get x2(): number {
    return this._x2;
  }

  set x2(value: number) {
    this._x2 = value;
  }

  prepareStrategyData(parent1: Tour, parent2: Tour) {
    this._x1 = Math.floor(Math.random() * (parent1.size - 1));
    this._x2 = this._x1 + Math.floor(Math.random() * (parent1.size - this._x1));
  }

  generateTourFromParents(parent1: Tour, parent2: Tour): Tour[] {
    const mappingForChildren1 = new Map();
    const mappingForChildren2 = new Map();

    const children = [Array.from(parent1.cities), Array.from(parent2.cities)];

    for (let i = this._x1; i < this._x2; i++) {
      if (children[0][i] !== parent2.getCity(i)) {
        children[0][i] = parent2.getCity(i);
        mappingForChildren1.set(parent2.getCity(i), parent1.getCity(i));
      }

      if (children[1][i] !== parent1.getCity(i)) {
        children[1][i] = parent1.getCity(i);
        mappingForChildren2.set(parent1.getCity(i), parent2.getCity(i));
      }
    }
    this.eliminateTransitives(mappingForChildren1);
    this.eliminateTransitives(mappingForChildren2);
    this.eliminateCycles(mappingForChildren1);
    this.eliminateCycles(mappingForChildren2);

    for (let i = 0; i < this._x1; i++) {
      while (mappingForChildren1.has(children[0][i])) {
        children[0][i] = mappingForChildren1.get(children[0][i]);
      }

      while (mappingForChildren2.has(children[1][i])) {
        children[1][i] = mappingForChildren2.get(children[1][i]);
      }
    }

    for (let i = this._x2; i < parent1.size; i++) {
      while (mappingForChildren1.has(children[0][i])) {
        children[0][i] = mappingForChildren1.get(children[0][i]);
      }

      while (mappingForChildren2.has(children[1][i])) {
        children[1][i] = mappingForChildren2.get(children[1][i]);
      }
    }
    const tours = [new Tour(children[0]), new Tour(children[1])];
    return tours;
  }

  private eliminateTransitives(mappingForChildren : Map<City, City>) {
    const mapCopy = new Map(mappingForChildren);
    mapCopy.forEach((key: City, value: City) => {
      const firstStartKey = key;
      let startKey = firstStartKey;
      while (mappingForChildren.get(startKey) != null) {
        if (firstStartKey !== startKey) {
          const readedValue = mappingForChildren.get(startKey);
          mappingForChildren.delete(startKey);
          mappingForChildren.set(firstStartKey, readedValue);
        }
        startKey = mappingForChildren.get(startKey);
      }
    });
  }

    private eliminateCycles(mappingForChildren : Map<City, City>) {
      const mapCopy = new Map(mappingForChildren);
      mapCopy.forEach((key: City, value: City) => {
        if (mapCopy.get(key) === key) {
          mappingForChildren.delete(key);
        }
      });
    }

}
