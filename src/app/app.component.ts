import {Component, ElementRef, ViewChild} from '@angular/core';
import {City} from './types/City';
import {SalesmanmapComponent} from './salesmanmap/salesmanmap.component';
import {TownManager} from './algorithms/TownManager';
import {Tour} from './types/Tour';
import {Population} from './types/Population';
import { Genetic } from './algorithms/Genetic';
import { timer, Observable } from 'rxjs';
import {SafeUrl} from '@angular/platform-browser';

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
  populationSize = '50';
  neededPopulationCount: number;
  singleIterationTime: number;
  private timer: Observable<number> = null;
  private timerSubscription;
  private timerStarted = false;
  private leftPopulations = 0;
  private geneticPerformer: Genetic = new Genetic();
  populationGeneration = 1;
  mutationRate = 0.015;
  tournamentCount = 10;
  selectedFile: File;

  onGenerateButtonClick() {
    this.populationGeneration = 1;
    this.leftPopulations = 0;
    if (this.timerSubscription != null) this.timerSubscription.unsubscribe();
    this.salesmanMap.clear();
    this.townManager.clear();
    this.cities = this.townManager.generateCities(this.numberOfCities, this.salesmanMap.width, this.salesmanMap.height);
    this.population = new Population(this.populationSize);
    this.population.init(this.cities);
    this.drawBestPopulation();
  }

  private drawBestPopulation() {
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
    if (this.timerStarted === true) {
      this.stopTimer();
    }
    this.startEvolvePopulationTimer(this.singleIterationTime * 1000);
  }

  private stopTimer() {
    this.timerStarted = false;
    this.timerSubscription.unsubscribe();
  }

  private startEvolvePopulationTimer(evolveStepTime: number) {
    this.leftPopulations = this.neededPopulationCount;
    this.timer = timer(evolveStepTime, evolveStepTime);
    this.timerSubscription = this.timer.subscribe(t => {
      this.performSingleEvolutionStep();
      if (this.leftPopulations === 0) {
        this.timerSubscription.unsubscribe();
      }
      this.leftPopulations--;
    });
  }

  private performSingleEvolutionStep() {
    this.population = this.geneticPerformer.evolvePopulation(this.population, this.tournamentCount, this.mutationRate);
    this.populationGeneration++;
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

  onSaveClick() {
    const toExport = {
      cities: this.cities,
      tours: this.population.tours
    };

    const json = JSON.stringify(toExport);
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/json;charset=UTF-8,' + encodeURIComponent(json));
    element.setAttribute('download', 'dataExport.json');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  onLoadClick() {

  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsText(this.selectedFile, "UTF-8");
    fileReader.onload = () => {
      const object = JSON.parse(fileReader.result.toString());
      const convertedTours: Tour[] = [];
      for (const tour of object.tours) {
        const cities: City[] = [];
        for (let i = 0; i < tour._cities.length; i++) {
          cities.push(new City(tour._cities[i]._x, tour._cities[i]._y));
        }
        const newTour = new Tour(cities);
        convertedTours.push(newTour);
      };

      this.population = new Population(object.tours.length);
      this.population.initFromImport(convertedTours);
      this.cities = [];
      for (const city of object.cities) {
        const addedCity = new City(city._x, city._y);
        this.cities.push(addedCity);
      }
      this.drawBestPopulation();
    };
  }
}
