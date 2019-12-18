import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConnexionService } from '../services/connexion.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent 
{

  vueMdp: boolean = false;

  compteCree: boolean = false;
  erreurHttp: boolean = false;
  erreurMail: boolean = false;
  erreurPseudo: boolean = false;

  constructor(private connexion: ConnexionService) {}

  onNouveauCompte(form: NgForm)
  {
    this.connexion.NouveauCompte(form.value).subscribe((utilisateur: boolean) =>
    {
      // creation compte
      if(utilisateur == true)
      {
        this.compteCree = true;
        setTimeout(() => {
          this.compteCree = false;
        }, 2000);
      }
      // erreur mail
      if(utilisateur == false)
      {
        this.erreurMail = true;
        setTimeout(() => {
          this.erreurMail = false;
        }, 4000);
      } 
      // erreur pseudo
      else{
        this.erreurPseudo = true;
        setTimeout(() => {
          this.erreurPseudo = false;
        }, 4000);
      }      
    },
    //erreur http
    () =>
    {
      this.erreurHttp = true;
      setTimeout(() => {
        this.erreurHttp = false;
      }, 4000);  
    }

    );
  }

  onVoirMdp()
  {
    this.vueMdp = !this.vueMdp;

    return this.vueMdp;
  }
}
