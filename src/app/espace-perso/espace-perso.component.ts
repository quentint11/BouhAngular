import { Component, OnInit } from '@angular/core';
import { ConnexionService } from '../services/connexion.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilisateurService } from '../services/utilisateurService.service';
import { Images } from '../model/images'

@Component({
  selector: 'app-espace-perso',
  templateUrl: './espace-perso.component.html',
  styleUrls: ['./espace-perso.component.scss']
})

export class EspacePersoComponent implements OnInit {

// variable utilisateur
 id: number;
 mail: string;
 nom: string;
 prenom: string;
 telephone: string;
 pseudo: string;

 niveau: number;
 experience: number;

 image: string;

// variable informatives
 compteModifier: boolean = false;
 erreurHttp: boolean = false;
 bidouiller: boolean = false;

 listeImage: Images[];

 imageSelectionne :Images;


  constructor(private connexionService: ConnexionService, private userService: UtilisateurService ,private router: Router) { }

  ngOnInit() {

    this.id = this.connexionService.userActuel.ID_UTILISATEUR;
    this.mail = this.connexionService.userActuel.MAIL_UTILISATEUR;
    this.nom = this.connexionService.userActuel.NOM_UTILISATEUR;
    this.prenom = this.connexionService.userActuel.PRENOM_UTILISATEUR;
    this.telephone = this.connexionService.userActuel.TEL_UTILISATEUR;
    this.pseudo = this.connexionService.userActuel.PSEUDO_UTILISATEUR;

    this.niveau = this.connexionService.userActuel.NIVEAU_UTILISATEUR;
    this.experience = this.connexionService.userActuel.EXPERIENCE_UTILISATEUR;
    this.image = this.connexionService.userActuel.IMAGE_UTILISATEUR;

    this.userService.ListerImage().subscribe(
      (tabImage: Images[]) =>
      {
        this.listeImage = tabImage;
      },
      () =>
      {
        this.erreurHttp = true;

        setTimeout(() => {
          this.erreurHttp = false;
        }, 2000);
      }

    )
  }

  onModifierInformationsUtilisateur(form: NgForm)
  {
    this.connexionService.ModifierInfoUser(form.value).subscribe(
      (reussi) =>
      {
        if(reussi)
        {
          this.compteModifier = true;

          //tempo de 3 secondes, modifie la valeur de la variable
          setTimeout(
            () =>
            {
              this.compteModifier = false;
            }, 3000
            );
        }
        else
        {
          this.bidouiller = true;

          //tempo de 5 secondes, modifie la valeur de la variable et redirection page pour le fun ! 
          setTimeout(
            () =>
            {
              this.connexionService.ReinitialiseUtilisateurActuel();
              this.router.navigate(['']);
            }, 5000
            );
        }
      },
      // erreur http
      (error) =>
      {
        this.erreurHttp = true;
      });
  }


  onImageSelectionne(image: Images)
  {
    this.imageSelectionne = image;
  }

  onChangerImage()
  {
    this.userService.ModifierImageUtilisateur(this.imageSelectionne, this.id).subscribe(
      (retour) =>
      {
        if(retour != null)
        {
          this.compteModifier = true;

          setTimeout(() => {
            this.compteModifier = false;
          }, 2000);
        }    
      },
      () =>
      {
        this.erreurHttp = true;

        setTimeout(() => {
          this.erreurHttp = false;
        }, 3000);
      });
  }

}
