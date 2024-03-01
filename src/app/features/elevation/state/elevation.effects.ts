import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError, switchMap } from 'rxjs/operators';
import { ElevationService } from '../services/elevation.service';
import { loadElevationData, loadElevationDataError, loadElevationDataSuccess } from './elevation.actions';

@Injectable()
export class ElevationEffects {

  loadData$ = createEffect(() => this.actions$.pipe(
    ofType(loadElevationData),
    switchMap(() => this.elevationService.getData()),
    map(data => loadElevationDataSuccess({ elevation: data })),
    catchError(() => of(loadElevationDataError()))
  ));

  constructor(
    private actions$: Actions,
    private elevationService: ElevationService
  ) { }
}