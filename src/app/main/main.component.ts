import {Component, OnInit} from '@angular/core';
import {MapService} from "../map.service";
import {ReittiopasService} from "../reittiopas.service"
declare let google: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private mapService: MapService, private reittiopasService: ReittiopasService) {
  }

  private map: any;
  private title: string = 'BusApp';
  private stop: any = this.mapService.getStop();
  private busMarkers: any = [];
  private refreshInterval: any;
  private timeInterval: any;
  private timeToUpdate: number = 60;

  private showBusOnMap() {
    // delete existing markers
    if(this.busMarkers.length > 0) {
      this.busMarkers.forEach((marker) => {
        marker.setMap(null);
      });
      this.busMarkers = [];
    }

    this.mapService.getStop().lines.forEach((line) => {
      this.reittiopasService.getBus(line.routeId).subscribe(
        buses => {

          console.log(buses);
          for (let key of Object.keys(buses)){
            //console.log(buses[i]);
            const latlon = {
              lat: buses[key].VP.lat,
              lng: buses[key].VP.long
            };
            //console.info(latlon);
            const line = buses[key].VP.desi;
            this.busMarkers.push(this.mapService.showBus(latlon, line, this.map));
            //console.log(this.busMarkers);
          };
          this.timeToUpdate = 60;
          clearInterval(this.timeInterval);
          this.timeInterval = setInterval(() => {
            this.timeToUpdate--;
          }, 1000);
        }
      );
    });
  }


  ngOnInit() {
    if (this.stop) {
      console.log(this.stop);
      this.mapService.setMap();
      this.map = this.mapService.map;
      this.showBusOnMap();
      this.mapService.setMarker();
      this.refreshInterval = setInterval(() => {
        clearInterval(this.timeInterval);
        this.showBusOnMap()
      }, 60000);
      this.timeInterval = setInterval(() => {
        this.timeToUpdate--;
      }, 1000);
    } else {
      console.log('Stop not set');
    }
  }


}
