import { Component, OnInit } from '@angular/core';
import {MapService} from "../map.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})
export class MainComponent implements OnInit {

  constructor(private mapService: MapService) { }

  ngOnInit() {
  }

  title: string = 'My first angular2-google-maps project';
  lat: number = this.mapService.getCoordinates().lat;
  lng: number = this.mapService.getCoordinates().lng;
  coordinates: any = this.mapService.getCoordinates();


}
