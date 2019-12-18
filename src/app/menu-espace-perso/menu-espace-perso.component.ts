import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ConnexionService } from '../services/connexion.service';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-menu-espace-perso',
  templateUrl: './menu-espace-perso.component.html',
  styleUrls: ['./menu-espace-perso.component.css']
})
export class MenuEspacePersoComponent implements OnInit {

  private idUtilisateur: number;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private connexionService: ConnexionService, private router: Router, private app: AppComponent) {}

  ngOnInit()
  {
    this.idUtilisateur = this.connexionService.userActuel.ID_UTILISATEUR; 
  }

  onDeconnecter()
  {
    this.connexionService.ReinitialiseUtilisateurActuel();
    this.router.navigate(['']);
  }

  onSupprimerCompte() 
  { 
    if(confirm("Attention vous etes sur le points de supprimer votre compte ainsi que vos données ! \n" + 
                "voulez-vous vraiment continuer ?")) 
    { 
      this.SupprimerCompte();
    } 
}

private SupprimerCompte()
  {
    this.connexionService.SupprimerCompte(this.idUtilisateur).subscribe(
      () =>
      {
        this.app.estCo = false;
        this.connexionService.ReinitialiseUtilisateurActuel();
        this.router.navigate(['']);
      },
      () => 
      {
        console.log("erreur !");
      }
    )
  }

}
