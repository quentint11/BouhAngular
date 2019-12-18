import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs' ;
import { Utilisateur } from '../model/utilisateur';

@ Injectable ({ providedIn : 'root' }) 
export class ConnexionService
{
    //chemin acces backend
    private LAVAREL_API_SERV: string = "http://127.0.0.1/qtoui/BOUH/AngularProjet/backend/ProjetTemplate/public/api";

    //utilisateur actuellement connecter
    userActuel: Utilisateur = 
    { 
        ID_UTILISATEUR: null,
        ID_TYPEUTILISATEUR: null,
        MAIL_UTILISATEUR: null,
        NOM_UTILISATEUR: null, 
        PRENOM_UTILISATEUR: null,
        TEL_UTILISATEUR: null,
        PSEUDO_UTILISATEUR: null,
        MOTDEPASSE_UTILISATEUR: null,
        NIVEAU_UTILISATEUR: null,
        EXPERIENCE_UTILISATEUR: null,
        IMAGE_UTILISATEUR: null
    }

    estConnecter: boolean = false;

    constructor(private httpClient: HttpClient) { }

    ReinitialiseUtilisateurActuel()
    {
        this.userActuel.ID_UTILISATEUR = null;
        this.userActuel.MAIL_UTILISATEUR = null;
        this.userActuel.NOM_UTILISATEUR = null;
        this.userActuel.PRENOM_UTILISATEUR = null;
        this.userActuel.PSEUDO_UTILISATEUR = null;
        this.userActuel.TEL_UTILISATEUR = null;
        this.userActuel.NIVEAU_UTILISATEUR = null;
        this.userActuel.EXPERIENCE_UTILISATEUR = null;
        this.userActuel.ID_TYPEUTILISATEUR = null;
        this.userActuel.MOTDEPASSE_UTILISATEUR = null;
        this.userActuel.IMAGE_UTILISATEUR = null;

        this.estConnecter = false;
    }


    //envoie des donnees du form pour verifier les logs
    VerifieLogs(log: Utilisateur) : Observable<Utilisateur>
    {
        //envoie des infos a la route de laravel
        return this.httpClient.post<Utilisateur>(`${this.LAVAREL_API_SERV}/verifierLog`, log);
    }

    //creation compte
    NouveauCompte(infos): Observable<any>
    {
        return this.httpClient.post<any>(`${this.LAVAREL_API_SERV}/nouveauCompte`, infos);
    }

    //modifier les infos des utilisateurs
    ModifierInfoUser(infos: Utilisateur): Observable<Utilisateur>
    {
        return this.httpClient.post<Utilisateur>(`${this.LAVAREL_API_SERV}/modifierInfos`, infos);    
    }

    //supprimer son compte
    SupprimerCompte(id: number)
    {
        return this.httpClient.delete<number>(`${this.LAVAREL_API_SERV}/suppCompte/${id}`);
    }
}