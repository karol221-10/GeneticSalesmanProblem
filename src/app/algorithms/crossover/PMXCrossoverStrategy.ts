import {CrossoverStrategy} from './CrossoverStrategy';
import {Tour} from '../../types/Tour';
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
    return [
      new Tour(this.performCrossOverForChildren(parent1, parent2)),
      new Tour(this.performCrossOverForChildren(parent2, parent1))
    ];
  }

  private performCrossOverForChildren(parent1: Tour, parent2: Tour) : City[] {
    const mappingForChildren = new Map();
    const children: City[] = Array.from(parent1.cities);
    for (let i = this._x1; i < this._x2; i++) {
      if (children[i] !== parent2.getCity(i)) {
        children[i] = parent2.getCity(i);
        mappingForChildren.set(parent2.getCity(i), parent1.getCity(i));
      }
    }
    this.eliminateTransitives(mappingForChildren);
    this.eliminateCycles(mappingForChildren);

    for (let i = 0; i < this._x1; i++) {
      while (mappingForChildren.has(children[i])) {
        children[i] = mappingForChildren.get(children[i]);
      }
    }

    for (let i = this._x2; i < parent1.size; i++) {
      while (mappingForChildren.has(children[i])) {
        children[i] = mappingForChildren.get(children[i]);
      }
    }
    return children;
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
