import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, OnInit, inject, viewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { BehaviorSubject, Observable, filter } from 'rxjs';
import { selectChartData } from '../../state/elevation.reducer';
import { ChartData } from '../../models/chart-data';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'elevation-chart',
  standalone: true,
  imports: [
    CommonModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './elevation-chart.component.html',
  styleUrl: './elevation-chart.component.scss'
})
export class ElevationChartComponent implements OnInit {
  private chartData$: Observable<ChartData | null>;
  private chartRef = viewChild.required<ElementRef>('chartElem');
  private destroyRef = inject(DestroyRef);
  private chart: Chart;
  public hasChartInitilized$ = new BehaviorSubject(false);

  constructor(store: Store) {
    this.chartData$ = store.pipe(select(selectChartData));
  }

  ngOnInit(): void {
    Chart.register(...registerables);

    this.chartData$
      .pipe(
        filter(x => !!x),
        takeUntilDestroyed(this.destroyRef))
      .subscribe(chartData => this.drawChart(chartData))
  }

  private drawChart(chartData: ChartData | null) {
    if (this.chart) {
      this.chart.destroy();
    }

    if (!chartData) {
      return;
    }

    this.chart = new Chart(this.chartRef().nativeElement, {
      type: 'line',
      data: {
        labels: chartData.distances,
        datasets: [{
          label: 'Elevation',
          data: chartData.elevations,
          borderColor: 'black',
          fill: false
        }]
      },
      options: {
        scales: {
          x: {
            type: 'linear',
            position: 'bottom',
            title: {
              display: true,
              text: 'distance'
            }
          },
          y: {
            title: {
              display: true,
              text: 'elevation'
            }
          }
        }
      }
    });

    this.hasChartInitilized$.next(true);
  }
}
