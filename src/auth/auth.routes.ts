import type {Routes} from "@angular/router";
import {CredentialsComponent} from "./components/credentials/credentials.component";
import {ActivateComponent} from "./components/activate/activate.component";

export const routes: Routes = [
  {
    path: '', component: CredentialsComponent
  },
  {
    path: 'activate', component: ActivateComponent
  }
]
