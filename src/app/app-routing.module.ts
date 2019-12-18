import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConnexionAdminGarde } from './guard/connexionAdmin.guard';
import { ConnexionGarde } from './guard/ConnexionGarde.guard';

import { InscriptionComponent } from './inscription/inscription.component';
import { LoginComponent } from './login/login.component';
import { AccueilComponent } from './accueil/accueil.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { BackEndComponent } from './back-end/back-end.component';
import { MenuEspacePersoComponent } from './menu-espace-perso/menu-espace-perso.component';

const routes: Routes = [

  { path: "", component: LoginComponent },
  { path: "inscription", component: InscriptionComponent },
  { path: "accueil", canActivate: [ConnexionGarde], component: AccueilComponent },
  { path: "espacePersonnel", canActivate: [ConnexionGarde], component: MenuEspacePersoComponent },
  { path: "back-end", canActivate: [ConnexionAdminGarde], component: BackEndComponent },

  //erreur 404
  { path: "not-found", component: NotFoundComponent },
  { path: "**", redirectTo: 'not-found' }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
