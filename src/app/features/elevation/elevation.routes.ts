import { Route } from "@angular/router";
import { ElevationComponent } from "./elevation.component";
import { elevationReducer } from "./state/elevation.reducer";
import { provideState } from "@ngrx/store";
import { provideEffects } from "@ngrx/effects";
import { ElevationEffects } from "./state/elevation.effects";

export const elevationRoutes: Route[] = [
  {
    path: '',
    providers: [
      provideState({ name: 'elevation', reducer: elevationReducer }),
      provideEffects([ElevationEffects])
    ],
    children: [
      {
        path: '',
        component: ElevationComponent,
      }
    ],
  },
];
