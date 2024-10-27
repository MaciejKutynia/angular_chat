import {Routes} from '@angular/router';
import {AuthComponent} from '../auth/auth.component';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {ChatComponent} from "../chat/chat.component";

export const routes: Routes = [
  {
    path: 'auth', loadChildren: () => import('../auth/auth.routes').then(m => m.routes)
  },
  {
    path: '', component: DashboardComponent
  },
  {
    path: ':id', component: ChatComponent
  }
];
