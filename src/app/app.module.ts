import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';



// components
import { AppComponent } from './app.component';
import { InscriptionComponent } from './inscription/inscription.component';
import {LoginComponent } from './login/login.component';
import { MenuEspacePersoComponent } from './menu-espace-perso/menu-espace-perso.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { EspacePersoComponent } from './espace-perso/espace-perso.component';
import { AccueilComponent } from './accueil/accueil.component';
import { BackEndComponent } from './back-end/back-end.component';

// guards
import { ConnexionGarde } from './guard/ConnexionGarde.guard';
import { ConnexionAdminGarde } from './guard/connexionAdmin.guard';

// services
import { ConnexionService } from './services/connexion.service';
import { UtilisateurService } from './services/utilisateurService.service';


// angular material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

// tableau angular material
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';


@NgModule({
  declarations: [
    AppComponent,
    InscriptionComponent,
    LoginComponent,
    AccueilComponent,
    NotFoundComponent,
    EspacePersoComponent,
    BackEndComponent,
    MenuEspacePersoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],

  //service
  providers: [ConnexionGarde, ConnexionService, UtilisateurService ,ConnexionAdminGarde],
  bootstrap: [AppComponent]
})
export class AppModule { }
