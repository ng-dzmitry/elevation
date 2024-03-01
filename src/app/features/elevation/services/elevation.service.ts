import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Elevation } from '../models/elevation';
import { ChartData } from '../models/chart-data';

@Injectable({
  providedIn: 'root'
})
export class ElevationService {
  constructor(private http: HttpClient) { }

  public getData() {
    return this.http.get<any>(`https://elevation.arcgis.com/arcgis/rest/services/Tools/ElevationSync/GPServer/Profile/execute?InputLineFeatures=%7B%22fields%22%3A%5B%7B%22name%22%3A%22OID%22%2C%22type%22%3A%22esriFieldTypeObjectID%22%2C%22alias%22%3A%22OID%22%7D%5D%2C%22geometryType%22%3A%22esriGeometryPolyline%22%2C%22features%22%3A%5B%7B%22geometry%22%3A%7B%22paths%22%3A%5B%5B%5B10.464200935945678%2C45.51541916225363%5D%2C%5B11.021070442780866%2C45.881334972376145%5D%5D%5D%2C%22spatialReference%22%3A%7B%22wkid%22%3A4326%7D%7D%2C%22attributes%22%3A%7B%22OID%22%3A1%7D%7D%5D%2C%22sr%22%3A%7B%22wkid%22%3A4326%7D%7D&ProfileIDField=OID&DEMResolution=90m&MaximumSampleDistance=425.5644849862203&MaximumSampleDistanceUnits=Meters&returnZ=true&returnM=true&f=json`)
      .pipe(map(data => this.mapResponseToElevation(data)))
  }

  private mapResponseToElevation(data: any) {
    const path = data.results[0].value.features[0].geometry.paths[0];
    const elevations: number[] = path.map((point: number[]) => point[2]);
    const distances: number[] = path.map((point: number[], index: number) => index === 0 ? 0 : this.calculateDistance(path[index - 1], point));
    const averageElevation = elevations.reduce((acc, cur) => acc + cur, 0) / elevations.length;
    const maxElevation = Math.max(...elevations);
    const maxDistance = Math.max(...distances);
    const chartData = new ChartData(distances, elevations, maxElevation, maxDistance);
    return new Elevation(averageElevation, maxElevation, chartData);
  }

  private calculateDistance(point1: number[], point2: number[]): number {
    const [x1, y1] = point1;
    const [x2, y2] = point2;
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }
}
