import { createReducer, on, createFeatureSelector, createSelector } from '@ngrx/store';
import * as elevationActions from './elevation.actions';
import { Elevation } from '../models/elevation';

export interface ElevationState {
  elevationData: Elevation | null,
  loadingEvaluationData: boolean,
  loadingEvaluationDataFailed: boolean,
}

const initialState: ElevationState = {
  elevationData: null,
  loadingEvaluationData: false,
  loadingEvaluationDataFailed: false,
};

export const selectElevationState = createFeatureSelector<ElevationState>('elevation');

export const selectAverageElevation = createSelector(
  selectElevationState, state => state.elevationData?.averageElevation ?? null
);

export const selectMaxElevation = createSelector(
  selectElevationState, state => state.elevationData?.maxElevation ?? null
);

export const selectChartData = createSelector(
  selectElevationState, state => state.elevationData?.chartData ?? null
);

export const selectElevationLoading = createSelector(
  selectElevationState, state => state.loadingEvaluationData
);

export const selectElevationLoadingFailed = createSelector(
  selectElevationState, state => state.loadingEvaluationDataFailed
);

export const elevationReducer = createReducer(initialState,
  on(elevationActions.loadElevationData, state =>
  ({
    ...state,
    loadingEvaluationData: true,
    loadingEvaluationDataFailed: false
  })),
  on(elevationActions.loadElevationDataSuccess, (state, { elevation }) =>
  ({
    ...state,
    elevationData: elevation,
    loadingEvaluationData: false,
    loadingEvaluationDataFailed: false
  })
  ),
  on(elevationActions.loadElevationDataError, state =>
  ({
    ...state,
    loadingEvaluationData: false,
    loadingEvaluationDataFailed: true
  }))
);