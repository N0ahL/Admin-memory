import { Routes } from '@angular/router';
import {Login} from './login/login';
import {Admin} from './admin/admin';
import {AdminApis} from './admin-apis/admin-apis';
import { AdminPlayers } from './admin-players/admin-players';
import {AdminGames} from './admin-games/admin-games';
import {authGuard} from './auth-guard';

export const routes: Routes = [
  {path: 'login', component: Login},
  {
    path: 'admin',
    canActivate: [authGuard],
    children: [
      { path: '', component: Admin },
      { path: 'games', component: AdminGames },
      { path: 'players', component: AdminPlayers },
      { path: 'apis', component: AdminApis }
    ]
  },

  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: '**', redirectTo: 'login'},
];
