import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {City} from '../types/City';

@Component({
  selector: 'app-salesmanmap',
  templateUrl: './salesmanmap.component.html',
  styleUrls: ['./salesmanmap.component.scss']
})
export class SalesmanmapComponent implements OnInit, AfterViewInit {

  @ViewChild('canvas') canvas: ElementRef;
  cx: CanvasRenderingContext2D;
  width: number;
  height: number;
  constructor() { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.cx = canvasEl.getContext('2d');
    this.width = canvasEl.width = 1920;
    this.height = canvasEl.height = 1080;
  }

  public clear() {
    this.cx.beginPath();
    this.cx.clearRect(0, 0, this.width, this.height);
    this.cx.stroke();
  }

  public drawCity(city: City) {
    if (!this.cx) { return; }
    this.cx.beginPath();
    this.cx.strokeStyle = 'rgba(0, 0, 0, 1)';
    this.cx.lineCap = 'round';
    this.cx.fillStyle = 'rgba(0, 0, 0, 1)';
    this.cx.lineWidth = 1;
    this.cx.arc(city.x, city.y, 3, 0, 2 * Math.PI);
    this.cx.fillStyle = '#000000';
    this.cx.fill();
    this.cx.lineWidth = 2;
    this.cx.strokeStyle = '#000000';
    this.cx.stroke();
  }

  public drawConnection(sourceCity: City, destinationCity: City) {
    this.cx.beginPath();
    this.cx.moveTo(sourceCity.x, sourceCity.y);
    this.cx.lineTo(destinationCity.x, destinationCity.y);
    this.cx.lineWidth = 1;
    this.cx.strokeStyle = '#FF0000';
    this.cx.stroke();
  }
}
