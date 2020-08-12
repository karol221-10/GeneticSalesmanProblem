import {TestBed} from '@angular/core/testing';
import {AppComponent} from '../../app.component';
import {PMXCrossoverStrategy} from './PMXCrossoverStrategy';
import {City} from '../../types/City';
import {Tour} from '../../types/Tour';

it('should properly crossover parents', () => {
  const strategy = new PMXCrossoverStrategy();

  strategy.x1 = 3;
  strategy.x2 = 5;
  const cities = [
    new City(10, 10),
    new City(20, 20),
    new City(30, 30),
    new City(40, 40),
    new City(50, 50),
    new City(60, 60),
    new City(70, 70),
    new City(80, 80),
    new City(90, 90),
    new City(100, 100)
  ];
  const parent1 = new Tour([
    cities[0],
    cities[3],
    cities[8],
    cities[5],
    cities[7],
    cities[6],
    cities[9],
    cities[1],
    cities[2],
    cities[4]
  ]);
  const parent2 = new Tour([
    cities[7],
    cities[3],
    cities[0],
    cities[9],
    cities[8],
    cities[4],
    cities[1],
    cities[2],
    cities[6],
    cities[5]
  ]);
  const result = strategy.generateTourFromParents(parent1, parent2);
  console.log(result);
});
