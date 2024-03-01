import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectAverageElevation } from '../../state/elevation.reducer';

@Component({
  selector: 'elevation-average',
  standalone: true,
  imports: [
    CommonModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './elevation-average.component.html',
  styleUrl: './elevation-average.component.scss'
})
export class ElevationAverageComponent {
  public averageElevation$: Observable<number | null>;

  constructor(store: Store) {
    this.averageElevation$ = store.pipe(select(selectAverageElevation));
  }
}
