import { Component, OnInit, ViewChild } from '@angular/core';
import { UtilisateurService } from '../services/utilisateurService.service';
import { Utilisateur } from '../model/utilisateur';
import { ConnexionService } from '../services/connexion.service';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-back-end',
  templateUrl: './back-end.component.html',
  styleUrls: ['./back-end.component.css']
})
export class BackEndComponent implements OnInit {

  listeUtilisateur: Utilisateur[];
  dataSource: MatTableDataSource<Utilisateur>;

  confirmSupp: boolean = false;
  erreurHttp: boolean = false;

  

  constructor(private userService: UtilisateurService, private connexionService: ConnexionService) {}

  displayedColumns: string[] = ['Nom', 'Prenom', 'Pseudo', 'Telephone', 'Mail', 'Supprimer'];
  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  ngOnInit() {

    this.userService.ListeUtilisateurOdreAlphabetique().subscribe(
      (utilisateur: Utilisateur[]) =>
      {
        this.listeUtilisateur = utilisateur;

        // source de la liste du tableau
        this.dataSource = new MatTableDataSource<Utilisateur>(this.listeUtilisateur);
        // pagination du tableau
        this.dataSource.paginator = this.paginator;
        
      },
      // erreur http
      () =>
      {
        console.log("erreur !")
      }
    );



  }

  onSupprimer(id: number) 
  { 
    if(confirm("Attention vous etes sur le points de supprimer un compte ainsi que c'est données ! \n" + 
                "voulez-vous vraiment continuer ?")) 
    { 
      this.SupprimerCompte(id);
    } 
}

private SupprimerCompte(id)
  {
    this.connexionService.SupprimerCompte(id).subscribe(
      () =>
      {
        this.ngOnInit();
        this.confirmSupp = true;

        setTimeout(() => 
        {
          this.confirmSupp = false;  
        }, 2000);
      },

      // erreur http
      () => 
      {
        this.erreurHttp = true;

        setTimeout(() => {
          this.erreurHttp = false;
        }, 2000);
      }
    )
  }
}