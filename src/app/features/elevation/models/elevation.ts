import { ChartData } from "./chart-data";

export class Elevation {

  constructor(
    public averageElevation: number,
    public maxElevation: number,
    public chartData: ChartData) {
  }
}