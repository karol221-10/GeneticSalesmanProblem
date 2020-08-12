import {Tour} from '../../types/Tour';

export interface CrossoverStrategy {
  prepareStrategyData(parent1: Tour, parent2: Tour);
  generateTourFromParents(parent1: Tour, parent2: Tour): Tour[];
}
