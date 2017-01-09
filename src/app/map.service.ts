import {Injectable} from '@angular/core';

@Injectable()
export class MapService {

  constructor() {
  }


  private coordinates: any = {
    "lat": 51.678418,
    "lng": 7.809007
  }

  getCoordinates(){
    console.log(this.coordinates);
    return this.coordinates;
  }

  setCoordinates(lat, lng){
    this.coordinates = {
      "lat": lat,
      "lng": lng
    }
    console.log(this.coordinates);
  }

}
