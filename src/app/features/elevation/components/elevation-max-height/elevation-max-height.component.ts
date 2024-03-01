import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectMaxElevation } from '../../state/elevation.reducer';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'elevation-max-height',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './elevation-max-height.component.html',
  styleUrl: './elevation-max-height.component.scss'
})
export class ElevationMaxHeightComponent {
  public maxElevation$: Observable<number | null>;

  constructor(store: Store) {
    this.maxElevation$ = store.pipe(select(selectMaxElevation));
  }
}
