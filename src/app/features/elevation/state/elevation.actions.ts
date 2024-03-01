import { createAction, props } from "@ngrx/store";
import { Elevation } from "../models/elevation";

export const loadElevationData = createAction("[Elevation] Load Elevation Data");
export const loadElevationDataSuccess = createAction(
  "[Elevation] Load Elevation Data Success",
  props<{ elevation: Elevation }>());
export const loadElevationDataError = createAction("[Elevation] Load Elevation Data Error");