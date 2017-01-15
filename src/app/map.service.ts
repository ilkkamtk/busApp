import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
declare let google: any;

@Injectable()
export class MapService {

  private stop: any = {
    gtfsId: "HSL:2111210",
    name: "Gransinmäki",
    lat: 60.22266779999996,
    lon: 24.803638300000006,
    lines: [{
      name: "3 to Alakaupunki (HSL:2413210)",
      routeId: "HSL:2003"
    }, {
      name: "238B to Siikajärvi (HSL:2643219)",
      routeId: "HSL:2238B"
    }, {
      name: "227N to Jorvin sairaala (HSL:2631269)",
      routeId: "HSL:2227N"
    }, {
      name: "226A to Kellonummi (HSL:2634264)",
      routeId: "HSL:2226A"
    }, {
      name: "214T to Jupperinaukio (HSL:2143256)",
      routeId: "HSL:2214T"
    }, {
      name: "110T to Kamppi, tulo (HSL:1040289)",
      routeId: "HSL:2110T"
    }, {
      name: "214 to Jupperinaukio (HSL:2143256)",
      routeId: "HSL:2214"
    }, {
      name: "  to Viherkalliontie (HSL:2151200)",
      routeId: "HSL:2214"
    }, {
      name: "239 to Kalajärven keskus (HSL:2721276)",
      routeId: "HSL:2239"
    }, {name: "238K to Siikaniemi (HSL:2643229)", routeId: "HSL:2238K"}, {
      name: "236V to Serena (HSL:2723283)",
      routeId: "HSL:2236V"
    }, {name: "227 to Espoontori (HSL:2611271)", routeId: "HSL:2227"}, {
      name: "236 to Serena (HSL:2723283)",
      routeId: "HSL:2236"
    }, {name: "236K", routeId: "HSL:2236K"}, {
      name: "110 to Kamppi, tulo (HSL:1040289)",
      routeId: "HSL:2110"
    }, {
      name: "215A to Högnäs (HSL:2633231)",
      routeId: "HSL:2215A"
    }, {
      name: "226 to Jorvin sairaala (HSL:2631269)",
      routeId: "HSL:2226"
    }, {
      name: "224 to Kulovalkea (HSL:2611206)",
      routeId: "HSL:2224"
    }, {
      name: "219 to Karamzininpuisto (HSL:2632261)",
      routeId: "HSL:2219"
    }, {name: "5 to Kalatorppa (HSL:2312201)", routeId: "HSL:2005"}, {
      name: "215 to Lähdeaukio (HSL:2142226)",
      routeId: "HSL:2215"
    }, {
      name: "238KT to Siikaranta (HSL:6170230)",
      routeId: "HSL:2238KT"
    }, {
      name: "238KB to Siikajärvi (HSL:2643219)",
      routeId: "HSL:2238KB"
    }, {
      name: "239T to Kalajärven keskus (HSL:2721276)",
      routeId: "HSL:2239T"
    }, {name: "238 to Siikaniemi (HSL:2643229)", routeId: "HSL:2238"}, {
      name: "238T to Siikaranta (HSL:6170230)",
      routeId: "HSL:2238T"
    }, {name: "227V to Espoontori (HSL:2611271)", routeId: "HSL:2227V"}]
  };

  private storedStop = localStorage.getItem('stop');

  map: any;
  marker: any;

  constructor(private http: Http) {
    if (this.storedStop != null) {
      console.log(this.storedStop);
      this.stop = JSON.parse(this.storedStop);
    }
  }

  getStop = () => {
    console.log(this.stop);
    return this.stop;
  };

  setStop = (stop) => {
    this.stop = stop;
    this.setMarker();
  };

  setDetails = (det) => {
    this.stop.lines = det;
    console.log(this.stop);
    localStorage.setItem('stop', JSON.stringify(this.stop));
  };

  setMarker = () => {
    console.log(this.stop);
    const latlon = {
      lat: this.stop.lat,
      lng: this.stop.lon
    };
    this.marker.setOptions({
      position: latlon,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 10
      },
      draggable: false,
      map: this.map
    });
  };

  setMap = () => {
    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: {lat: this.stop.lat, lng: this.stop.lon}
    });
    this.marker = new google.maps.Marker();
  };

  getFinnishName(name: string) {
    return this.http.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${name}&language=fi_FI&key=AIzaSyAXQjpyD9IZKRZoogfOPjkdYMN-pH0exnU`)
      .map(response => response.json());
  };

  showBus = (latlon: any, title: string, map) => {
    return new google.maps.Marker({
      position: latlon,
      label: {
        color: 'white',
        fontWeight: 'bold',
        text: title,
      },
      map: map
    });
  };
}
