import {Population} from '../types/Population';
import {Tour} from '../types/Tour';

export class Genetic {
  private static mutationRate = 0.015;
  private static tournamentSize = 5;
  private static ellitism = false;

  public static evolvePopulation(population: Population) {
    const newPopulation: Population = new Population(population.size);

    let ellitismOffset = 0;
    if (this.ellitism) {
      newPopulation.saveTour(0, population.getFittiest());
      ellitismOffset = 1;
    }

    for (let i = 0; i < newPopulation.size; i++) {
      const parent1 = this.tournamentSelection(population);
      const parent2 = this.tournamentSelection(population);
      const child = this.crossover(parent1, parent2);
      newPopulation.saveTour(i, child);
    }
    for (let i = ellitismOffset; i < newPopulation.size; i++) {
      this.mutate(newPopulation.tours[i]);
    }
    return newPopulation;
  }

  private static tournamentSelection(population: Population): Tour {
    const populationTournament = new Population(this.tournamentSize);
    for (let i = 0; i < this.tournamentSize; i++) {
      const randomedId = Math.floor(Math.random() * population.size);
      populationTournament.saveTour(i, population.tours[randomedId]);
    }
    return populationTournament.getFittiest();
  }

  private static crossover(parent1: Tour, parent2: Tour): Tour {
    const tourSize = parent1.size;
    const child: Tour = new Tour();
    const startPos = Math.floor(Math.random() * tourSize);
    const endPos = Math.floor(Math.random() * tourSize);

    for (let i = 0; i < tourSize; i++) {
      if (startPos < endPos && i > startPos && i < endPos) {
        child.setCity(i, parent1.cities[i]);
      }
      else {
        if (!(i < startPos && i > endPos)) {
          child.setCity(i, parent1.cities[i]);
        }
      }
    }

    for (let i = 0; i < tourSize; i++) {
      if (!child.contains(parent2.cities[i])) {
        for (let ii = 0; ii < tourSize; ii++) {
          if (child.cities[ii] == null) {
            child.setCity(ii, parent2.cities[i]);
            break;
          }
        }
      }
    }
    return child;
  }

  private static mutate(tour: Tour) {
    for (let tourPos1 = 0; tourPos1 < tour.size; tourPos1++) {
      if (Math.random() < this.mutationRate) {
        const tourPos2 = Math.floor(Math.random() * tour.size);
        [tour.cities[tourPos1], tour.cities[tourPos2]] = [tour.cities[tourPos2], tour.cities[tourPos1]];
      }
    }
  }
}