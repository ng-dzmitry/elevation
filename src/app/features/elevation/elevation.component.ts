import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ElevationMaxHeightComponent } from './components/elevation-max-height/elevation-max-height.component';
import { ElevationChartComponent } from './components/elevation-chart/elevation-chart.component';
import { ElevationAverageComponent } from './components/elevation-average/elevation-average.component';
import { loadElevationData } from './state/elevation.actions';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { selectElevationLoading, selectElevationLoadingFailed } from './state/elevation.reducer';

@Component({
  selector: 'elevation',
  standalone: true,
  imports: [
    ElevationMaxHeightComponent,
    ElevationChartComponent,
    ElevationAverageComponent,
    CommonModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './elevation.component.html',
  styleUrl: './elevation.component.scss'
})
export class ElevationComponent {
  public elevationLoading$: Observable<boolean>;
  public elevationLoadingFailed$: Observable<boolean>;

  constructor(private store: Store) {
    this.elevationLoading$ = store.pipe(select(selectElevationLoading));
    this.elevationLoadingFailed$ = store.pipe(select(selectElevationLoadingFailed));
  }

  public requestElevationData() {
    this.store.dispatch(loadElevationData())
  }
}
