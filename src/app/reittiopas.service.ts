import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from "@angular/http";
import 'rxjs/add/operator/map';

@Injectable()
export class ReittiopasService {

  constructor(private http: Http) {
  }

  private url: string = 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql';
  private lines: any = [];

  getStops = (name: string) => {
    const q = `{
  stops(name: "${name}") {
  	gtfsId
    name
    lat
    lon
  }
}`;
    const headers = new Headers({'Content-Type': 'application/graphql'});
    const options = new RequestOptions({headers: headers});
    return this.http.post(this.url, q, options)
      .map(response => response.json())
  };

  getAllBuses = () => {
    return this.http.get('http://api.digitransit.fi/realtime/vehicle-positions/v1/hfp/journey/bus/#')
      .map(response => response.json());
  };

  getStopDetails = (id) => {
    const q = `{
      stop(id: "${id}") {
      name
      lat
      lon
      patterns {
        id
        name
        route {
          gtfsId
          shortName
          longName
        }
        directionId
      }
    }
    }`;
    const headers = new Headers({'Content-Type': 'application/graphql'});
    const options = new RequestOptions({headers: headers});
    return this.http.post(this.url, q, options)
      .map(response => response.json())
  };

  getBus = (line) => {
    return this.http.get(`http://api.digitransit.fi/realtime/vehicle-positions/v1/hfp/journey/bus/+/${line}/#`)
      .map(response => response.json());
  };

  addLine = (num: number) => {
    this.lines.push(num);
  };

  getLines = () => {
    return this.lines;
  };

  deleteLines = () => {
    this.lines = [];
  };

}
