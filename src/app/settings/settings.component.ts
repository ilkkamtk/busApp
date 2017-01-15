import {Component, OnInit} from '@angular/core';
import {MapService} from "../map.service";
import {ReittiopasService} from "../reittiopas.service";
declare let google: any;

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(private mapService: MapService, private reittiopasService: ReittiopasService) {
  }

  private stop: any = this.mapService.getStop();
  private map: any;
  private name: string;


  private showPlace = (evt) => {

    console.log(this.stop);
    if (evt.placeId) {
      const request = {
        placeId: evt.placeId
      };

      const gService = new google.maps.places.PlacesService(this.map);

      gService.getDetails(request, (place, status) => {
        if (status == google.maps.places.PlacesServiceStatus.OK && place.types.includes('bus_station')) {
          // convert the name to Finnish
          this.mapService.getFinnishName(place.name).subscribe(
            translation => {
              this.name = translation.results[0].name;
              console.log(this.name);
              const stop = this.setStop(this.name);
              this.mapService.getStop();
              this.reittiopasService.getStopDetails(this.mapService.getStop().gtfsId).subscribe(
                details => {
                  const lines = [];
                  console.log(details.data.stop.patterns);
                  details.data.stop.patterns.forEach((line) => {
                    console.log(line);
                    line.route.gtfsId = line.route.gtfsId.substring(4);
                    lines.push({
                      name: line.name,
                      routeId: line.route.gtfsId
                    });
                  });
                  this.mapService.setDetails(lines);
                }
              );
            }
          );
        }
      });

    }
  };

  private setStop = (name: string) => {
    this.reittiopasService.getStops(name).subscribe(
      stops => {
        this.mapService.setStop(stops.data.stops[0]);
        //console.log(this.mapService.getStop());
      }
    )
  };


  ngOnInit() {
    if (this.stop) {
      this.mapService.setMap();
      this.map = this.mapService.map;
      this.map.addListener('click', this.showPlace); //end addListener
      this.mapService.setMarker();
    } else {
      console.log('Stop not set');
    }
  }
}
