import { Component, OnInit } from '@angular/core';
import {MapService} from "../map.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(private mapService: MapService) { }

  ngOnInit() {
    this.mapService.setCoordinates(60,60);
  }

}
