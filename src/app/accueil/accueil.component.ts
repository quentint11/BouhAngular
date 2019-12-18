import { Component, OnInit } from '@angular/core';
import { ConnexionService } from '../services/connexion.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  id_typeUtilisateur: number;

  constructor(private connexionServ: ConnexionService) { }

  ngOnInit() {

    this.id_typeUtilisateur = this.connexionServ.userActuel.ID_TYPEUTILISATEUR;
  }

}
