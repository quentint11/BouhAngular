import { Component, OnInit } from '@angular/core';
import { ConnexionService } from '../services/connexion.service';
import { NgForm } from '@angular/forms';
import { Utilisateur } from '../model/utilisateur';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent
{
  erreurLog: boolean = false;
  erreurHttp: boolean = false;

  constructor(private connexion: ConnexionService, private app: AppComponent, private router: Router) { }

  onLogIn(form: NgForm)
  {

    this.connexion.VerifieLogs(form.value).subscribe((utilisateur: Utilisateur) => 
    { 
      if(utilisateur != null)
      {

        this.erreurLog = false;
        this.connexion.estConnecter = true;

        //afectation a la variable pour dasativer menu
        this.app.estCo = this.connexion.estConnecter;

        // recupere l'info de l'utilisateur envoyer par le formulaire
        this.connexion.userActuel.MAIL_UTILISATEUR = form.value['MAIL_UTILISATEUR'];

        // recupere les infos de l'utilisateur connecter retouner par la base de donnée
        this.connexion.userActuel.ID_UTILISATEUR = utilisateur['id_utilisateur'];
        this.connexion.userActuel.ID_TYPEUTILISATEUR = utilisateur['id_typeUtilisateur'];
        this.connexion.userActuel.NOM_UTILISATEUR = utilisateur['nom_utilisateur'];
        this.connexion.userActuel.PRENOM_UTILISATEUR = utilisateur['prenom_utilisateur'];
        this.connexion.userActuel.TEL_UTILISATEUR = utilisateur['tel_utilisateur'];
        this.connexion.userActuel.PSEUDO_UTILISATEUR = utilisateur['pseudo_utilisateur'];
        this.connexion.userActuel.NIVEAU_UTILISATEUR = utilisateur['lvl_utilisateur'];
        this.connexion.userActuel.EXPERIENCE_UTILISATEUR = utilisateur['exp_utilisateur'];
        this.connexion.userActuel.IMAGE_UTILISATEUR = utilisateur['img_utilisateur'];
       
        //redirection menu
        this.router.navigate(['accueil']);       
      }
      else
      {
        this.erreurLog = true;
      }
    },
    // erreur http
    () =>
    {
      this.erreurHttp = true;
    }); 
  }

  estCo()
  {
    return this.connexion.estConnecter;
  }

}
