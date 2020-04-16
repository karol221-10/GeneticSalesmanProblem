import {Component, ElementRef, ViewChild} from '@angular/core';
import {City} from './types/City';
import {SalesmanmapComponent} from './salesmanmap/salesmanmap.component';
import {TownManager} from './algorithms/TownManager';
import {Tour} from './types/Tour';
import {Population} from './types/Population';
import { Genetic } from './algorithms/Genetic';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'salesman';
  @ViewChild('map') salesmanMap: SalesmanmapComponent;

  private townManager: TownManager = new TownManager();
  numberOfCities: number;
  private cities: City[] = [];
  population: Population;
  private populationSize = 50; // TODO - in editbox


  onGenerateButtonClick() {
    this.salesmanMap.clear();
    this.townManager.clear();
    this.cities = this.townManager.generateCities(this.numberOfCities, this.salesmanMap.width, this.salesmanMap.height);
    this.population = new Population(this.populationSize);
    this.population.init(this.cities);
    const bestTour = this.population.getFittiest();
    // draw
    this.cities.forEach(city => {
      this.salesmanMap.drawCity(city);
    });
    const citiesPairs = bestTour.getCitiesPairs();
    citiesPairs.forEach(citiesPair => {
      this.salesmanMap.drawConnection(citiesPair[0], citiesPair[1]);
    });
  }

  onEvolvePopulationClick() {
    this.population = Genetic.evolvePopulation(this.population);
    this.salesmanMap.clear();
    const bestTour = this.population.getFittiest();
    this.cities.forEach(city => {
      this.salesmanMap.drawCity(city);
    });
    const citiesPairs = bestTour.getCitiesPairs();
    citiesPairs.forEach(citiesPair => {
      this.salesmanMap.drawConnection(citiesPair[0], citiesPair[1]);
    });
  }
}
