import { Population } from '../types/Population';
import { Tour } from '../types/Tour';
import { CrossoverStrategy } from './crossover/CrossoverStrategy';
import { PMXCrossoverStrategy } from './crossover/PMXCrossoverStrategy';

export class Genetic {
  private _mutationRate = 0.015;
  private _tournamentSize = 5;
  private strategies: CrossoverStrategy[] = [];
  private selectedStrategy: CrossoverStrategy;

  constructor() {
    this.strategies.push(new PMXCrossoverStrategy());
    this.selectedStrategy = this.strategies[0];
  }

  public evolvePopulation(population: Population, tournamentSize: number, mutationRate: number) {
    this._mutationRate = mutationRate;
    this._tournamentSize = tournamentSize;
    const newPopulation: Population = new Population(String(population.size));

    for (let i = 0; i < newPopulation.size; i++) {
      this.performSelectionAndCrossover(population, newPopulation, i);
    }
    for (let i = 0; i < newPopulation.size; i++) {
      this.mutate(newPopulation.tours[i]);
    }
    return newPopulation;
  }

  private performSelectionAndCrossover(population: Population, newPopulation: Population, index: number) {
        const parent1 = this.tournamentSelection(population);
        const parent2 = this.tournamentSelection(population);
        this.selectedStrategy.prepareStrategyData(parent1, parent2);
        const childrens = this.selectedStrategy.generateTourFromParents(parent1, parent2);
        newPopulation.saveTour(index, childrens[0].fitness > childrens[1].fitness ? childrens[0] : childrens[1]);
  }

  private tournamentSelection(population: Population): Tour {
    const populationTournament = new Population(String(this._tournamentSize));
    for (let i = 0; i < this._tournamentSize; i++) {
      const randomedId = Math.floor(Math.random() * population.size);
      populationTournament.saveTour(i, population.tours[randomedId]);
    }
    return populationTournament.getFittiest();
  }

  private mutate(tour: Tour) {
    for (let tourPos1 = 0; tourPos1 < tour.size; tourPos1++) {
      if (Math.random() < this._mutationRate) {
        const tourPos2 = Math.floor(Math.random() * tour.size);
        [tour.cities[tourPos1], tour.cities[tourPos2]] = [tour.cities[tourPos2], tour.cities[tourPos1]];
      }
    }
  }
}
