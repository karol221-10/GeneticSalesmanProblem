import {Component, ElementRef, ViewChild} from '@angular/core';
import {City} from './types/City';
import {SalesmanmapComponent} from './salesmanmap/salesmanmap.component';
import {TownManager} from './algorithms/TownManager';

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


  onGenerateButtonClick() {
    this.salesmanMap.clear();
    this.townManager.clear();
    const cities = this.townManager.generateCities(this.numberOfCities, this.salesmanMap.width, this.salesmanMap.height);
    cities.forEach(city => {
      this.salesmanMap.drawCity(city);
    });
  }
}
